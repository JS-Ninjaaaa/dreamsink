from datetime import datetime

from pydantic import (
    BaseModel,
    ValidationError,
    field_serializer,
    field_validator,
)

from schemas.hashtag import HashtagResponse


class MyDreamResponse(BaseModel):
    id: int
    user_id: str
    content: str
    is_public: bool
    likes: int
    hashtags: list[HashtagResponse]
    created_at: datetime
    updated_at: datetime

    @field_serializer("created_at")
    def serialize_created_at(self, created_at: datetime) -> str:
        return created_at.isoformat()

    @field_serializer("updated_at")
    def serialize_updated_at(self, updated_at: datetime) -> str:
        return updated_at.isoformat()


class GetMyDreamsParams(BaseModel):
    sort_by: str = "updated_at"

    @field_validator("sort_by")
    def validate_sort_by(cls, sort_by: str) -> str:
        if sort_by not in {"likes", "updated_at"}:
            raise ValidationError("Invalid sort_by value")

        return sort_by


class CreateMyDreamRequest(BaseModel):
    content: str
    is_public: bool = False
    # TODO: コメントアウトを外す
    # hashtags: list[str]

    @field_validator("content")
    def validate_content(cls, content: str) -> str:
        if len(content) == 0:
            raise ValidationError("Content is required")

        return content
