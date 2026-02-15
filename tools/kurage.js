#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import process, { stdin as input, stdout as output } from 'node:process';
import { createInterface } from 'node:readline/promises';

const PROJECT_ROOT = process.cwd();

const CATEGORIES = /** @type {const} */ (['enjoy', 'study', 'create']);
const CATEGORY_TO_LABEL = /** @type {const} */ ({
  enjoy: 'Enjoy',
  study: 'Study',
  create: 'Create',
});
const CHILD_LINKS_MARKER = '<!-- kurage:child-links -->';

const ARTICLE_TEMPLATE_PATH = path.join(PROJECT_ROOT, 'tools', 'templates', 'article.html');
let ARTICLE_TEMPLATE = null;
try {
  ARTICLE_TEMPLATE = await fs.readFile(ARTICLE_TEMPLATE_PATH, 'utf8');
} catch {
  // テンプレートが無い場合は、従来の文字列テンプレートへフォールバック
  ARTICLE_TEMPLATE = null;
}

function printHelp() {
  // eslint-disable-next-line no-console
  console.log(`
kurage (project tool)

Usage:
  npm run kurage -- new-article --category <enjoy|study|create> --slug <slug> --title <title> [--add-to <home|subpage|both|none>] [--parent <path>] [--image <path>]
  npm run kurage -- new-article --interactive
  npm run kurage -- delete-article --interactive

Examples:
  npm run kurage -- new-article --category study --slug typescript-notes --title "TypeScriptメモ"
  npm run kurage -- new-article --category create --slug my-tool --title "My Tool" --add-to both --parent . --image ./images/thumb_my_tool.png
  npm run kurage -- new-article --category enjoy --slug run-notes --title "ランニングメモ" --add-to subpage --parent biography
  npm run new-page
`);
}

function getArg(name) {
  const idx = process.argv.indexOf(name);
  if (idx === -1) {
    return null;
  }
  const v = process.argv[idx + 1];
  if (!v || v.startsWith('--')) {
    return null;
  }
  return v;
}

function hasFlag(name) {
  return process.argv.includes(name);
}

function assert(cond, msg) {
  if (!cond) {
    throw new Error(msg);
  }
}

function normalizeSlug(slug) {
  const s = slug.trim().toLowerCase();
  assert(s.length > 0, 'slug is empty');
  assert(/^[a-z0-9][a-z0-9-_]*$/.test(s), 'slug must match /^[a-z0-9][a-z0-9-_]*$/');
  return s;
}

