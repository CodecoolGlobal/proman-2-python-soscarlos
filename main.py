from flask import Flask, render_template, url_for, request, redirect
from dotenv import load_dotenv
from util import json_response
import mimetypes
import queries

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
load_dotenv()


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/api/boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return queries.get_boards()


@app.route("/api/boards/<int:board_id>", methods=["PUT"])
def update_board(board_id: int):
    """
    Update the specific board according to its id
    """
    new_title = request.json
    queries.edit_title(new_title, board_id)
    return render_template('index.html')


@app.route("/api/statuses/<int:status_id>", methods=["PUT"])
def update_status_title(status_id: int):
    """
    Update the specific status title according to its id
    """
    new_title = request.json
    queries.edit_status_title(new_title, status_id)
    return redirect("/")


@app.route("/api/cards/<int:card_id>/update/<int:status_id>", methods=["PUT"])
def update_status_id(card_id: int, status_id: int):
    """
    Update the status_id of a card
    """
    new_status_id_dict = request.json
    new_status_id = new_status_id_dict["new_status_id"]
    queries.update_status_id(new_status_id, card_id, status_id)
    return render_template('index.html')


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belong to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)


@app.route("/api/boards/create", methods=["POST"])
def create_board():
    board = request.json
    board_title = board["title"]
    queries.create_board(board_title)

    return render_template("index.html")


@app.route("/api/boards/<int:board_id>/cards/create", methods=["POST"])
def create_card(board_id: int):
    card = request.json
    queries.create_card(card, board_id)

    return render_template("index.html")


@app.route("/api/statuses")
@json_response
def get_statuses():
    return queries.get_statuses()


@app.route("/api/statuses/create", methods=["POST"])
def create_status():
    status = request.json
    title = status["title"]
    board_id = status["board_id"]
    queries.create_status(title, board_id)

    return redirect("/")


@app.route("/api/cards/delete/<int:card_id>")
def delete_card(card_id):
    queries.delete_card(card_id)

    return redirect("/")


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
