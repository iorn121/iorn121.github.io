# 仕様: トップページの SEO メタデータを静的配信する

## 背景

トップページのタイトルと viewport は `site-head` の実行後に設定され、初回 HTML には
description や Open Graph メタデータも存在しない。検索クローラーやリンクプレビューが
JavaScript を実行しなくてもページ情報を取得できる状態にする。

## スコープ

### やること

- `index.html` の言語を日本語にし、title、viewport、description、canonical URL、
  Open Graph、Twitter Card を静的に記述する。
- `robots.txt` からサイトマップを案内する。
- トップページと現存する記事ページを `sitemap.xml` に掲載する。
- `site-head` は favicon などの共通設定と既存記事ページの互換性のため維持する。

### 非スコープ

- トップページのプロジェクト一覧のプリレンダリング
- 各記事ページへの個別 description / Open Graph の追加
- サイトマップの自動生成
- 専用のラスター形式 OGP 画像の制作

## 影響ファイル

- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`

## 検証

```bash
npm run lint
npm run build
```

ビルド後の `dist/index.html` に静的メタデータが残り、`dist/robots.txt` と
`dist/sitemap.xml` が生成されることを確認する。
