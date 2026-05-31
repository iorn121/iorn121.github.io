## このリポジトリについて

`iorn121.github.io` のポートフォリオ/メモサイトです。トップ（`/`）はカード型の一覧で、`Enjoy / Study / Create` のフィルタ表示に対応しています。記事は `articles/<category>/<slug>/` に静的 HTML として配置し、Vite でビルド・GitHub Pages へデプロイします。

## 技術スタック

| 項目       | 内容                                            |
| ---------- | ----------------------------------------------- |
| ランタイム | Node.js 20（CI 準拠）                           |
| 言語       | TypeScript（`strict: true`）                    |
| バンドラ   | Vite 5                                          |
| UI         | ネイティブ Web Components（フレームワークなし） |
| スタイル   | グローバル CSS（`css/style.css`）               |
| 品質       | ESLint + Prettier + Husky / lint-staged         |
| デプロイ   | GitHub Actions → `dist/` を GitHub Pages へ     |

## 開発

```bash
npm install
npm run dev        # 開発サーバー
npm run build      # dist 生成
npm run preview    # ビルド成果物の確認
npm run lint       # ESLint
npm run new-page   # 記事ページ作成（kurage CLI）
```

記事追加・削除は `npm run kurage`（`tools/kurage.js`）の規約に従う。トップカードに載せる場合は `src/projects.ts` も更新する（SSOT）。

## 関連ローカルリポジトリ ↔ ポートフォリオ子ページ

