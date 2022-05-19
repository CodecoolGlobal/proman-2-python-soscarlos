from data import data_manager


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


def delete_status(status_id):
    return data_manager.execute_query(
        """
        DELETE FROM statuses
        WHERE id = %(status_id)s        
        """, {"status_id": status_id})
