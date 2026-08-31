# 仕様: トップページの SEO メタデータを静的配信する

Issue: #2  
ブランチ: `auto/issue-2-seo-metadata`

## 背景

トップページの `<title>` / viewport は `site-head` の JS 実行後にしか存在せず、
description・Open Graph も初回 HTML に無い。クローラやリンクプレビューが
JavaScript なしでページ情報を取得できるようにする。

## 受け入れ条件（Acceptance Criteria）

1. ビルド後の `dist/index.html` に、JS なしで `<title>`・`meta viewport`・`meta name="description"` が含まれる
2. トップの `<html lang>` が `ja` である
3. トップに Open Graph（`og:title` / `og:description` / `og:image` / `og:url`）と Twitter Card が静的に含まれる
4. `dist/robots.txt` が存在し、`Sitemap:` でサイトマップ URL を案内する
5. `dist/sitemap.xml` が存在し、トップと既存の全記事 `index.html` パスが掲載される
6. `site-head` は記事ページ互換のため維持し、トップの静的 meta と矛盾しない（同一 title / viewport）
7. `npm run lint` と `npm run build` が成功する

## スコープ

### やること

- `index.html` に静的な title / viewport / description / canonical / OG / Twitter Card
- `lang="ja"`
- `public/robots.txt` と `public/sitemap.xml`（GitHub Pages 向け絶対 URL）
- 本仕様メモの追加

### 非スコープ

- トップのプロジェクト一覧のプリレンダリング（Issue の「可能なら」扱い → 別 Issue 候補）
- 各記事ページへの個別 description / OG 追加
- サイトマップの自動生成パイプライン
- 専用ラスター OGP 画像の制作（暫定で既存 `favicon.svg` を利用）

## 影響ファイル

- `docs/spec-top-page-seo.md`
- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`

## 検証計画

| 面           | 方法                                                                   |
| ------------ | ---------------------------------------------------------------------- |
| 静的チェック | `npm run lint` / `npm run build`                                       |
| アセット     | `dist/robots.txt`・`dist/sitemap.xml` の配置と UTF-8 / XML well-formed |
| 初回 HTML    | `dist/index.html` を grep/head し meta の静的存在を確認                |
| 見た目       | `npm run preview` でトップ表示（meta は View Source 相当で確認）       |
