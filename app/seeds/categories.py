from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from .utils import generate_address

fake = Faker()

CATEGORIES = [
    "Amphibians",
    "Arthropods",
    "Birds",
    "Cats",
    "Dogs",
    "Marines",
    "Other Mammals",
    "Other Critters",
    "Rabbits",
    "Reptiles",
    "Rodents",
]

# Adds a demo user, you can add other categories here if you want
def seed_categories():
    _ = [db.session.add(Category(name=cat)) for cat in CATEGORIES]
    # for cat in CATEGORIES:
    #     new_cat = Category(cat)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the categories table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
