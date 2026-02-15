## 開発・ビルド手順

### セットアップ

```bash
npm install
```

インストール対象（devDependencies）:

- vite, typescript, @types/node
- eslint, @typescript-eslint/{parser,eslint-plugin}
- prettier, eslint-config-prettier, eslint-plugin-prettier
- vite-plugin-static-copy

### 開発サーバ

```bash
npm run dev
```

`http://localhost:5173` で確認できます。

### ビルド

```bash
npm run build
```

出力は `dist/`。`npm run preview` でローカル確認可能です。

### 構成メモ

- `index.html`: エントリ（テンプレートエンジン無し）
- `src/main.ts`: UI 初期化（フィルタ/一覧描画）
- `src/projects.ts`: 型とデータ、ユーティリティ
- 既存の静的資産（`images/`, `font/`, `css/`, `articles/`）は `vite-plugin-static-copy` により dist へコピー

### Lint/Format

```bash
npm run lint
npm run format
```

### 備考

- 画像等は従来どおり `./images/...` 参照のままです。ビルド時は静的コピーで `dist/images` 等に配置されます。
- さらに依存を減らしたい場合は、`vite-plugin-static-copy` を外し、`public/` 配下へ資産を移動する運用に切り替えられます（その場合は参照パスを `/images/...` のように変更してください）。
