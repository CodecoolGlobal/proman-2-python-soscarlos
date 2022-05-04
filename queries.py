import data_manager


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})

    return status


def get_boards():
    """
    Gather all boards
    :return:
    """

    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ;
        """
    )


def get_cards_for_board(board_id):

    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_cards


def create_board(title):
    new_board = data_manager.execute_query(
        """
        INSERT INTO boards (title)
        VALUES (%(title)s);   
        """,
        {"title": title}
    )
    
    
def edit_title(board, board_id):
    data_manager.execute_query(
        """UPDATE boards
           set title = %s
           WHERE id = %s;"""
        , (board["title"], board_id))


def create_card(card, board_id):
    data_manager.execute_query(
        """INSERT INTO cards (board_id, status_id, title, card_order)
        VALUES (%(board_id)s, %(status_id)s, %(title)s, %(card_order)s)""",
        {"title": card["title"],
         "board_id": board_id,
         "status_id": card["status_id"],
         "card_order": card["card_order"]})
