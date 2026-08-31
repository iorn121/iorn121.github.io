# 仕様: PR Preview（Surge）（Issue #25）

## 背景

本番デプロイは `main`/`master` push 時のみ GitHub Pages へ出ている。PR 段階でビルド結果を URL で確認したい。オーナー回答により方式 **A（GitHub Actions + surge.sh）** を採用する。

## 決定事項（オーナー回答）

1. 方式: **A**（Actions + surge.sh）
2. 自動コメント: **はい**（PR にプレビュー URL を書き込む）
3. シークレット: **はい**（オーナーが `SURGE_TOKEN` 等を用意・追加）
4. 対象: **同一リポジトリの PR のみ**（fork はスキップ）

## 受け入れ条件（Acceptance Criteria）

1. 同一リポジトリの PR（opened / synchronize / reopened）で `npm run lint` → `npm run build` が走り、`dist/` が surge にデプロイされる。
2. デプロイ成功後、当該 PR にプレビュー URL がコメントされる（既存コメントがあれば更新し、スパムしない）。
3. fork 由来の PR ではジョブがスキップされ、Secret が外部に流れない。
4. PR が close（merge 含む）されたとき、対応する surge サイトが teardown される。
5. 本番用 `.github/workflows/gh-pages.yml` の挙動は変更しない。
6. トークン等の秘密情報はリポジトリにコミットせず、GitHub Actions Secrets 参照のみとする。
7. リポジトリの `npm run lint` / `npm run build` が成功する（アプリコード変更は原則なし）。

## スコープ

- 新規 workflow: `.github/workflows/pr-preview.yml`
- セットアップ手順の記載（本仕様ドキュメント）
- Issue / PR 向けの運用メモ（Secret 名、ドメイン命名）

## 非スコープ

- オーナーによる GitHub Secrets の実値登録（エージェントは不可）
- Cloudflare / Netlify / GitHub Pages 配下 `/pr/<n>/` 方式
- fork PR 対応
- Vite `base` 変更や本番デプロイフローの改修
- `package.json` への surge 依存追加（`npx` で実行）

## 影響ファイル

- `.github/workflows/pr-preview.yml`（新規）
- `docs/spec-pr-preview-surge.md`（本ファイル）

## 運用（オーナー作業）

1. [surge.sh](https://surge.sh) でアカウント作成し、ローカルで `npx surge token` によりトークンを取得する。
2. リポジトリ Settings → Secrets and variables → Actions に以下を追加する。
   - `SURGE_LOGIN`: surge 登録メールアドレス
   - `SURGE_TOKEN`: 取得したトークン
3. 本 PR を merge 後、同一リポジトリの別 PR でプレビュー URL コメントを確認する。

## ドメイン命名

`iorn121-github-io-pr-<PR番号>.surge.sh`

## 検証計画

- 静的: workflow YAML の構文・条件分岐のレビュー、`npm run lint` / `npm run build`
- ランタイム: Secrets 未設定時は失敗メッセージが分かる／設定後は同一リポ PR で URL が出る（merge 後の実 PR で確認）
- 非対象: fork PR スキップ条件のコードレビュー
