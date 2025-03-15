# Dream Sink

書き溜めた夢を公開して「いいね！」がもらえるWebサービス

- [サービスのリンク](https://dreamsink.vercel.app/)
- [API 仕様書](https://js-ninjaaaa.github.io/dreamsink/)
- テストユーザー

| 項目         | 値                        |
|------------|-------------------------|
| メールアドレス | `testuser1@example.com` |
| パスワード   | `password1`                |

## 機能一覧

- ログイン
    - [x] メールアドレス & パスワード
    - [x] Xアカウント
        - メールアドレス登録済み
- 自分の夢
    - [x] 夢の作成
    - [x] 夢の閲覧
    - [ ] 夢の編集
    - [X] 夢の削除
    - [x] 公開 or 非公開設定
- 公開されている夢
    - [x] 夢の閲覧
    - [ ] 夢の絞り込み
    - [x] いいね！

## 画面

<details>
<summary>自分の夢画面</summary>
<image src="https://github.com/user-attachments/assets/9ba573db-10b1-422a-bb93-8c848bd5ab35" width="700">
</details>

<details>
<summary>みんなの夢画面</summary>
<image src="https://github.com/user-attachments/assets/e6e237da-abbd-4704-8b09-a3105d8e335d" width="700">
</details>

## 技術スタック

| カテゴリ       | 技術                                        | 
| -------------- | ------------------------------------------- | 
| フロントエンド | React, React Router, Tailwind CSS, Radix UI, Jotai | 
| バックエンド   | Flask, Pydantic                                    | 
| データベース   | Supabase                                  | 

## ER図

```mermaid
erDiagram
    USERS {
        UUID id PK "ユーザーID"
        VARCHAR email "メールアドレス"
        TIMESTAMP created_at "作成日時"
        TIMESTAMP updated_at "更新日時"
    }
    DREAMS {
        INTEGER id PK "夢ID"
        UUID user_id FK "ユーザーID"
        TEXT content "内容"
        BOOLEAN is_public "公開フラグ"
        INTEGER likes "いいね数"
        TIMESTAMP created_at "作成日時"
        TIMESTAMP updated_at "更新日時"
    }
    HASHTAGS {
        INTEGER id PK "ハッシュタグID"
        VARCHAR name "ハッシュタグ名"
        TIMESTAMP created_at "作成日時"
        TIMESTAMP updated_at "更新日時"
    }
    DREAM_HASHTAGS {
		    INTEGER id PK "中間テーブルID"
        INTEGER dream_id FK "夢ID"
        INTEGER hashtag_id FK "ハッシュタグID"
    }
    USERS ||--o{ DREAMS : "has many"
    DREAMS ||--o{ DREAM_HASHTAGS : "has many"
    HASHTAGS ||--o{ DREAM_HASHTAGS : "has many"
```
