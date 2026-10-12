# 仕様: テーマのページの下に、アプリ記事をぶら下げる

## 背景

トップのカードはテーマ（美術館、読書など）でまとめる。アプリの記事は、そのテーマの子ページであり、プログラミングの一覧からも辿れる。

## スコープ

### テーマページ（トップカード）

カードはテーマ名のまま。リンク先はテーマページ。カテゴリは Enjoy（色彩は既存の Study）。

| テーマ | パス                       | アプリ記事                 |
| ------ | -------------------------- | -------------------------- |
| 読書   | `enjoy/reading/`           | よむかも（Yomu-Kamo）      |
| 謎解き | `enjoy/mystery/`           | Shinjuku Chronowalk        |
| 美術館 | `enjoy/museum/`            | Pocket Museum              |
| 投資   | `enjoy/investing/`         | quant-ops                  |
| AI     | `enjoy/ai/`                | claude-automation          |
| 旅行   | `enjoy/travel/`（既存）    | 旅のしおり                 |
| クラゲ | `enjoy/jellyfish/`（既存） | AQUASYNC                   |
| 色彩   | `study/color/`（既存）     | ColorVerse（カラーバース） |

アプリ本文は各アプリ記事に置く。テーマページは短い導入と子リンクだけ。旅行の経県値、クラゲの好きな種類と習慣化アプリはテーマページに残す。

### プログラミング

`articles/create/programming/index.html` からも、上の8アプリへリンクする。ファイルの実体はテーマ配下に置く。

### 削除のまま

- `deai`
- `rhythm-mile`

### 非スコープ

- アプリ本文の技術説明の書き換え
- README の改善点バックログ本文。対応表だけ現状に合わせる
- 新規 npm 依存

## 検証

```bash
npm run lint
npm run build
```

トップの美術館から Pocket Museum へ進めること。プログラミングの一覧からも同じ Pocket Museum へ進めること。他の7件も同様。Deai と Rhythm Mile の URL が無いこと。
