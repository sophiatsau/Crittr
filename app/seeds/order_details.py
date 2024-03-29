from app.models import db, OrderDetail, Order, environment, SCHEMA
from sqlalchemy.sql import text
from random import randint, sample

# Adds order_details
def seed_order_details():
    orders = Order.query.all()

    for order in orders:
        critters = order.shop.critters

        for critter in sample(critters, randint(1,len(critters))):
            new_detail = OrderDetail(
                orderId=order["id"],
                critterId=critter["id"],
                quantity=randint(1,8),
                # unitPrice=critter["price"]
            )
            db.session.add(new_detail)
            db.session.commit()

        order._checkout_seeds()
        # order.purchasedFrom = {"shop": "Placeholder"}

    db.session.commit()


# remove order_details table
def undo_order_details():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.order_details RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM order_details"))

    db.session.commit()
