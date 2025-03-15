## 環境構築

### 仮想環境

```sh
# 仮想環境を作成
python -m venv .

# 仮想環境を有効化
source ./bin/activate

# 必要なパッケージをインストール
pip install -r requirements.txt
```

### データベース

Supabase の SQL Editor で以下の SQL 文を実行する．

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) NULL,
  created_at TIMESTAMP(0) WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(0) WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE TABLE dreams (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE hashtags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE dream_hashtags (
    id SERIAL PRIMARY KEY,
    dream_id INTEGER NOT NULL,
    hashtag_id INTEGER NOT NULL,
    FOREIGN KEY (dream_id) REFERENCES dreams(id),
    FOREIGN KEY (hashtag_id) REFERENCES hashtags(id),
    UNIQUE (dream_id, hashtag_id)
);

--- Function to sync auth.users to public.users
CREATE OR REPLACE FUNCTION public.sync_auth_users_to_public_users()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.users (id, email, created_at, updated_at)
    VALUES (NEW.id, NEW.email, NEW.created_at, NEW.updated_at);
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE public.users
    SET email = NEW.email,
        updated_at = NEW.updated_at
    WHERE id = OLD.id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    DELETE FROM public.users
    WHERE id = OLD.id;
    RETURN OLD;
  END IF;
END;
$$;

-- Trigger to call the above function
CCREATE TRIGGER sync_auth_users
  AFTER INSERT OR UPDATE OR DELETE ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.sync_auth_users_to_public_users();
```

`seeds` 以下のスクリプトを実行してサンプルデータを追加する．

`.env.sample` をコピーして `.env` を作成し，内容を記述する

```sh
cp .env.sample .env
```

## 起動方法

```sh
python app.py
```
