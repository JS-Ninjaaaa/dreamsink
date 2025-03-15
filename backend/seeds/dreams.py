import os
from supabase import create_client, Client
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ユーザーのメールアドレスと夢のデータ
dreams_list = [
    ("testuser1@example.com", "宇宙に行って地球を眺めるのが夢です。", True, 78),
    ("testuser2@example.com", "自分の書いた物語を本にして出版したい。", True, 5),
    ("testuser3@example.com", "世界中の国を巡り、文化を体験したい。", True, 125),
    ("testuser1@example.com", "自分でオリジナルのゲームを作りたい。", False, 2),
    ("testuser2@example.com", "世界各国の料理を学んで最高のシェフになる。", True, 39),
    ("testuser3@example.com", "自分の頭の中にある物語を映画にしたい。", False, 0),
    ("testuser1@example.com", "人の役に立つAI搭載ロボットを作りたい。", True, 63),
    ("testuser2@example.com", "陸上競技でオリンピックに出場したい。", False, 11),
    ("testuser3@example.com", "有名なアーティストをプロデュースするのが夢。", True, 92),
    ("testuser1@example.com", "家族と快適に暮らせる家を建てたい。", True, 28),
    ("testuser2@example.com", "落ち着ける空間を提供するカフェを開きたい。", True, 1),
    ("testuser3@example.com", "自分の描いた絵で人を感動させたい。", False, 155),
    ("testuser1@example.com", "便利なWebサービスを開発したい。", True, 7),
    ("testuser2@example.com", "子供達に勉強の楽しさを教えたい。", True, 45),
    ("testuser3@example.com", "美味しい野菜や果物を育てて、消費者を笑顔にしたい。", True, 187),
    ("testuser1@example.com", "アニメやゲームでキャラクターに命を吹き込みたい。", False, 3),
    ("testuser2@example.com", "人々の生活を豊かにするデザインをしたい。", True, 52),
    ("testuser3@example.com", "まだ見ぬ世界を探検し、新たな発見をしたい。", True, 210),
    ("testuser1@example.com", "ソフトウェア開発を通じて社会に貢献したい。", True, 9),
    ("testuser2@example.com", "空を自由に飛び回りたい。", False, 13),
]

# 現在の日時を取得
now = datetime.utcnow().isoformat()

# dreams_data に格納するためのリスト
dreams_data = []

# dreams_list のメールアドレスに紐づく user_id を取得して dreams_data に追加
for email, content, is_public, likes in dreams_list:
    # ユーザーIDをゲット
    response = supabase.table("users").select("id").eq("email", email).execute()


    if response.data:
        user_id = response.data[0]["id"]  # ユーザーIDを取得
        dreams_data.append({
            "user_id": user_id,
            "content": content,
            "is_public": is_public,
            "likes": likes,
            "created_at": now,
            "updated_at": now,
        })
    else:
        print(f"ユーザー {email} が見つかりませんでした。")

# dreams テーブルにデータを挿入
if dreams_data:
    supabase.table("dreams").insert(dreams_data).execute()
    print("データ挿入完了！")
else:
    print("データがありません。")
