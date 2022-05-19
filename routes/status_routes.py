from __main__ import app
from flask import render_template, request, redirect, make_response

from util import json_response
import mimetypes
from queries import status_queries

mimetypes.add_type('application/javascript', '.js')

app.secret_key = "Super Duper Secret Key"


@app.route("/api/statuses")
@json_response
def get_statuses():
    return status_queries.get_statuses()


@app.route("/api/statuses/<int:status_id>", methods=["PUT"])
def update_status_title(status_id: int):
    """
    Update the specific status title according to its id
    """
    new_title = request.json
    status_queries.edit_status_title(new_title, status_id)
    return redirect("/")


@app.route("/api/cards/<int:card_id>/update/<int:status_id>", methods=["PUT"])
def update_status_id(card_id: int, status_id: int):
    """
    Update the status_id of a card
    """
    new_status_id_dict = request.json
    new_status_id = new_status_id_dict["new_status_id"]
    status_queries.update_status_id(new_status_id, card_id, status_id)
    return render_template('index.html')


@app.route("/api/statuses/create", methods=["POST"])
def create_status():
    status = request.json
    title = status["title"]
    board_id = status["board_id"]
    status_queries.create_status(title, board_id)

    return redirect("/")


@app.route("/api/statuses/delete/<int:status_id>", methods=["DELETE"])
def delete_status(status_id):
    status_queries.delete_status(status_id)

    return make_response("201")
