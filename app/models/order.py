from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    shopId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("shops.id")), nullable=True)
    shopName = db.Column(db.String, nullable=True)
    orderStatus = db.Column(db.String, nullable=False)
    orderType = db.Column(db.String, nullable=True)
    purchasedAt = db.Column(db.DateTime, nullable=True)

    orderDetails = db.relationship(
        "OrderDetail",
        back_populates="order",
        cascade="all, delete-orphan",
    )

    purchaser = db.relationship(
        "User",
        back_populates="orders"
    )

    shop = db.relationship(
        "Shop",
        back_populates="orders"
    )

    @property
    def total_price(self):
        if self.orderStatus == "Bag":
            return sum([detail.critter.price * detail.quantity for detail in self.orderDetails])
        return sum([detail.unitPrice * detail.quantity for detail in self.orderDetails])

    def checkout(self):
        """
        Validates status of order, updates orderStatus, purchasedAt, and snapshots shopName + orderDetails info
        """
        status = self.update_status()
        if type(status).__name__ == 'tuple':
            return status

        if self.orderType == "Delivery":
            self.orderStatus = "En Route"
        elif self.orderType == "Pickup":
            self.orderStatus = "Waiting for Pickup"
        else:
            return ("orderStatus", "Cannot check out")
        self.purchasedAt = datetime.now()
        self.shopName = self.shop["name"]
        _ = [detail.checkout() for detail in self.orderDetails]

    def _checkout_seeds(self):
        """checkout, but for seeder data"""
        self.shopName = self.shop["name"]
        _ = [detail.checkout() for detail in self.orderDetails]

    def complete_order(self):
        self.orderStatus = "Completed"

    def update_status(self):
        """
        Confirms that shop and associate critters exist, have not been deleted, and critter has enough stock.
        """
        if self.orderStatus == "Bag":
            if not self.shop:
                return ("shop", "Shop no longer exists")
            for detail in self.orderDetails:
                if not detail.critter:
                    return ("critter", "Critter no longer exists")
                if detail.critter.stock < detail.quantity:
                    return ("critter", "Critter no longer has enough stock. Please update your quantity")
                else:
                    detail.critter.stock -= detail.quantity
        else:
            return self.orderStatus

    def __getitem__(self, item):
        """Configures model to be conscriptable"""
        return getattr(self, item)

    def to_dict(self, scope=None):
        d = {
            "id": self.id,
            "userId": self.userId,
            "shopId": self.shopId,
            "shopName": self.shopName or (self.shop["name"] if self.shop else None),
            "orderStatus": self.orderStatus,
            "orderType": self.orderType,
            "purchasedAt": self.purchasedAt,
            "orderDetails": [detail.id for detail in self.orderDetails],
            "totalPrice": self.total_price,
            # "_shop": self._shop,
            # "checkout": self.purchasedFrom
        }

        if scope == "detailed":
            d["details"] = [detail.to_dict() for detail in self.orderDetails]

        return d
