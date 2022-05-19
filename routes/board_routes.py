from main import app
from flask import render_template, request, make_response

from util import json_response
import mimetypes
from queries import board_queries

mimetypes.add_type('application/javascript', '.js')

app.secret_key = "Super Duper Secret Key"


@app.route("/api/boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return board_queries.get_boards()


@app.route("/api/boards/<int:board_id>", methods=["PUT"])
def update_board(board_id: int):
    """
    Update the specific board according to its id
    """
    new_title = request.json
    board_queries.edit_title(new_title, board_id)
    return render_template('index.html')


@app.route("/api/boards/create", methods=["POST"])
@json_response
def create_board():
    board = request.json
    board_title = board["title"]
    board_id = board_queries.create_board(board_title)
    return board_id


@app.route("/api/boards/delete/<int:board_id>", methods=["DELETE"])
def delete_board(board_id):
    board_queries.delete_board(board_id)

    return make_response("201")
