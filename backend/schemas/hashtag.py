from pydantic import BaseModel

class HashtagResponse(BaseModel):
    id: int
    name: str
