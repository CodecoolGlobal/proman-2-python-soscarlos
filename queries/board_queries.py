from data import data_manager


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


def create_board(title):
    board_id = data_manager.execute_select(
        """
        INSERT INTO boards (title)
        VALUES (%(title)s)
        RETURNING id;
        """,
        {"title": title}, False
    )
    return board_id


def edit_title(board, board_id):
    data_manager.execute_query(
        """UPDATE boards
           set title = %s
           WHERE id = %s;"""
        , (board["title"], board_id))


def delete_board(board_id):
    return data_manager.execute_query(
        """
        DELETE FROM boards
        WHERE id = %(b_id)s
        """, {"b_id": board_id})
