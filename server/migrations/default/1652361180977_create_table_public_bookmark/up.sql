CREATE TABLE "public"."bookmark" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "user_id" text NOT NULL, "post_uuid" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("post_uuid") REFERENCES "public"."post"("uuid") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"), UNIQUE ("user_id", "post_uuid"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;