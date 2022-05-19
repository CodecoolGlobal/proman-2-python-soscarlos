from flask import Flask, render_template, url_for
from dotenv import load_dotenv
import mimetypes

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
app.config['SERVER_NAME'] = 'localhost:5000'
load_dotenv()
app.secret_key = "Super Duper Secret Key"

from routes import board_routes, card_routes, status_routes, user_routes


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
