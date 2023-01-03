from posts.posts_application import posts_app, posts_db
from currencies.currencies_application import currencies_app, currencies_db
from users.users_application import users_app, users_db


if __name__ == "__main__":
    with posts_app.app_context():
        posts_db.create_all()
    
    with users_app.app_context():
        users_db.create_all()

    with currencies_app.app_context():
        currencies_db.create_all()
