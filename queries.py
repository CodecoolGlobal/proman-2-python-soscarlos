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
        ORDER BY id ASC
        ;
        """
    )


def get_cards_for_board(board_id):
    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ORDER BY card_order ASC
        ;
        """
        , {"board_id": board_id})

    return matching_cards


def create_board(title):
    data_manager.execute_query(
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


def delete_card(card_id):
    data_manager.execute_query(
        """
        DELETE FROM cards
        WHERE id = %(id)s
        """,
        {"id": card_id})


def get_statuses():
    return data_manager.execute_select(
        """SELECT * FROM statuses
        ORDER BY id ASC
        ;
        """
    )


def create_status(title, board_id):
    data_manager.execute_query(
        """
        INSERT INTO statuses (title, board_id)
        VALUES (%(title)s, %(board_id)s)
        """,
        {"title": title,
         "board_id": board_id
         }
    )


def edit_status_title(status, status_id):
    data_manager.execute_query(
        """UPDATE statuses
           set title = %s
           WHERE id = %s;"""
        , (status["title"], status_id))


def update_status_id(new_status_id, card_id, status_id):
    data_manager.execute_query(
        """
        UPDATE cards
        set status_id = %s
        WHERE (id = %s AND status_id = %s);
        """
        , (new_status_id, card_id, status_id))


def update_card_order(card_id, new_order_number):
    data_manager.execute_query(
        """
        UPDATE cards
        set card_order = %s
        WHERE (id = %s)
        """
        , (new_order_number, card_id))


# TODO works partially, add to Backlog for 2nd Sprint
def update_cards_order(card_id, new_order_number, status_id, old_pos):
    data_manager.execute_query(
        """
        UPDATE cards
        set card_order = (card_order + 1)
        WHERE card_order >= %s
        AND id != %s
        AND status_id = %s
        AND card_order < %s
        ;
        """
        , (new_order_number, card_id, status_id, old_pos))


def update_card_name(card_id, new_card_name):
    return data_manager.execute_query(
        """
        UPDATE cards
        set title = %(new_card_name)s
        WHERE id = %(card_id)s;
        """, {"new_card_name": new_card_name["title"],
              "card_id": card_id
              }
    )
