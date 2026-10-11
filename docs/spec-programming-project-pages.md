# 仕様: プログラミング配下はプロジェクトごとに別ページ

## 背景

開発中のアプリは、ポートフォリオのプログラミングページから個別に開けるようにする。あとから各ページに開発者向けの操作を足すときも、プロジェクトは1ページにまとめない。

## 要件

1. ハーネスが対象にする各プロジェクトは、`articles/create/programming/<slug>/index.html` に独立したページを持つ。
2. 親ページ `articles/create/programming/index.html` は、その各ページへのリンクを一覧に持つ。
3. リンクの追加は `kurage` の子リンク（`<!-- kurage:child-links -->` の直前）に合わせる。
4. トップのカード（`src/projects.ts`）には追加しない。

| slug                  | ページ見出し               | GitHub                        |
| --------------------- | -------------------------- | ----------------------------- |
| `yomu-kamo`           | よむかも（Yomu-Kamo）      | `iorn121/Yomu-Kamo`           |
| `aquasync`            | AQUASYNC                   | `iorn121/AQUASYNC`            |
| `tabi-no-shiori`      | 旅の栞（tabi-no-shiori）   | `iorn121/tabi-no-shiori`      |
| `color-verse`         | ColorVerse（カラーバース） | `iorn121/color-verse`         |
| `shinjuku-chronowalk` | Shinjuku Chronowalk        | `iorn121/shinjuku-chronowalk` |
| `pocket-museum`       | Pocket Museum              | `iorn121/pocket-museum`       |
| `quant-ops`           | quant-ops                  | `iorn121/quant-ops`           |
| `claude-automation`   | claude-automation          | `iorn121/claude-automation`   |

ポートフォリオ本体 `iorn121.github.io` は、この一覧の子ページにはしない。

既存の `deai` と `rhythm-mile` のページとリンクは残す。

## 対象外

- 開発者パスワードとハーネス起動のフォーム
- トップカードへの追加
- サムネイル画像の追加

## 確認

- プログラミングページの一覧から、上の各 slug のページへ移動できる。
- 各子ページの見出しが表のタイトルと一致する。
