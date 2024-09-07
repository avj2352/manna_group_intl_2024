-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/cXB9O4
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


-- User table is managed by Auth0
CREATE TABLE "User" (
    "_id" int   NOT NULL,
    "name" string   NOT NULL,
    "email" string   NOT NULL,
    "vendor" string   NOT NULL,
    "photo_url" string   NULL,
    CONSTRAINT "pk_User" PRIMARY KEY (
        "_id"
     )
);

CREATE TABLE "Product" (
    "_id" int   NOT NULL,
    "name" string   NOT NULL,
    "description" string   NULL,
    "content" string   NOT NULL,
    "created_by" int   NOT NULL,
    "created_date" string   NOT NULL,
    "price" string   NOT NULL,
    "quantity" int   NOT NULL,
    -- USD / EUR / INR
    "currency" string   NOT NULL,
    CONSTRAINT "pk_Product" PRIMARY KEY (
        "_id"
     )
);

CREATE TABLE "Asset" (
    "_id" int   NOT NULL,
    "position" int   NOT NULL,
    -- product / gallery / thumbnail / other
    "type" string   NOT NULL,
    "link" string   NOT NULL,
    CONSTRAINT "pk_Asset" PRIMARY KEY (
        "_id"
     )
);

CREATE TABLE "AssetProduct" (
    "_id" int   NOT NULL,
    "asset_id" int   NOT NULL,
    "product_id" int   NOT NULL,
    CONSTRAINT "pk_AssetProduct" PRIMARY KEY (
        "_id"
     )
);

CREATE TABLE "Order" (
    "_id" int   NOT NULL,
    "created_by" int   NOT NULL,
    "stripe_invoice" string   NOT NULL,
    "order_date" string   NOT NULL,
    -- on-delivery / online
    "order_type" string   NOT NULL,
    -- pending / shipped / delivered
    "order_status" string   NOT NULL,
    "products" int   NOT NULL,
    "shipping_address" string   NOT NULL,
    "billing_address" string   NOT NULL,
    CONSTRAINT "pk_Order" PRIMARY KEY (
        "_id"
     )
);

CREATE TABLE "Gallery" (
    "_id" int   NOT NULL,
    "group" string   NOT NULL,
    "title" string   NOT NULL,
    "description" string   NOT NULL,
    "position" int   NOT NULL,
    CONSTRAINT "pk_Gallery" PRIMARY KEY (
        "_id"
     )
);

CREATE TABLE "AssetGallery" (
    "_id" int   NOT NULL,
    "asset_id" int   NOT NULL,
    "gallery_id" int   NOT NULL,
    CONSTRAINT "pk_AssetGallery" PRIMARY KEY (
        "_id"
     )
);

ALTER TABLE "Product" ADD CONSTRAINT "fk_Product_created_by" FOREIGN KEY("created_by")
REFERENCES "User" ("_id");

ALTER TABLE "AssetProduct" ADD CONSTRAINT "fk_AssetProduct_asset_id" FOREIGN KEY("asset_id")
REFERENCES "Asset" ("_id");

ALTER TABLE "AssetProduct" ADD CONSTRAINT "fk_AssetProduct_product_id" FOREIGN KEY("product_id")
REFERENCES "Product" ("_id");

ALTER TABLE "Order" ADD CONSTRAINT "fk_Order_created_by" FOREIGN KEY("created_by")
REFERENCES "User" ("_id");

ALTER TABLE "Order" ADD CONSTRAINT "fk_Order_products" FOREIGN KEY("products")
REFERENCES "Product" ("_id");

ALTER TABLE "AssetGallery" ADD CONSTRAINT "fk_AssetGallery_asset_id" FOREIGN KEY("asset_id")
REFERENCES "Asset" ("_id");

ALTER TABLE "AssetGallery" ADD CONSTRAINT "fk_AssetGallery_gallery_id" FOREIGN KEY("gallery_id")
REFERENCES "Gallery" ("_id");

