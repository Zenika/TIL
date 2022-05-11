CREATE EXTENSION IF NOT EXISTS pgcrypto;
alter table "public"."comment" add column "uuid" uuid
 not null unique default gen_random_uuid();
