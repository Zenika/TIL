CREATE EXTENSION IF NOT EXISTS pgcrypto;
alter table "public"."post" add column "uuid" uuid
 not null unique default gen_random_uuid();
