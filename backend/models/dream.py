from __future__ import annotations

from models.db import get_supabase_client
from supabase import Client


class Dream:
    def __init__(
        self,
        id: int,
        user_id: str,
        content: str,
        is_public: bool,
        likes: int,
        hashtags: list[dict],
        created_at: str,
        updated_at: str,
    ):
        self.id = id
        self.user_id = user_id
        self.content = content
        self.is_public = is_public
        self.likes = likes
        self.hashtags = hashtags
        self.created_at = created_at
        self.updated_at = updated_at

    @classmethod
    def get_all_by_user(cls, user_id: str, sort: str) -> list[Dream]:
        # ユーザーの夢を全て取得
        supabase: Client = get_supabase_client()

        response = (
            supabase.table("dreams")
            .select("*, hashtags(*)")
            .eq("user_id", user_id)
            # ソート条件を受け取って適用
            .order(sort, desc=True)
            .execute()
        )
        my_dreams = [cls(**dream) for dream in response.data]
        return my_dreams

    @classmethod
    def create(cls, user_id: str, content: str, is_public=False) -> Dream:
        # 新しい夢の作成
        supabase: Client = get_supabase_client()

        response = (
            supabase.table("dreams")
            .insert({"user_id": user_id, "content": content, "is_public": is_public})
            .execute()
        )
        created_dream = response.data[0]
        return cls(**created_dream)

    @classmethod
    def delete(cls, dream_id: int) -> bool:
        # 夢を削除
        supabase: Client = get_supabase_client()

        response = (
            supabase.table("dreams")
            .delete()
            .eq("id", dream_id)
            .execute()
        )  # fmt: skip
        if len(response.data) == 0:  # 削除対象の夢が無かった場合
            return False

        return True

    @classmethod
    def get_all_public_dreams(cls) -> list[Dream]:
        # 公開されている夢を全て取得
        supabase: Client = get_supabase_client()
        response = (
            supabase.table("dreams")
            .select("*", "hashtags(*)")
            .eq("is_public", True)
            # id順で取得
            .order("id", desc=True)
            .execute()
        )
        public_dreams = [cls(**dream) for dream in response.data]
        return public_dreams

    @classmethod
    def toggle_visibility(cls, dream_id: int) -> Dream | None:
        # 夢の公開状態を切り替える
        supabase: Client = get_supabase_client()

        response = (
            supabase.table("dreams")
            .select("*")
            .eq("id", dream_id)
            .execute()
        )  # fmt: skip
        if len(response.data) == 0:
            return None

        visibility = response.data[0]["is_public"]
        response = (
            supabase.table("dreams")
            .update({"is_public": not visibility})
            .eq("id", dream_id)
            .execute()
        )

        return cls(**response.data[0])

    @classmethod
    def update_likes(cls, dream_id: int, likes: int) -> Dream | None:
        # 夢のいいね数を更新
        supabase: Client = get_supabase_client()

        response = (
            supabase.table("dreams")
            .update({"likes": likes})
            .eq("id", dream_id)
            .execute()
        )
        if len(response.data) == 0:
            return None

        return cls(**response.data[0])

    @classmethod
    def get_by_id(cls, id: int) -> Dream | None:
        # idに基づいて特定の夢を取得
        supabase: Client = get_supabase_client()
        response = (
            supabase.table("dreams")
            .select("*")
            .eq("id", id)
            .execute()
        )  # fmt: skip
        if len(response.data) == 0:
            return None

        return cls(**response.data[0])
