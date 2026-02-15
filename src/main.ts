import '../css/style.css';
import './ui/site-header';
import './ui/site-footer';
import './ui/site-head';
import {
  projects as rawProjects,
  shuffleArray,
  type Project,
  type ProjectCategory,
} from './projects';

type FilterType = 'ALL' | ProjectCategory;

const FILTERS: FilterType[] = ['ALL', 'Enjoy', 'Study', 'Create'];

function filterProjects(all: readonly Project[], filter: FilterType): Project[] {
  if (filter === 'ALL') return [...all];
  return all.filter((p) => p.category === filter);
}

function createProjectCard(project: Project): HTMLElement {
  const root = document.createElement('a');
  // B案: ポラロイド風カード
  root.className = 'project polaroid';
  // カテゴリ別の配色クラスを付与（cat-Enjoy / cat-Study / cat-Create / cat-Others）
  root.classList.add(`cat-${project.category}`);
  // 個体差のある傾きを与える（-2.5〜2.5deg）
  const tilt = (Math.random() * 5 - 2.5).toFixed(2);
  root.style.setProperty('--polaroid-tilt', `${tilt}deg`);
  root.href = project.url;
  root.rel = 'noopener noreferrer';

  // ピン
  const pin = document.createElement('div');
  pin.className = 'pin';

  // フレーム＋画像
  const frame = document.createElement('div');
  frame.className = 'polaroid-frame';
  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'image-wrapper';
  const img = document.createElement('img');
  img.className = 'project-image';
  img.src = project.image;
  img.alt = project.title;
  imageWrapper.appendChild(img);
  frame.appendChild(imageWrapper);

  const postArea = document.createElement('div');
  postArea.className = 'post-area';
  const title = document.createElement('span');
  title.className = 'project-title';
  title.textContent = project.title;
  postArea.appendChild(title);

  root.appendChild(pin);
  // キャプションを枠の内側に配置
  frame.appendChild(postArea);
  root.appendChild(frame);

  return root;
}

function renderProjects(container: HTMLElement, data: readonly Project[]): void {
  container.innerHTML = '';
  const frag = document.createDocumentFragment();
  for (const p of data) {
    frag.appendChild(createProjectCard(p));
  }
  container.appendChild(frag);
}

function setupFilters(container: HTMLElement, onChange: (filter: FilterType) => void): void {
  container.innerHTML = '';
  const frag = document.createDocumentFragment();
  for (const f of FILTERS) {
    const span = document.createElement('span');
    span.className = 'filter';
    span.textContent = f;
    span.dataset.filter = f;
    frag.appendChild(span);
  }
  container.appendChild(frag);

  container.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null;
    if (!target || !target.classList.contains('filter')) return;
    // ヘッダー生成の<a>をクリックした場合でもSPAで切替
    if ((target as HTMLAnchorElement).tagName === 'A') {
      e.preventDefault();
    }
    const value = (target.dataset.filter as FilterType) ?? 'ALL';
    // URLのクエリも更新（直リンク対応）
    const params = new URLSearchParams(location.search);
    params.set('filter', value);
    history.replaceState(null, '', `${location.pathname}?${params.toString()}`);
    onChange(value);
  });
}

function setActiveFilter(container: HTMLElement, value: FilterType): void {
  for (const el of Array.from(container.querySelectorAll<HTMLElement>('.filter'))) {
    if (el.dataset.filter === value) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  }
}

function main(): void {
  const app = document.getElementById('app');
  if (!app) return;

  // フィルタはヘッダー内常設（グローバルに取得）
  const filtersEl = document.querySelector<HTMLElement>('.filters');
  const projectsEl = app.querySelector<HTMLElement>('.projects');
  if (!filtersEl || !projectsEl) return;

  const shuffled = shuffleArray(rawProjects);
  // URLクエリ ?filter=Study 等から初期値を決定
  const initial = (new URLSearchParams(location.search).get('filter') as FilterType) || 'ALL';
  let current: FilterType = initial;

  setupFilters(filtersEl, (next) => {
    current = next;
    setActiveFilter(filtersEl, current);
    renderProjects(projectsEl, filterProjects(shuffled, current));
  });

  setActiveFilter(filtersEl, current);
  renderProjects(projectsEl, filterProjects(shuffled, current));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
