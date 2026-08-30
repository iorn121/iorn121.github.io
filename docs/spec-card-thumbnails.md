# 仕様: トップカード用サムネイル差し替え（Issue #1）

## 背景 / 承認根拠

- Issue: https://github.com/iorn121/iorn121.github.io/issues/1
- オーナー選択: 「3. トップのカード用サムネイル差し替え」
- アセット方針: エージェントが各カード用の簡易 SVG を新規作成し `src/projects.ts` に紐付ける
- 「編集」は今回スコープ外（サムネ差し替えのみ）

## 要件

- `src/projects.ts` の各 `Project.image` を、共通プレースホルダから固有 SVG に変更する
- 対象 8 件: ランニング / Bio / 色彩 / note / クラゲ / 旅行 / プログラミング / YouTube
- 配置: `images/thumbs/<slug>.svg`（既存の `images/` コピー対象に含まれる）
- サイズ: 既存プレースホルダ同様 `800×500` viewBox
- `aria-label` は ASCII のみ（日本語ラベルの不正エンコーディングで `<img>` 表示が壊れるため）
- ライセンス: オリジナル簡易イラスト（外部商用アセットのコピーはしない）
- 商標ロゴの厳密再現は避ける（YouTube は汎用プレイボタン表現）

## 非スコープ

- OG / Twitter Card / GitHub Social preview
- README 整備
- 記事ページ本文の編集
- 写真・JPG 実写サムネへの差し替え

## 影響ファイル

- `docs/spec-card-thumbnails.md`（本仕様）
- `images/thumbs/*.svg`（新規）
- `src/projects.ts`（image パス更新）
