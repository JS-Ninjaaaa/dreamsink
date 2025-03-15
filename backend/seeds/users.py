# サンプルデータを挿入する
import os

from supabase import create_client,Client
from dotenv import load_dotenv
load_dotenv()

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# sample user
# ユーザー作成
users = [
    {"email": "testuser1@example.com", "password": "password1"},
    {"email": "testuser2@example.com", "password": "password2"},
    {"email": "testuser3@example.com", "password": "password3"},
]
# supabaseのauth.usersに挿入
for user in users:
    auth_response = supabase.auth.sign_up(user)
    print(auth_response)

