# 仕様: トップページの a11y / UX 改善（Issue #3）

## 背景

GitHub Issue #3 で、動きを抑える設定、見出しサイズ、キーボード操作、コルク背景上の文字コントラストに改善点が挙げられている。オーナーコメント「対応したい」により実装を進める。

## 受け入れ条件（Acceptance Criteria）

1. `prefers-reduced-motion: reduce` のとき、ポラロイドカードの `--polaroid-tilt` が `0deg` になり、ホバー時の傾き・移動も発生しない。
2. `.title` の `font-size` が `pt` ではなく、ルート文字サイズに追従する `rem` ベースの `clamp()` になっている。
3. 「メインコンテンツへ」スキップリンクがヘッダー先頭にあり、フォーカス時に可視になり、`#app` へ移動できる（`#app` はフォーカス可能）。
4. トップのブランド見出し（`.title`）が、薄い `#f7f7f7` のコルク直置きではなく、十分なコントラストを持つ色＋背景面で表示される。
5. フィルターバー（`.bg-top`）とフッター上の文字が、コルク背景上で可読なコントラストになっている。
6. `npm run lint` と `npm run build` が成功する。

## スコープ

- `prefers-reduced-motion: reduce` 時にポラロイドの傾きとホバー移動を無効化（JS の初期 tilt ＋ CSS）。
- `.title` の `50pt` を `clamp(...rem...)` に置換。
- 共通ヘッダーにスキップリンクを追加し、`#app` に `tabindex="-1"` を付与。
- コルク上の薄い文字色を濃色化し、タイトル／フィルター／フッターにコントラスト用の背景面を付与。

## 非スコープ

- レイアウトやコンテンツの再設計
- 新規依存関係の追加
- プロジェクトデータや記事本文の変更
- memox 記事カード全体のモーション抑制（Issue はポラロイド指定）
- 専用のコントラスト計測 CI の導入

## 影響ファイル

- `src/main.ts`
- `src/ui/site-header.ts`
- `src/ui/site-footer.ts`
- `css/style.css`
- `docs/spec-a11y-ux.md`（本ファイル）

## 検証計画

- 静的: `npm run lint` / `npm run build`
- CSS: `.title` に `pt` が残っていないこと、`prefers-reduced-motion` メディアクエリがあること
- プレビュー: 通常表示と `emulateMediaFeatures(reduced-motion)` でカード傾きを確認
- キーボード: Tab でスキップリンク表示 → Enter で `#app` へ
- 見た目: デスクトップ／モバイル幅のスクリーンショット