function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function exists(p) {
  try {
    await fs.stat(p);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

function toPosixPath(p) {
  return p.split(path.sep).join('/');
}

function cssDepthForDir(dirPath) {
  const rel = path.relative(dirPath, PROJECT_ROOT);
  if (!rel) {
    return 0;
  }
  return rel.split(path.sep).filter((seg) => seg === '..').length;
}

function urlFromDir(dirPath) {
  const rel = path.relative(PROJECT_ROOT, dirPath);
  const posix = toPosixPath(rel);
  return `./${posix.replace(/\/?$/, '/')}`;
}

function categoryIndexHtml({ title, cssDepth }) {
  const cssPath = '../'.repeat(cssDepth) + 'css/style.css';
  return `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <site-head title="${escapeHtml(title)}"></site-head>
  </head>
  <body>
    <site-header></site-header>
    <div class="memox" style="max-width: 860px; margin: 0 auto;">
      <h1>${escapeHtml(title)}</h1>
      <p>カテゴリ一覧ページです。</p>
    </div>
    <link rel="stylesheet" href="${cssPath}" />
    <script type="module" src="/src/main.ts"></script>
    <site-footer></site-footer>
  </body>
</html>
`;
}

function applyTemplateVars(template, vars) {
  let out = template;
  for (const [k, v] of Object.entries(vars)) {
    out = out.replaceAll(`{{${k}}}`, String(v));
  }
  return out;
}

function articleHtml({ title, cssDepth }) {
  const cssPath = '../'.repeat(cssDepth) + 'css/style.css';
  if (ARTICLE_TEMPLATE) {
    return applyTemplateVars(ARTICLE_TEMPLATE, {
      TITLE: escapeHtml(title),
      CSS_PATH: cssPath,
    });
  }
  return `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <site-head title="${escapeHtml(title)}"></site-head>
  </head>
  <body>
    <site-header></site-header>
    <div id="app">
      <div class="memox" style="max-width: 860px; margin: 0 auto;">
        <h1>${escapeHtml(title)}</h1>
        <p>ここに本文を書いていきます。</p>
      </div>
    </div>
    <link rel="stylesheet" href="${cssPath}" />
    <script type="module" src="/src/main.ts"></script>
    <site-footer></site-footer>
  </body>
</html>
`;
}

async function addToHomeProjects({ category, title, image, url }) {
  const filePath = path.join(PROJECT_ROOT, 'src', 'projects.ts');
  const text = await fs.readFile(filePath, 'utf8');

  const label = CATEGORY_TO_LABEL[category];
  const img = image || './images/thumb_placeholder.svg';

  const newEntry = `  {\n    title: ${JSON.stringify(title)},\n    category: ${JSON.stringify(
    label,
  )},\n    image: ${JSON.stringify(img)},\n    url: ${JSON.stringify(url)},\n  },\n`;

  const marker = 'export const projects: Project[] = [';
  const end = '\n];';
  const startIdx = text.indexOf(marker);
  assert(startIdx !== -1, 'Could not find projects array in src/projects.ts');
  const endIdx = text.lastIndexOf(end);
  assert(endIdx !== -1, 'Could not find end of projects array in src/projects.ts');

  const before = text.slice(0, endIdx);
  const after = text.slice(endIdx);

  // 末尾に追記（並び替えはユーザーが自由にできる）
  const updated = before + '\n' + newEntry + after;
  await fs.writeFile(filePath, updated, 'utf8');
}

function injectChildLinksMarkerIfMissing(html) {
  if (html.includes(CHILD_LINKS_MARKER)) {
    return html;
  }

  // memox ブロックの末尾に挿入（記事本文を邪魔しない）
  const memoxStart = html.indexOf('<div class="memox');
  if (memoxStart !== -1) {
    const memoxClose = html.indexOf('</div>', memoxStart);
    if (memoxClose !== -1) {
      const memoxLineStart = Math.max(0, html.lastIndexOf('\n', memoxStart) + 1);
      const memoxLineEnd = html.indexOf('\n', memoxLineStart);
      const memoxLine = html.slice(memoxLineStart, memoxLineEnd === -1 ? undefined : memoxLineEnd);
      const memoxIndent = (memoxLine.match(/^\s*/) ?? [''])[0];
      const contentIndent = `${memoxIndent}  `;

      const block =
        `\n` +
        `${contentIndent}<ul class="article-list">\n` +
        `${contentIndent}  ${CHILD_LINKS_MARKER}\n` +
        `${contentIndent}</ul>\n`;

      // 閉じタグ行の先頭に差し込んで、インデント崩れを防ぐ
      const closeLineStart = Math.max(0, html.lastIndexOf('\n', memoxClose) + 1);
      return html.slice(0, closeLineStart) + block + html.slice(closeLineStart);
    }
  }

  // それ以外: 最初の段落の直後に挿入
  const pEnd = html.indexOf('</p>');
  if (pEnd !== -1) {
    const block = `\n      <ul class="article-list">\n        ${CHILD_LINKS_MARKER}\n      </ul>\n`;
    return html.slice(0, pEnd + 4) + block + html.slice(pEnd + 4);
  }

  // 最後の手段: body末尾
  const bodyEnd = html.lastIndexOf('</body>');
  if (bodyEnd !== -1) {
    const block = `\n      <ul class="article-list">\n        ${CHILD_LINKS_MARKER}\n      </ul>\n`;
    return html.slice(0, bodyEnd) + block + html.slice(bodyEnd);
  }
  const block = `\n      <ul class="article-list">\n        ${CHILD_LINKS_MARKER}\n      </ul>\n`;
  return html + block;
}

async function addLinkToParentIndex({ parentDir, slug, title }) {
  const filePath = path.join(parentDir, 'index.html');
  let html = await fs.readFile(filePath, 'utf8');

  html = injectChildLinksMarkerIfMissing(html);

  const href = `./${slug}/`;
  if (html.includes(`href="${href}"`) || html.includes(`href='${href}'`)) {
    // 既に追加済みなら何もしない
    return;
  }

  const lines = html.split('\n');
  const markerLineIndex = lines.findIndex((l) => l.includes(CHILD_LINKS_MARKER));
  assert(markerLineIndex !== -1, 'Could not find child links marker in parent index');
  const markerLine = lines[markerLineIndex];
  const indent = markerLine.slice(0, markerLine.indexOf(CHILD_LINKS_MARKER));
  const liLine = `${indent}<li><a href="${href}">${escapeHtml(title)}</a></li>`;
  lines.splice(markerLineIndex, 0, liLine);
  html = lines.join('\n');

  await fs.writeFile(filePath, html, 'utf8');
}

async function removeLinkFromParentIndex({ parentDir, slug }) {
  const filePath = path.join(parentDir, 'index.html');
  if (!(await exists(filePath))) {
    return;
  }

  const href1 = `href="./${slug}/"`;
  const href2 = `href='./${slug}/'`;

  const text = await fs.readFile(filePath, 'utf8');
  const lines = text.split('\n');
  const filtered = lines.filter((l) => !(l.includes(href1) || l.includes(href2)));
  if (filtered.length === lines.length) {
    return;
  }
  await fs.writeFile(filePath, filtered.join('\n'), 'utf8');
}

async function listChildPageDirs(dirPath) {
  /** @type {Array<{name: string, abs: string}>} */
  const out = [];
  const ents = await fs.readdir(dirPath, { withFileTypes: true });
  for (const ent of ents) {
    if (!ent.isDirectory()) {
      continue;
    }
    const abs = path.join(dirPath, ent.name);
    if (await exists(path.join(abs, 'index.html'))) {
      out.push({ name: ent.name, abs });
    }
  }
  out.sort((a, b) => a.name.localeCompare(b.name));
  return out;
}

async function removeFromHomeProjectsByUrl(url) {
  const filePath = path.join(PROJECT_ROOT, 'src', 'projects.ts');
  if (!(await exists(filePath))) {
    return;
  }

  const text = await fs.readFile(filePath, 'utf8');
  const lines = text.split('\n');

  const urlLineIndex = lines.findIndex((l) => {
    const trimmed = l.trim();
    if (!trimmed.startsWith('url:')) {
      return false;
    }
    return trimmed.includes(url);
  });
  if (urlLineIndex === -1) {
    return;
  }

  // オブジェクト開始行（{）を後ろから探す
  let start = urlLineIndex;
  for (; start >= 0; start--) {
    if (/^\s*\{\s*$/.test(lines[start])) {
      break;
    }
  }
  assert(start >= 0, 'Could not find start of project entry in src/projects.ts');

  // オブジェクト終端行（},）を前へ探す
  let end = urlLineIndex;
  for (; end < lines.length; end++) {
    if (/^\s*\},\s*$/.test(lines[end])) {
      break;
    }
  }
  assert(end < lines.length, 'Could not find end of project entry in src/projects.ts');

  lines.splice(start, end - start + 1);
  await fs.writeFile(filePath, lines.join('\n'), 'utf8');
}

async function removeFromHomeProjectsByUrlPrefix(prefix) {
  const filePath = path.join(PROJECT_ROOT, 'src', 'projects.ts');
  if (!(await exists(filePath))) {
    return;
  }

  let text = await fs.readFile(filePath, 'utf8');
  const lines = text.split('\n');

  let i = 0;
  while (i < lines.length) {
    const trimmed = lines[i].trim();
    const m = trimmed.match(/^url:\s*(['"])(.*?)\1,\s*$/);
    if (!m) {
      i += 1;
      continue;
    }
    const url = m[2];
    if (!url.startsWith(prefix)) {
      i += 1;
      continue;
    }

    // オブジェクト開始行（{）を後ろから探す
    let start = i;
    for (; start >= 0; start--) {
      if (/^\s*\{\s*$/.test(lines[start])) {
        break;
      }
    }
    assert(start >= 0, 'Could not find start of project entry in src/projects.ts');

    // オブジェクト終端行（},）を前へ探す
    let end = i;
    for (; end < lines.length; end++) {
      if (/^\s*\},\s*$/.test(lines[end])) {
        break;
      }
    }
    assert(end < lines.length, 'Could not find end of project entry in src/projects.ts');

    lines.splice(start, end - start + 1);
    i = start;
  }

  text = lines.join('\n');
  await fs.writeFile(filePath, text, 'utf8');
}

async function promptChooseParentDir(rl, categoryDir, mode) {
  const root = categoryDir;
  let current = categoryDir;

  for (;;) {
    const isCreate = mode === 'create';
    const isDelete = mode === 'delete';
    assert(isCreate || isDelete, 'promptChooseParentDir: invalid mode');

    // eslint-disable-next-line no-console
    console.log(
      isCreate ? '\n作成先（親ページ）を選びます。' : '\n削除対象の場所（親ページ）を探します。',
    );
    // eslint-disable-next-line no-console
    console.log(`現在地: /${toPosixPath(path.relative(PROJECT_ROOT, current)) || ''}/`);
    // eslint-disable-next-line no-console
    console.log(
      isCreate
        ? '  0) ここを親にする（この場所に子ページを作る）'
        : '  0) ここを選ぶ（この場所の子ページから削除対象を選ぶ）',
    );
    if (current !== root) {
      // eslint-disable-next-line no-console
      console.log('  u) ひとつ上へ戻る');
    }

    const children = await listChildPageDirs(current);
    if (children.length === 0) {
      const ans = (await rl.question('選択してください (既定: 0): ')).trim();
      const v = ans.length > 0 ? ans : '0';
      if (v === '0') {
        return current;
      }
      if (v.toLowerCase() === 'u' && current !== root) {
        current = path.dirname(current);
        continue;
      }
      // eslint-disable-next-line no-console
      console.log('入力が不正です。');
      continue;
    }

    // eslint-disable-next-line no-console
    console.log(
      isCreate ? '\n下の階層に進む（既存ページ）:' : '\n下の階層に進む（削除対象を探す）:',
    );
    children.forEach((c, i) => {
      // eslint-disable-next-line no-console
      console.log(`  ${i + 1}) ${c.name}/`);
    });

    const ans = (await rl.question('選択してください (既定: 0): ')).trim();
    const v = ans.length > 0 ? ans : '0';
    if (v === '0') {
      return current;
    }
    if (v.toLowerCase() === 'u' && current !== root) {
      current = path.dirname(current);
      continue;
    }
    const idx = Number.parseInt(v, 10);
    if (Number.isFinite(idx) && idx >= 1 && idx <= children.length) {
      current = children[idx - 1].abs;
      continue;
    }
    // eslint-disable-next-line no-console
    console.log('入力が不正です。');
  }
}

async function promptChooseCategory(rl) {
  // eslint-disable-next-line no-console
  console.log('カテゴリーはどれにしますか？');
  CATEGORIES.forEach((c, i) => {
    // eslint-disable-next-line no-console
    console.log(`  ${i + 1}) ${c} (${CATEGORY_TO_LABEL[c]})`);
  });
  const idxRaw = await rl.question('番号で選択してください (例: 2): ');
  const idx = Number.parseInt(idxRaw.trim(), 10);
  assert(
    Number.isFinite(idx) && idx >= 1 && idx <= CATEGORIES.length,
    'カテゴリーの選択が不正です',
  );
  return CATEGORIES[idx - 1];
}

async function promptInteractive() {
  const rl = createInterface({ input, output });
  try {
    console.log('\n新しいページ（記事）を作成します。\n');

    // category
    console.log('カテゴリーはどれにしますか？');
    CATEGORIES.forEach((c, i) => {
      console.log(`  ${i + 1}) ${c} (${CATEGORY_TO_LABEL[c]})`);
    });
    const idxRaw = await rl.question('番号で選択してください (例: 2): ');
    const idx = Number.parseInt(idxRaw.trim(), 10);
    assert(
      Number.isFinite(idx) && idx >= 1 && idx <= CATEGORIES.length,
      'カテゴリーの選択が不正です',
    );
    const category = CATEGORIES[idx - 1];

    // slug
    const slugRaw = await rl.question('slug（URLの末尾。英小文字/数字/-/_）: ');
    const slug = normalizeSlug(slugRaw);

    // title
    const title = (await rl.question('タイトル: ')).trim();
    assert(title.length > 0, 'タイトルが空です');

    // add destination
    console.log('\n追加先を選んでください。');
    console.log('  1) トップ（カード一覧）に追加');
    console.log('  2) 他ページのサブページとして追加（親ページを辿って選ぶ）');
    console.log('  3) 両方');
    console.log('  4) 追加しない');
    const destRaw = (await rl.question('番号で選択してください (既定: 2): ')).trim();
    const dest = destRaw.length > 0 ? destRaw : '2';
    assert(['1', '2', '3', '4'].includes(dest), '一覧の追加先の選択が不正です');
    const addToHome = dest === '1' || dest === '3';
    const addToSubpage = dest === '2' || dest === '3';

    let parentDir = null;
    if (addToSubpage) {
      const categoryDir = path.join(PROJECT_ROOT, 'articles', category);
      await ensureDir(categoryDir);
      parentDir = await promptChooseParentDir(rl, categoryDir, 'create');
    }

    // image
    let image = null;
    if (addToHome) {
      const imgRaw = (await rl.question('サムネイル画像パス（空ならプレースホルダ）: ')).trim();
      image = imgRaw.length > 0 ? imgRaw : null;
    }

    return { category, slug, title, addToHome, addToSubpage, parentDir, image };
  } finally {
    rl.close();
  }
}

async function promptDeleteInteractive() {
  const rl = createInterface({ input, output });
  try {
    // eslint-disable-next-line no-console
    console.log('\n記事ページを削除します。\n');
    const category = await promptChooseCategory(rl);
    const categoryDir = path.join(PROJECT_ROOT, 'articles', category);
    assert(await exists(path.join(categoryDir, 'index.html')), 'カテゴリindexが見つかりません');

    const parentDir = await promptChooseParentDir(rl, categoryDir, 'delete');
    const children = await listChildPageDirs(parentDir);
    const canDeleteThisPage = path.resolve(parentDir) !== path.resolve(categoryDir);

    // eslint-disable-next-line no-console
    console.log('\n削除対象を選んでください。');
    if (canDeleteThisPage) {
      // eslint-disable-next-line no-console
      console.log(`  0) このページを削除する（警告: 配下の子ページもすべて削除）`);
    } else {
      // eslint-disable-next-line no-console
      console.log('  0) （この階層はカテゴリ直下のため削除できません）');
    }
    children.forEach((c, i) => {
      // eslint-disable-next-line no-console
      console.log(`  ${i + 1}) 子ページ: ${c.name}/`);
    });
    assert(canDeleteThisPage || children.length > 0, 'この階層には削除できるページがありません');

    const idxRaw = (await rl.question('番号で選択してください: ')).trim();
    const idx = Number.parseInt(idxRaw, 10);
    assert(Number.isFinite(idx), '選択が不正です');

    if (idx === 0) {
      assert(canDeleteThisPage, 'カテゴリ直下は削除できません');
      // eslint-disable-next-line no-console
      console.log(`\n削除対象: /${toPosixPath(path.relative(PROJECT_ROOT, parentDir))}/`);
      if (children.length > 0) {
        // eslint-disable-next-line no-console
        console.log(`警告: このページ配下の子ページ ${children.length} 件も一緒に削除されます。`);
      } else {
        // eslint-disable-next-line no-console
        console.log('警告: このページを削除します。');
      }
      const confirm = (await rl.question('本当に削除しますか？ (delete と入力): ')).trim();
      assert(confirm === 'delete', 'キャンセルしました');
      return { category, articleDir: parentDir, deleteSelf: true };
    }

    assert(idx >= 1 && idx <= children.length, '選択が不正です');
    const target = children[idx - 1];

    // eslint-disable-next-line no-console
    console.log(`\n削除対象: /${toPosixPath(path.relative(PROJECT_ROOT, target.abs))}/`);
    const confirm = (await rl.question('本当に削除しますか？ (delete と入力): ')).trim();
    assert(confirm === 'delete', 'キャンセルしました');

    return { category, articleDir: target.abs, deleteSelf: false };
  } finally {
    rl.close();
  }
}

async function cmdDeleteArticle() {
  assert(hasFlag('--interactive'), 'delete-article は --interactive のみ対応です');

  const { category, articleDir, deleteSelf } = await promptDeleteInteractive();

  const indexPath = path.join(articleDir, 'index.html');
  assert(await exists(indexPath), 'Target index.html not found');

  const categoryDir = path.join(PROJECT_ROOT, 'articles', category);
  assert(
    path.resolve(articleDir) !== path.resolve(categoryDir),
    'Refusing to delete category root',
  );

  const parentDir = path.dirname(articleDir);
  const slug = path.basename(articleDir);

  // 親のindexからリンク削除（あれば）
  await removeLinkFromParentIndex({ parentDir, slug });

  // トップカードからも削除（あれば）
  if (deleteSelf) {
    await removeFromHomeProjectsByUrlPrefix(urlFromDir(articleDir));
  } else {
    await removeFromHomeProjectsByUrl(urlFromDir(articleDir));
  }

  // 実ファイル削除
  await fs.rm(articleDir, { recursive: true, force: true });

  // eslint-disable-next-line no-console
  console.log(`Deleted: ${toPosixPath(path.relative(PROJECT_ROOT, articleDir))}`);
}

async function cmdNewArticle() {
  const interactive = hasFlag('--interactive');

  /** @type {string} */
  let category;
  /** @type {string} */
  let slug;
  /** @type {string} */
  let title;
  /** @type {boolean} */
  let addToHome;
  /** @type {boolean} */
  let addToSubpage;
  /** @type {string | null} */
  let parentDir;
  /** @type {string | null} */
  let image;

  if (interactive) {
    ({ category, slug, title, addToHome, addToSubpage, parentDir, image } =
      await promptInteractive());
  } else {
    const categoryRaw = getArg('--category');
    const slugRaw = getArg('--slug');
    const titleRaw = getArg('--title');
    const addToRaw = getArg('--add-to');
    const parentRaw = getArg('--parent');
    addToHome = hasFlag('--add-to-home'); // backward compat
    addToSubpage = hasFlag('--add-to-category') || hasFlag('--add-to-subpage'); // backward compat
    image = getArg('--image');

    assert(categoryRaw, 'Missing --category');
    assert(slugRaw, 'Missing --slug');
    assert(titleRaw, 'Missing --title');

    category = categoryRaw.trim().toLowerCase();
    assert(CATEGORIES.includes(category), `category must be one of: ${CATEGORIES.join(', ')}`);
    slug = normalizeSlug(slugRaw);
    title = titleRaw;

    if (addToRaw) {
      const v = addToRaw.trim().toLowerCase();
      assert(
        ['home', 'subpage', 'both', 'none'].includes(v),
        '--add-to must be one of: home, subpage, both, none',
      );
      addToHome = v === 'home' || v === 'both';
      addToSubpage = v === 'subpage' || v === 'both';
    }

    if (parentRaw) {
      const categoryDir = path.join(PROJECT_ROOT, 'articles', category);
      const trimmed = parentRaw.trim();
      if (trimmed.startsWith('./articles/') || trimmed.startsWith('articles/')) {
        parentDir = path.resolve(PROJECT_ROOT, trimmed.replace(/^\.\//, ''));
      } else if (trimmed === '.' || trimmed === './') {
        parentDir = categoryDir;
      } else {
        parentDir = path.resolve(categoryDir, trimmed);
      }
      // 安全対策: category配下以外は拒否
      const categoryDirResolved = path.resolve(categoryDir) + path.sep;
      const parentResolved = path.resolve(parentDir) + path.sep;
      assert(
        parentResolved.startsWith(categoryDirResolved),
        '--parent must be under articles/<category>/',
      );
    }
  }

  // paths
  const categoryDir = path.join(PROJECT_ROOT, 'articles', category);
  const categoryIndex = path.join(categoryDir, 'index.html');
  const parent = parentDir || categoryDir;
  const articleDir = path.join(parent, slug);
  const articleIndex = path.join(articleDir, 'index.html');

  // create category index if missing
  await ensureDir(categoryDir);
  if (!(await exists(categoryIndex))) {
    await fs.writeFile(
      categoryIndex,
      categoryIndexHtml({
        title: CATEGORY_TO_LABEL[category],
        cssDepth: 2,
      }),
      'utf8',
    );
  }

  // create article
  assert(
    !(await exists(articleIndex)),
    `Already exists: ${path.relative(PROJECT_ROOT, articleIndex)}`,
  );
  await ensureDir(articleDir);
  const cssDepth = cssDepthForDir(articleDir);
  await fs.writeFile(
    articleIndex,
    articleHtml({
      title,
      cssDepth,
    }),
    'utf8',
  );

  if (addToHome) {
    await addToHomeProjects({ category, title, image, url: urlFromDir(articleDir) });
  }
  if (addToSubpage) {
    await addLinkToParentIndex({ parentDir: parent, slug, title });
  }

  // eslint-disable-next-line no-console
  console.log(`Created: ${path.relative(PROJECT_ROOT, articleIndex)}`);
}

async function main() {
  const cmd = process.argv[2];
  if (!cmd || cmd === '--help' || cmd === '-h' || cmd === 'help') {
    printHelp();
    process.exit(0);
  }

  if (cmd === 'new-article') {
    await cmdNewArticle();
    return;
  }
  if (cmd === 'delete-article') {
    await cmdDeleteArticle();
    return;
  }

  throw new Error(`Unknown command: ${cmd}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err?.message || err);
  process.exit(1);
});
