from __future__ import annotations

from models.db import get_supabase_client
from supabase import Client

class Hashtag:
    def __init__(
            self,
            id: int,
            name: str,
            created_at: str,
            updated_at: str
    ):
        self.id = id
        self.name = name
        self.created_at = created_at
        self.updated_at = updated_at

    @classmethod
    def get_id_from_hashtag(cls, names: list) -> list[str]:
        supabase: Client = get_supabase_client()
        # 入力に該当するハッシュタグを検索
        response = (
            supabase.table('hashtags')
            .select("id,name")
            .in_("name",names)
            .execute()
        )
        # Supabaseから取得した既存のハッシュタグ
        existing_hashtags = {}
        if response.data:
            for item in response.data:
                existing_hashtags[item["name"]] = item["id"]

        # 新規作成が必要なハッシュタグ
        new_hashtags = []
        for name in names:
            if name not in existing_hashtags:
                new_hashtags.append(name)
        # コピー作成
        combine_hashtags = existing_hashtags.copy()
        # 新規作成
        added_hashtags = cls.add_hashtags(new_hashtags)
        if added_hashtags:
            # 新しいハッシュタグをリストに追加
            for item in added_hashtags:
                combine_hashtags[item["name"]] = item["id"]

        # ハッシュタグのidリストを返す
        return [id.get('id') for id in combine_hashtags]


    # ハッシュタグを追加する
    @classmethod
    def add_hashtags(cls, hashtags: list) -> list:
        supabase: Client = get_supabase_client()
        # 挿入するデータ作成
        insert_data = [{"name": name} for name in hashtags]
        # Supabaseに挿入、取得
        response = (
            supabase.table('hashtags')
            .insert(insert_data)
            .select("id,name")
            .execute()
        )
        return response.data
    # 中間テーブルへの挿入
    @classmethod
    def add_hashtags_to_dream(cls,dream_id: int,hashtags: list) -> bool:
        supabase: Client = get_supabase_client()
        # 挿入するデータ作成
        insert_data = [{"dream_id": dream_id, "hashtag_id": hashtag} for hashtag in hashtags]
        # Supabaseに挿入
        response = (
            supabase.table('hashtags')
            .insert(insert_data)
            .execute()
        )
        # レスポンスによって成功か確認
        if response.data:
            return True
        return False