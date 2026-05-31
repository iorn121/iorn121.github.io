# 仕様: README 改善点バックログの追加

## 背景

ローカル全リポジトリを `git pull` したうえで、`iorn121.github.io` 本体および関連プロジェクト（AQUASYNC, Yomu-Kamo 等）を横断監査し、機能・デザイン・セキュリティ・システム設計・運用の改善点を README に集約する。

## スコープ

### やること

- `README.md` に以下を追記する。
  - リポジトリ概要・技術スタック・開発手順（簡潔）
  - 改善点バックログ（カテゴリ別・チェックリスト形式）
  - 関連ローカルリポジトリ一覧とポートフォリオ子ページ slug の対応表
- **全関連プロジェクト**（AQUASYNC, Yomu-Kamo, color-verse, deai, pocket-museum, quant-ops, shinjuku-chronowalk, tabi-no-shiori, bbf-kubernetes, claude-automation）の各 `README.md` にも同形式の「改善点バックログ」セクションを追加する。
- **MyTemplates** — 用途が薄いためリポジトリ削除予定（2026-05-31）。監査対象から除外。

### 非スコープ

- バックログ項目の実装（本タスクはドキュメントのみ）
- 各子ページ HTML / 各 repo 本体コードの修正
- 依存アップグレード（Vite 8 等の breaking change）

## 影響ファイル

- `README.md`（編集）
- `docs/spec-readme-backlog.md`（本ファイル）
- 各プロジェクト `README.md` × 11

## 検証

```bash
npm run lint
npm run build
```

## 監査日

2026-05-31（ローカル workspace 全 git リポジトリ pull 済み）
