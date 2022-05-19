from main import app
from flask import render_template, request, make_response

from util import json_response
import mimetypes
from queries import card_queries

mimetypes.add_type('application/javascript', '.js')

app.secret_key = "Super Duper Secret Key"


@app.route("/api/cards")
@json_response
def get_all_cards():
    """
    All the cards
    """
    return card_queries.get_cards()


@app.route("/api/cards/<int:card_id>/update/<int:status_id>/card_order", methods=["PUT"])
def update_card_order(card_id: int, status_id: int):
    new_order = request.json
    new_order_number = new_order["new_order_number"]
    old_pos = new_order["old_card_position"]
    card_queries.update_card_order(card_id, new_order_number)
    card_queries.update_cards_order(card_id, new_order_number, status_id, old_pos)
    return render_template('index.html')


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belong to a board
    :param board_id: id of the parent board
    """
    return card_queries.get_cards_for_board(board_id)


@app.route("/api/boards/<int:board_id>/cards/create", methods=["POST"])
def create_card(board_id: int):
    card = request.json
    card_queries.create_card(card, board_id)

    return render_template("index.html")


@app.route("/api/cards/<int:card_id>/update", methods=["PUT"])
def update_card_name(card_id: int):
    new_card_name = request.json
    card_queries.update_card_name(card_id, new_card_name)

    return render_template('index.html')


@app.route("/api/cards/<int:card_id>/update/archived", methods=["PUT"])
def update_archived_status(card_id: int):
    new_archived_status = request.json
    card_queries.update_archived(card_id, new_archived_status)

    return render_template('index.html')


@app.route("/api/cards/delete/<int:card_id>", methods=["DELETE"])
def delete_card(card_id):
    card_queries.delete_card(card_id)

    return make_response("201")
