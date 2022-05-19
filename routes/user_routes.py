from __main__ import app
from flask import render_template, request, redirect, session


import mimetypes
from queries import user_data_handler

mimetypes.add_type('application/javascript', '.js')

app.secret_key = "Super Duper Secret Key"


@app.route("/register", methods=["GET", "POST"])
def register_user():
    if request.method == "POST":
        user = request.form.get("username")
        pw = request.form.get("password")
        repeat = request.form.get("repeat")
        if user and pw and repeat:
            if user_data_handler.check_available_username(user):
                error_message = "Username already taken biatch"
                print(error_message)
            elif pw != repeat:
                error_message = "Passwords don't match biatch"
                print(error_message)
            else:
                user_data_handler.insert_user(user, pw)
                return redirect("/")
            return render_template("register.html", err_msg=error_message)
        else:
            error_message = "Please fill all the fields out biatch"
            return render_template("register.html", err_msg=error_message)
    return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login_user():
    if request.method == "POST":
        session["user"] = request.form.get("username")
        session["pw"] = request.form.get("password")
        user_credentials = user_data_handler.login(session["user"], session["pw"])
        if user_credentials:
            print("I AM LOGGED IN")
            return render_template("index.html", user=session["user"])
        else:
            session.clear()
            error_message = "Wrong username or password"
            return render_template("login.html", err_msg=error_message)
    return render_template("login.html")


@app.route("/logout")
def logout_user():
    session.clear()
    return redirect("/")
