-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."post" add column "title" text
--  null;
ALTER TABLE "public"."post" DROP COLUMN "title";