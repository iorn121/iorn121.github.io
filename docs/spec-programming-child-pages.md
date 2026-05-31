# 仕様: プログラミング配下に子記事ページを作成

## 背景

`articles/create/programming/index.html` に、メインで進めている複数プロジェクトと言語一覧が1ページにまとまっている。ローカルで整えた内容を `npm run kurage`（`new-page`）の規約に沿って**子記事**として切り出し、親ページからリンクする。

## スコープ

### やること

1. `kurage new-article` で次の9ページを `articles/create/programming/` 配下に作成する。
   - 追加先: **サブページのみ**（`--add-to subpage`）。トップの `projects.ts` には追加しない。
   - 親: `programming`（`--parent programming`）

| slug                  | タイトル（親リンク・ページ見出し） |
| --------------------- | ---------------------------------- |
| `yomu-kamo`           | よむかも（Yomu-Kamo）              |
| `aquasync`            | AQUASYNC                           |
| `tabi-no-shiori`      | 旅の栞（tabi-no-shiori）           |
| `color-verse`         | ColorVerse（カラーバース）         |
| `shinjuku-chronowalk` | Shinjuku Chronowalk                |
| `pocket-museum`       | Pocket Museum                      |
| `deai`                | Deai（であい）                     |
| `quant-ops`           | quant-ops                          |
| `rhythm-mile`         | Rhythm Mile（リズムマイル）        |

2. 各子ページの `index.html` に、現親ページの該当 `<section>` の本文（説明・`explicit-link`）を移す。新規 4 件は各リポジトリの README を要約して記載する。
3. 親 `programming/index.html` を整理する。
   - 残す: GitHub リンク、主に書いている言語、子ページ一覧（`kurage` が `<!-- kurage:child-links -->` に `<li>` を挿入）
   - 削除: 各プロジェクトの詳細セクション（子ページへ移動）

### 非スコープ

- トップカード（`src/projects.ts`）の追加・変更
- 新規 npm 依存の追加
- サムネイル画像の追加
- README の再取得（既存本文をそのまま移す）

## 影響ファイル

- `articles/create/programming/index.html`（編集）
- `articles/create/programming/{slug}/index.html`（新規 ×5）
- `tools/kurage.js` / テンプレート（変更なし・CLI 実行のみ）

## 検証

```bash
npm run lint
npm run build
```

ローカルで `npm run dev` し、親ページの子リンク一覧と各子ページの表示・CSS パスを確認する。

## 前提・確認事項

- 分割対象は上記5プロジェクトのみでよいか。
- slug・タイトル表の変更希望があれば承認前に指示すること。
