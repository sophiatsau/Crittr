from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
import random

fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_stores():
    emails = [fake.unique.email() for i in range(5)]
    for i in range(5):
        new_user = User(
            username=f'Demo{i}',
            email=emails[i],
            password='password',
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            balance=random.randint(10_000, 1_000_000)/100,
            address=fake.street_address(),
            city=fake.city(),
            state=fake.state_abbr(),
            zip_code=fake.zipcode(),
        )
        db.session.add(new_user)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
