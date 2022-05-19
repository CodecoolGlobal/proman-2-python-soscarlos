from data import data_manager


def get_cards():
    return data_manager.execute_select(
        """
        SELECT *
        FROM cards
        """)


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


def create_card(card, board_id):
    data_manager.execute_query(
        """INSERT INTO cards (board_id, status_id, title, card_order)
        VALUES (%(board_id)s, %(status_id)s, %(title)s, %(card_order)s)
        """,
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


def update_card_order(card_id, new_order_number):
    data_manager.execute_query(
        """
        UPDATE cards
        set card_order = %s
        WHERE (id = %s)
        """
        , (new_order_number, card_id))


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


def update_archived(card_id, new_archived_status):
    return data_manager.execute_query(
        """
        UPDATE cards
        SET archived = %(new_archived_status)s
        WHERE id = %(card_id)s
        """, {"new_archived_status": new_archived_status["archived"],
              "card_id": card_id})
