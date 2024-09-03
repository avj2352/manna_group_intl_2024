-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/cXB9O4
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


-- User table is managed by Auth0
CREATE TABLE "User" (
    "user_id" int   NOT NULL,
    "name" string   NOT NULL,
    "email" string   NOT NULL,
    "vendor" string   NOT NULL,
    "photo_url" string   NULL,
    CONSTRAINT "pk_User" PRIMARY KEY (
        "user_id"
     )
);

-- Product table for handling products
CREATE TABLE "Product" (
    "product_id" int   NOT NULL,
    "title" string   NOT NULL,
    "amount" string NOT NULL,
    "currency" string NOT NULL,
    "user_id" int   NOT NULL,
    "description" string   NULL,    
    "created_date" string   NOT NULL,
    "link" string   NULL,
    "*idx" string   NOT NULL,
    CONSTRAINT "pk_Timer" PRIMARY KEY (
        "timer_id"
    )
);

-- Join table for many_to_many mappings
CREATE TABLE "TimerTag" (
    "timer_id" int   NOT NULL,
    "tag_id" int   NOT NULL,
    "created_date" string   NOT NULL
);


ALTER TABLE "Timer" ADD CONSTRAINT "fk_Timer_user_id" FOREIGN KEY("user_id")
REFERENCES "User" ("user_id");

ALTER TABLE "TimerTag" ADD CONSTRAINT "fk_TimerTag_timer_id" FOREIGN KEY("timer_id")
REFERENCES "Timer" ("timer_id");

ALTER TABLE "TimerTag" ADD CONSTRAINT "fk_TimerTag_tag_id" FOREIGN KEY("tag_id")
REFERENCES "Tag" ("tag_id");

ALTER TABLE "Credential" ADD CONSTRAINT "fk_Credential_user_id" FOREIGN KEY("user_id")
REFERENCES "User" ("user_id");

ALTER TABLE "Credential" ADD CONSTRAINT "fk_Credential_timer_id" FOREIGN KEY("timer_id")
REFERENCES "Timer" ("timer_id");

ALTER TABLE "CredentialTag" ADD CONSTRAINT "fk_CredentialTag_credential_id" FOREIGN KEY("credential_id")
REFERENCES "Credential" ("credential_id");

ALTER TABLE "CredentialTag" ADD CONSTRAINT "fk_CredentialTag_tag_id" FOREIGN KEY("tag_id")
REFERENCES "Tag" ("tag_id");

ALTER TABLE "Task" ADD CONSTRAINT "fk_Task_timer_id" FOREIGN KEY("timer_id")
REFERENCES "Timer" ("timer_id");

ALTER TABLE "Task" ADD CONSTRAINT "fk_Task_user_id" FOREIGN KEY("user_id")
REFERENCES "User" ("user_id");

ALTER TABLE "TaskTag" ADD CONSTRAINT "fk_TaskTag_task_id" FOREIGN KEY("task_id")
REFERENCES "Task" ("task_id");

ALTER TABLE "TaskTag" ADD CONSTRAINT "fk_TaskTag_tag_id" FOREIGN KEY("tag_id")
REFERENCES "Tag" ("tag_id");
