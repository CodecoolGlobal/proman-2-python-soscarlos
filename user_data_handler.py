from werkzeug.security import generate_password_hash, check_password_hash
import data_manager as dm


@dm.connection_handler
def check_pw(cursor, username, password):
    query = "SELECT * FROM users WHERE %(username)s "
    cursor.execute(query, (username,))
    data = cursor.fetchone()
    return check_password_hash(data['password'], password)


@dm.connection_handler
def check_available_username(cursor, username):
    query = "SELECT * FROM users WHERE username=%s"
    cursor.execute(query, (username,))
    data = cursor.fetchone()
    if data:
        return True
    else:
        return False


@dm.connection_handler
def insert_user(cursor, username, password):
    query = "INSERT INTO users (username, password) VALUES(%s,%s)"
    hashed = generate_password_hash(password, 'sha256')
    cursor.execute(query, (username, hashed,))


@dm.connection_handler
def login(cursor, username, password):
    query = "SELECT * FROM users WHERE username=%s"
    cursor.execute(query, (username,))
    data = cursor.fetchone()
    if data:
        if check_pw(data["username"], password):
            return data
        else:
            return False
    else:
        return None
