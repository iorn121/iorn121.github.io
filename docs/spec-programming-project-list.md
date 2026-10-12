# 仕様: プログラミングの各プロジェクトをテーマのページへ移す

## 背景

各プロジェクトは `articles/create/programming/<slug>/` にある。トップの他カードは、リポジトリ名ではなく取り組んでいるテーマが名前になっている。

## スコープ

### トップのカードにする（Create）

URL は子ページのまま。カード名、`<h1>`、`<site-head>` の title、プログラミングページの子リンクをテーマ名に揃える。slug と本文のリポジトリ名は残す。カード画像は `images/thumbs/<slug>.svg`（800×500）。

| slug                  | テーマ名 |
| --------------------- | -------- |
| `yomu-kamo`           | 読書     |
| `shinjuku-chronowalk` | 謎解き   |
| `pocket-museum`       | 美術館   |
| `quant-ops`           | 投資     |
| `claude-automation`   | AI       |

「プログラミング」カードは残し、言語一覧と上の5件への入口にする。

### 既存ページへ移して、子ページは消す

- `tabi-no-shiori` の概要と GitHub リンクを `articles/enjoy/travel/index.html` の一節にする
- `aquasync` の概要と GitHub リンクを `articles/enjoy/jellyfish/index.html` の一節にする。既存の「習慣化アプリ」節は残す
- `color-verse` は `articles/study/color/index.html` にデモがある。GitHub リンクだけ色彩ページへ足し、子ページは消す。新しいカードは作らない

### 削除する

- `deai`
- `rhythm-mile`

ディレクトリと、プログラミングページからのリンクを消す。

### 非スコープ

- 残す子ページの slug 変更と、本文の技術説明の書き換え
- Create カテゴリ一覧への5件追加
- README の改善点バックログ本文。対応表（子ページの所在）だけ現状に合わせる
- 新規 npm 依存
- 手塚・料理のブランチ（`feat/life-checklists`）への混在

## 影響ファイル

- `src/projects.ts`
- `articles/create/programming/index.html`
- `articles/create/programming/{yomu-kamo,shinjuku-chronowalk,pocket-museum,quant-ops,claude-automation}/index.html`
- `articles/enjoy/travel/index.html`
- `articles/enjoy/jellyfish/index.html`
- `articles/study/color/index.html`
- `images/thumbs/{yomu-kamo,shinjuku-chronowalk,pocket-museum,quant-ops,claude-automation}.svg`
- 削除: `aquasync` / `tabi-no-shiori` / `color-verse` / `deai` / `rhythm-mile`
- `README.md` の対応表

## 検証

```bash
npm run lint
npm run build
```

トップに読書・謎解き・美術館・投資・AI が出ること。旅行に旅のしおり、クラゲに AQUASYNC、色彩に ColorVerse のリンクがあること。Deai と Rhythm Mile の URL が無いこと。
