from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.orm import declarative_base
from sqlalchemy import select
# ..custom
from util.env_config import SQL_CONN, DB_NAME, MAX_DB_CONN, DB_PASSWORD, DB_USERNAME

# Create a base class for declarative models
Base = declarative_base()

# Promotion - entity
class Promotion(Base):
    __tablename__ = "promotions"
    _id = Column(Integer, primary_key=True)
    promotion_id = Column(String(50), unique=True, nullable=False)
    name = Column(String(50), unique=True, nullable=False)
    description = Column(String(120), nullable=False)
    start_date = Column(String(120), nullable=False)
    end_date = Column(String(120), nullable=False)
    percentage = Column(Integer, nullable=False)
    
    def __repr__(self):
        return f"<Promotion(id={self.id}, \
            promotion_id='{self.promotion_id}', \
            name='{self.name}', \
            description={self.description}, \
            start_date={self.start_date}, \
            end_date={self.end_date}, \
            percentage={self.percentage})>"

# User - entity
class User(Base):
    __tablename__ = 'users'

    _id = Column(Integer, primary_key=True)    
    user_id = Column(String(50), unique=True, nullable=False)
    name = Column(String(50), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    vendor = Column(String(120), nullable=False)

    def __repr__(self):
        return f"<User(id={self.id}, \
        user_id='{self.user_id}', \
        name='{self.name}', \
        email={self.email}, \
        vendor={self.vendor})>"

# Product - entity
class Product(Base):
    __tablename__ = 'products'
    
    id = Column(Integer, primary_key=True)
    product_id = Column(String, unique=True)
    name = Column(String)
    description = Column(String)
    content = Column(String)
    created_by = Column(String)
    created_date = Column(String)
    price = Column(String)
    quantity = Column(Integer)
    currency = Column(String)
    
    def __repr__(self):
        return f"<Product(if={self.id}, \
            product_id='{self.product_id}', \
            name='{self.name}', \
            description='{self.description}', \
            content='{self.content}', \
            created_by='{self.created_by}', \
            created_date='{self.created_date}', \
            price='{self.price}', \
            quantity='{self.quantity}', \
            currency='{self.currency}')>"


class Order(Base):
    __tablename__ = 'orders'
    
    id = Column(Integer, primary_key=True)
    order_id = Column(String, unique=True)
    name = Column(String)
    email = Column(String)
    stripe_invoice = Column(String)
    total_amount = Column(Integer)
    order_date = Column(String)
    order_type = Column(String)
    order_status = Column(String)
    shipping_address = Column(String)
    billing_address = Column(String)
    
    def __repr__(self):
        return f"<Order(id={self.id}, \
            order_id='{self.order_id}', \
            name='{self.name}', \
            email='{self.email}',\
            stripe_invoice='{self.stripe_invoice}',\
            total_amount='{self.total_amount}',\
            order_date='{self.order_date}',\
            order_type='{self.order_type}',\
            order_status='{self.order_status}',\
            shipping_address='{self.shipping_address}',\
            billing_address='{self.billing_address}')>"

class Asset(Base):
    __tablename__ = 'assets'
    
    id = Column(Integer, primary_key=True)
    asset_id = Column(String, unique=True)
    position = Column(Integer)
    asset_type = Column(String)
    description = Column(String)
    asset_key = Column(String)
    
    def __repr__(self):
        return f"<Asset(id={self.id}, \
            asset_id='{self.asset_id}', \
            position='{self.position}', \
            type='{self.type}', \
            description='{self.description}', \
            link='{self.link}')>"

class Gallery(Base):
    __tablename__ = 'galleries'
    
    id = Column(Integer, primary_key=True)
    gallery_id = Column(String, unique=True)
    group = Column(String)
    title = Column(String)
    description = Column(String)
    position = Column(Integer)
    
    def __repr__(self):
        return f"Gallery(id={self.id}, \
            gallery_id='{self.gallery_id}', \
            group='{self.group}', \
            title='{self.title}', \
            description='{self.description}', \
            position='{self.position}')>"

# ------------MAPPINGS ------------------------#

class PromotionOrder(Base):
    __tablename__ = 'promotion_orders'
    id = Column(Integer, primary_key=True)
    promotion_id = Column(String, ForeignKey('promotions.promotion_id'))
    order_id = Column(String, ForeignKey('orders.order_id'))

class OrderProduct(Base):
    __tablename__ = 'order_products'
    
    id = Column(Integer, primary_key=True)
    order_id = Column(String, ForeignKey('orders.order_id'))
    product_id = Column(String, ForeignKey('products.product_id'))

class AssetProduct(Base):
    __tablename__ = 'asset_products'
    
    id = Column(Integer, primary_key=True)
    asset_id = Column(String, ForeignKey('assets.asset_id'))
    product_id = Column(String, ForeignKey('products.product_id'))
    position = Column(Integer)


class AssetGallery(Base):
    __tablename__ = 'asset_galleries'
    
    id = Column(Integer, primary_key=True)
    asset_id = Column(String, ForeignKey('assets.asset_id'))
    gallery_id = Column(String, ForeignKey('galleries.gallery_id'))
    position = Column(Integer)

# Example of creating an engine and initializing the database
# engine = create_engine('sqlite:///example.db')
# Base.metadata.create_all(engine)

def init():
    engine = create_engine(f"postgresql://{DB_USERNAME}:{DB_PASSWORD}@{SQL_CONN}/{DB_NAME}")
    Base.metadata.create_all(engine)

if __name__ == "__main__":
    init()