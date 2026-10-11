# 仕様: 人生の取り組みをポートフォリオページにする

## 背景

ランニングなどと同じく、長く取り組んでいることをトップのカードから辿れるページにしたい。

- 講談社『手塚治虫漫画全集』（全400巻）を読む
- 作りたい料理をリストにしておく

記事の新規作成は `npm run kurage`（`new-article`）の規約に従う。

## 既存記事の構成（確認結果）

葉ページ（`articles/<category>/<slug>/index.html` と、プログラミング配下の孫ページ）は現行テンプレートと揃っている。

- `lang="ja"`、`<site-head>`、`memox memox--page`、`<!-- kurage:child-links -->`
- CSS の相対パスはディレクトリ深さどおり（カテゴリ直下 `../../../css/style.css`、プログラミングの子 `../../../../css/style.css`）

ずれているのはカテゴリ一覧3件（`articles/enjoy/index.html`、`articles/study/index.html`、`articles/create/index.html`）。

- `lang="en"` で、`<site-head>` がなく、タイトルが `Iori Portfolio` のまま
- フォントと favicon を HTML に直書きしている（葉ページは `site-head` に任せている）
- `memox--page` ではなくインラインの `max-width: 800px`
- 子リンクが実在ページと一致しない
  - Enjoy: ランニングのみ。Bio / クラゲ / 旅行が無い
  - Study: 空。色彩が無い
  - Create: 空。note / プログラミング / YouTube が無い

ヘッダーからはカテゴリ一覧へ飛んでいない（トップは `src/projects.ts` のカード）。URL を直接開くと、上記の古い一覧になる。

補足: `articles/enjoy/biography/index.html` は `site-head` の title が「自己紹介」、見出しとカードは「Bio」。今回は直さない。

## スコープ

### やること

1. `kurage new-article` で Enjoy 配下に次の2ページを作る。
   - 追加先: **トップと Enjoy 一覧の両方**（`--add-to both --parent .`）
   - サムネイル: 既存カードと同じ `images/thumbs/*.svg`（800×500）。プレースホルダは使わない

| slug            | タイトル         | カード画像                          |
| --------------- | ---------------- | ----------------------------------- |
| `tezuka-zenshu` | 手塚治虫漫画全集 | `./images/thumbs/tezuka-zenshu.svg` |
| `cooking`       | 作りたい料理     | `./images/thumbs/cooking.svg`       |

2. 手塚ページは巻単位のチェックリスト。
   - 対象は講談社『手塚治虫漫画全集』MT001–MT400（エッセイ等の別巻18冊を含む完結400巻）
   - 1巻1項目。ラベルは `001 ジャングル大帝（1）` の形
   - 第1期（001–100）から第4期（301–400）まで `<details>` で分ける
   - 初期状態はすべて未チェック
   - チェックの正は HTML の `checked`。公開ページに進捗が出るよう、入力は `disabled`（ブラウザだけの一時チェックは保存しない）
   - 進捗（`0 / 400`）は各期の見出しとページ冒頭に、チェック数と一致するよう書く

3. 料理ページは同じチェックリストの体裁。
   - 料理名の指定が無いため、初期リストは空
   - 概要の一文と、項目を足すときの例（コメント）だけ置く

4. チェックリスト用のスタイルを `css/style.css` に追加する（`.checklist`）。コンポーネントや依存は足さない。

5. カテゴリ一覧3件を葉ページと同じ骨格に揃える。
   - `lang="ja"`、`<site-head>`、`memox memox--page`、直書きのフォント / favicon を削除
   - 子リンクを実在ページに合わせる（Enjoy には今回の2件も含む）
   - 文言（Enjoy = エンタメ系、Study = 学習系、Create = 制作系）は維持する

### 非スコープ

- 既読の事前入力（読了巻の指定が無い）
- 料理名の創作
- `localStorage` など、ブラウザだけで進捗が残る仕組み
- biography の title / 見出しの不一致
- トップの並び順の最適化（`kurage` は `projects` 配列の末尾に追記する）
- 新規 npm 依存

## 影響ファイル

- `articles/enjoy/tezuka-zenshu/index.html`（新規）
- `articles/enjoy/cooking/index.html`（新規）
- `articles/enjoy/index.html`、`articles/study/index.html`、`articles/create/index.html`（骨格と子リンク）
- `src/projects.ts`（`kurage` が末尾追記。画像パスはサムネイルに合わせる）
- `images/thumbs/tezuka-zenshu.svg`、`images/thumbs/cooking.svg`（新規）
- `css/style.css`（`.checklist`）

## 検証

```bash
npm run lint
npm run build
```

ローカルでトップのカード、Enjoy 一覧、両チェックリスト（期の開閉、未チェック、`0 / 400`）、Study / Create 一覧の子リンクを確認する。

## 承認時に変えられる点

- カテゴリを Enjoy 以外にする
- 料理の初期項目を入れる（名前を指定してもらえれば入れる）
- チェックをブラウザに保存する
- カテゴリ一覧の修正を今回はやらない
