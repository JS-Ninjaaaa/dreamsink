from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from models.dream import Dream
from models.hashtag import Hashtag
from pydantic import ValidationError
from schemas.dream.mine import CreateMyDreamRequest, GetMyDreamsParams, MyDreamResponse

my_dream_bp = Blueprint("my_dream", __name__)


# 自分が作成した夢を取得
@my_dream_bp.route("/dreams/mine", methods=["GET"])
@jwt_required()
def get_my_dreams():
    user_id = get_jwt_identity()

    try:
        params = GetMyDreamsParams(**request.args)
    except ValidationError:
        return "Invalid query parameter", 400

    dreams = Dream.get_all_by_user(user_id, params.sort_by)

    try:
        dreams = [MyDreamResponse(**dream.__dict__) for dream in dreams]
    except ValidationError:
        return "Response Validation Error", 500

    return jsonify([dream.model_dump() for dream in dreams]), 200


# 夢を新規作成
@my_dream_bp.route("/dreams/mine", methods=["POST"])
@jwt_required()
def create_my_dream():
    body = request.get_json()
    try:
        body = CreateMyDreamRequest(**body)
    except ValidationError:
        return "Invalid request body", 400

    # JWTのヘッダからユーザーIDを取得
    user_id = get_jwt_identity()

    # 夢のテーブルにデータを追加
    created_dream = Dream.create(user_id, body.content, body.is_public)
    # TODO: ハッシュタグのテーブルにデータを追加
    # ハッシュタグのテーブルからIDを取得
    # テーブルに存在しない場合は新規作成
    hashtags = Hashtag.get_id_from_hashtag(body.hashtags)
    # TODO: 中間テーブルにデータを追加
    insert_middle_table = Hashtag.add_hashtags_to_dream(created_dream.id, hashtags)
    if insert_middle_table is False:
        return "Insert Data Error", 500

    try:
        created_dream = MyDreamResponse(**created_dream.__dict__)
    except ValidationError:
        return "Response Validation Error", 500

    return jsonify(created_dream.model_dump()), 201


@my_dream_bp.route("/dreams/mine/<int:dream_id>", methods=["PATCH"])
@jwt_required()
def toggle_visibility(dream_id: int):
    updated_dream = Dream.toggle_visibility(dream_id)
    if updated_dream is None:
        return "", 404

    try:
        updated_dream = MyDreamResponse(**updated_dream.__dict__)
    except ValidationError:
        return "Response Validation Error", 500

    return jsonify(updated_dream.model_dump()), 200


# 夢を削除
@my_dream_bp.route("/dreams/mine/<int:dream_id>", methods=["DELETE"])
@jwt_required()
def delete_my_dream(dream_id: int):
    if Dream.delete(dream_id):
        return "", 204  # 削除成功
    else:
        return "", 404  # 夢が存在しない