| ローカル repo         | 子ページ slug         | 備考                                                                                  |
| --------------------- | --------------------- | ------------------------------------------------------------------------------------- |
| `AQUASYNC`            | `aquasync`            | ✓                                                                                     |
| `Yomu-Kamo`           | `yomu-kamo`           | ✓                                                                                     |
| `color-verse`         | `color-verse`         | ✓（デモ URL あり）                                                                    |
| `deai`                | `deai`                | ✓                                                                                     |
| `pocket-museum`       | `pocket-museum`       | ✓                                                                                     |
| `quant-ops`           | `quant-ops`           | ✓                                                                                     |
| `shinjuku-chronowalk` | `shinjuku-chronowalk` | ✓                                                                                     |
| `tabi-no-shiori`      | `tabi-no-shiori`      | ✓                                                                                     |
| —                     | `rhythm-mile`         | 子ページあり・[PR #1](https://github.com/iorn121/rhythm-mile/pull/1) hygiene 作成済み |

### 監査対象外（アーカイブ済み）

| リポジトリ          | 理由                                                               |
| ------------------- | ------------------------------------------------------------------ |
| `MyTemplates`       | Astro テンプレ用途のみ。2026-05-31 アーカイブ                      |
| `bbf-kubernetes`    | 書籍ハンズオン用 fork。2026-05-31 アーカイブ                       |
| `claude-automation` | ローカル自動化（launchd）。ポートフォリオ非掲載・README 監査対象外 |

## 関連プロジェクトの改善点バックログ

各リポジトリの README に **「改善点バックログ」** セクションを追加済み（監査日: 2026-05-31）。ポートフォリオサイト本体の backlog は下記、各プロジェクトはそれぞれの README を参照。

| リポジトリ          | パス                               | 主な P1 課題                                              |
| ------------------- | ---------------------------------- | --------------------------------------------------------- |
| AQUASYNC            | `../AQUASYNC/README.md`            | PRD/実装乖離、Collection/Settings 未実装、CI/LICENSE なし |
| Yomu-Kamo           | `../Yomu-Kamo/README.md`           | JWT 署名検証、Phase 2/3 未実装、LICENSE ファイルなし      |
| color-verse         | `../color-verse/README.md`         | ダークモード/i18n UI、CI main-pass 弱い、LICENSE 未決     |
| deai                | `../deai/README.md`                | モバイル/a11y、Places API 未実装、CI/LICENSE なし         |
| pocket-museum       | `../pocket-museum/README.md`       | 矩形検出未実装、PWA アイコン、CI なし                     |
| quant-ops           | `../quant-ops/README.md`           | PR 向け CI なし、README と universe.json 手順不一致       |
| shinjuku-chronowalk | `../shinjuku-chronowalk/README.md` | 正解判定未接続、README/実装大乖離、docs/ なし             |
| tabi-no-shiori      | `../tabi-no-shiori/README.md`      | トップ UX、CLI スキャフォールド、LICENSE なし             |
| rhythm-mile         | `../rhythm-mile/README.md`         | PRD 先行・GPS/ルート未実装、子ページ同期                  |

### 横断テーマ（ポートフォリオ掲載 repo）

- **Dependabot**: Yomu-Kamo のみ整備。他 repo は hygiene PR で順次整備中
- **LICENSE**: quant-ops / Yomu-Kamo（README のみ MIT）以外は未整備が多い
- **CI**: hygiene PR 作成済み（AQUASYNC / deai / pocket-museum 等）
- **`.env.example`**: Yomu-Kamo は docs 止まりで example ファイル欠落
- **ポートフォリオ子ページ同期**: 各 repo README を正とする方針だが更新プロセス未定義

---

## 今後の対応策

優先度の高い項目は **改善点バックログ** を参照。以下はマイルストーン別の進め方。

### 短期（hygiene PR merge）

- **まず [PR #5](https://github.com/iorn121/iorn121.github.io/pull/5) をマージ** — Dependabot、CI lint、フィルタ URL 正規化、フォント、`lang=ja` 等
- **続けて各プロジェクトの hygiene PR をマージ**（各 repo README「今後の対応策」参照）

| リポジトリ          | PR                                                          | 主な内容                                                     |
| ------------------- | ----------------------------------------------------------- | ------------------------------------------------------------ |
| AQUASYNC            | [#1](https://github.com/iorn121/AQUASYNC/pull/1)            | LICENSE、Flutter CI、Dependabot、セットアップ/実装ステータス |
| deai                | [#1](https://github.com/iorn121/deai/pull/1)                | LICENSE、CI、Dependabot、ESLint、Node 20                     |
| Yomu-Kamo           | [#118](https://github.com/iorn121/Yomu-Kamo/pull/118)       | LICENSE、CHANGELOG、`.env.local.example`、README 修正        |
| color-verse         | [#29](https://github.com/iorn121/color-verse/pull/29)       | LICENSE、Dependabot、CI 強化                                 |
| tabi-no-shiori      | [#11](https://github.com/iorn121/tabi-no-shiori/pull/11)    | LICENSE、Dependabot、`typecheck` + CI                        |
| pocket-museum       | [#3](https://github.com/iorn121/pocket-museum/pull/3)       | LICENSE、CI、Dependabot、ESLint                              |
| quant-ops           | [#3](https://github.com/iorn121/quant-ops/pull/3)           | PR CI、Dependabot、README（universe.json）                   |
| shinjuku-chronowalk | [#4](https://github.com/iorn121/shinjuku-chronowalk/pull/4) | README/docs、LICENSE、Dependabot、PR build（base: `dev`）    |
| rhythm-mile         | [#1](https://github.com/iorn121/rhythm-mile/pull/1)         | LICENSE、Flutter CI、Dependabot、README roadmap/backlog      |

### 中期（P1 機能）

- **子ページ ↔ 各 repo README の同期** — programming 子ページの内容乖離修正と四半期チェックリストのたたき台
- **サムネイル差し替え** — `src/projects.ts` の placeholder をプロジェクト別画像へ
- **カテゴリ index の整理** — `articles/{enjoy,study,create}/index.html` と kurage 生成物の二重管理解消

### 長期（ポートフォリオ連携）

- **README ↔ 記事（子ページ）の定期同期** — 各 repo README を正とする方針の運用化
- **依存の定期監査** — `npm audit` と Dependabot の運用ルール整備

---

## 改善点バックログ

2026-05-31 時点の監査結果。優先度は `[P1]` 高 / `[P2]` 中 / `[P3]` 低。

### 機能（Functionality）

#### ポートフォリオサイト本体

- [ ] `[P1]` **子ページ ↔ 各 repo README の同期** — 親ページ方針どおり GitHub README を正とするが、更新プロセス未定義。四半期チェックリスト化を推奨
- [ ] `[P1]` **programming 子ページの内容乖離修正**
  - `shinjuku-chronowalk`: 子ページは謎解き、repo README は原稿用紙プロトタイプ → README 側を現状に合わせる
  - `tabi-no-shiori`: 子ページが「構築中」のみ。Svelte 5 / JSON テンプレ / 配色 theme 仕様を要約反映
  - `pocket-museum`: 矩形検出・台形補正を実装済み表現だが repo roadmap では未完了 → 文言を現状に合わせる
  - `quant-ops`: backtest / 売買シミュレーションが子ページ未記載
  - `yomu-kamo`: Phase 1.5（本管理 ISBN）等が子ページ未反映
- [ ] `[P2]` **rhythm-mile** — [PR #1](https://github.com/iorn121/rhythm-mile/pull/1) マージ後、子ページ内容を README 実装ステータスと整合
- [ ] `[P2]` **カテゴリ index ページの陳腐化** — `articles/{enjoy,study,create}/index.html` が手書き・子リンク不完全（kurage 生成物と二重管理）
- [ ] `[P2]` **フィルタ URL バリデーション** — `?filter=Invalid` がサイレントに ALL 扱い。無効値は ALL にフォールバック＋クエリ正規化
- [ ] `[P3]` **programming/index.html の言語一覧** — 固定リストが各 repo の実スタック（Flutter, Svelte 5 等）と乖離。動的化 or 定期手動更新

#### 各プロジェクト repo（ポートフォリオ経由で追跡）

- [ ] `[P1]` **AQUASYNC** — README は Firebase 前提だが `pubspec.yaml` に Firebase 未導入。PRD と実装差分を明示、Getting started 追加
- [ ] `[P1]` **Yomu-Kamo** — README が参照する `frontend/.env.local.example` が存在しない（`docs/ENVIRONMENT.md` のみ）
- [ ] `[P2]` **deai** — `package.json` に lint/typecheck なし。ロードマップ進捗が README のみ
- [ ] `[P2]` **color-verse** — README 末尾「100機能アイデア」が本体説明を埋もれさせる。別 doc 化検討

---

### デザイン / UX（Design）

#### ポートフォリオサイト本体

- [ ] `[P1]` **サムネイル全 placeholder** — `src/projects.ts` の全カードが `thumb_placeholder.svg`。プロジェクト別画像に差し替え
- [ ] `[P2]` **公開デモ URL の不足** — `color-verse` のみ Vercel リンクあり。`pocket-museum`, `deai`, `shinjuku-chronowalk`, `tabi-no-shiori` 等に live demo / スクリーンショット追加
- [ ] `[P2]` **html lang 不統一** — トップ・カテゴリ index が `lang="en"`、記事は `lang="ja"`。日本語主体なら `ja` に統一
- [ ] `[P2]` **レガシー index の head 構成** — カテゴリ index が `<site-head>` 未使用・Google Fonts を `<link>` 直書き。新テンプレート（`tools/templates/article.html`）と統一
- [ ] `[P2]` **max-width 不統一** — レガシー index は `800px`、新テンプレートは `860px`（`memox--page`）
- [ ] `[P2]` **ShigotoMemogaki フォント未ロード** — CSS で `font-family: 'ShigotoMemogaki'` を参照するが `@font-face` 未定義（`font/ShigotoMemogaki.ttf` は存在）
- [ ] `[P2]` **Google Fonts の @import** — `css/style.css` 先頭の `@import` はレンダリングブロック。`<link rel="preload">` + `<link>` 化で LCP 改善
- [ ] `[P2]` **インライン style 散在** — `site-header`, `site-footer`, カテゴリ index, travel ページ等。CSS クラスへ移行
- [ ] `[P3]` **アクセシビリティ**
  - フィルタに `aria-pressed` / `role="tablist"` 等なし
  - `prefers-reduced-motion` 未対応（ポラロイド傾き・ホバーアニメ）
  - カード画像に `loading="lazy"` なし
- [ ] `[P3]` **OG / Twitter Card / meta description 未設定** — SNS シェア時のプレビュー改善
- [ ] `[P3]` **color-verse** — i18n 対応済みだが子ページは日本語のみ

---

### セキュリティ（Security）

#### ポートフォリオサイト本体

- [ ] `[P1]` **npm 依存の脆弱性** — `npm audit` で 15 件（high 9 / moderate 6）。`npm audit fix` で解消可能なものから対応。Vite 8 系は breaking change のため計画的上げ
- [ ] `[P2]` **Dependabot 未設定** — `iorn121.github.io` に `.github/dependabot.yml` なし。npm / GitHub Actions 向け追加
- [ ] `[P2]` **Google Analytics の重複・分散** — GA スクリプトが `index.html` のみ。サブページ計測なし。`.cursorrules` 方針どおり `src/` 内設定モジュールへ集約
- [ ] `[P2]` **CSP / セキュリティヘッダ未設定** — GitHub Pages 制約内で meta CSP または `_headers` 相当の検討
- [ ] `[P3]` **font/.DS_Store** — `.gitignore` は設定済みだが `font/` 配下に実ファイル残存。削除推奨

#### 横断（関連 repo）

- [ ] `[P1]` **Dependabot ほぼ未整備** — Yomu-Kamo のみ。他 repo（npm / pub / pip / actions）へ横展開
- [ ] `[P1]` **`.env.example` 標準化** — Yomu-Kamo は docs 止まりで example ファイル欠落
- [ ] `[P2]` **AQUASYNC** — `.gitignore` に `google-services.json` / `.env` パターンなし（Firebase 導入前に追加）
- [ ] `[P2]` **Yomu-Kamo** — `backend/.env*.example` 未整備
- [ ] `[P2]` **color-verse** — `remote-ai-agent.yml` の `CURSOR_API_KEY` 未設定時の失敗を README に明記
- [ ] `[P3]` **deai / pocket-museum** — 将来 API キー（Places / Supabase）用 `.env.example` 先行作成

---

### システム設計（System Design）

#### ポートフォリオサイト本体

- [ ] `[P1]` **CI に lint 未組込** — `.github/workflows/gh-pages.yml` は `npm run build` のみ。`npm run lint` を build 前に追加
- [ ] `[P2]` **projects.ts と articles の二重 SSOT** — トップカードは `src/projects.ts`、記事ツリーは `articles/`。kurage は `--add-to home` 時のみ同期。手動 drift リスク
- [ ] `[P2]` **site-head の未使用メソッド** — `ensureStylesheet()` が dead code
- [ ] `[P2]` **tsconfig の jsx: react-jsx** — React 未使用。`jsx` 設定の見直し
- [ ] `[P2]` **開発時 CSS 配信の非対称** — トップは `main.ts` から CSS import、記事は HTML の `<link>` 依存。開発・本番で経路が異なる
- [ ] `[P2]` **site-header の `/` リンク** — ルート相対 `/` は GitHub Pages user site では動くが、将来 base path 変更時に壊れる。相対パス or `import.meta.env.BASE_URL` 化
- [ ] `[P3]` **テストスイートなし** — ユニット / E2E 未整備。最低限 `projects.ts` フィルタ・kurage slug バリデーションのテスト余地
- [ ] `[P3]` **ビルド成果物の favicon 配置** — `public/favicon.svg` の dist コピー経路をドキュメント化

#### 各プロジェクト repo（設計・SSOT）

- [ ] `[P2]` **AQUASYNC** — README=PRD、コード=早期 Flutter。アーキテクチャ節（現状 vs 予定）で SSOT 化
- [ ] `[P2]` **Yomu-Kamo** — フルスタック（FE/BE/DB/CI/docs）の参照モデル。他 repo の雛形にできる
- [ ] `[P2]` **pocket-museum** — ローカル first（Dexie）→ Supabase の段階設計は README で明確。子ページにも v0.1 / v0.3 フェーズを1行
- [ ] `[P2]` **quant-ops** — GHA → JSON → README 自動更新パイプラインが成熟。他 data-driven repo のテンプレに

---

### ドキュメント / 運用（Docs & Ops）

#### ポートフォリオサイト本体

- [ ] `[P1]` **README 拡充** — 本バックログ追加済み。今後は項目消化に合わせて更新
- [ ] `[P2]` **docs/ の索引** — `spec-programming-child-pages.md` 等の一覧・目的を README からリンク
- [ ] `[P3]` **CHANGELOG 未整備** — サイト変更履歴の記録方針

#### 各プロジェクト repo

- [ ] `[P1]` **shinjuku-chronowalk README 更新** — 謎解きゲーム説明へ（最優先 docs タスク）
- [ ] `[P2]` **AQUASYNC** — LICENSE 未記載、セットアップ・テスト手順なし、CI なし
- [ ] `[P2]` **deai** — CI / lint / LICENSE なし。最小 `npm run build` CI が低コスト
- [ ] `[P2]` **pocket-museum** — README は Vercel 手順詳細だが CI なし（`npm run lint` は package.json に存在）
- [ ] `[P2]` **color-verse** — LICENSE「後日決定」。公開 repo なら早期決定
- [ ] `[P2]` **tabi-no-shiori** — CI 良好。デプロイ先・公開 URL の README 記載なし
- [ ] `[P3]` **LICENSE 方針統一** — quant-ops / Yomu-Kamo は MIT。他 repo は未決 or 未記載が多い

---

## 監査メモ

- ローカル workspace 全 git リポジトリ: 2026-05-31 pull 済み（`pocket-museum` のみ PWA アイコン追加を取得）
- 検証: `npm run lint` / `npm run build` 通過（監査時点）
