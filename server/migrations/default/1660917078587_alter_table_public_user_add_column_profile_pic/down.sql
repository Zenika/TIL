-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."user" add column "profile_pic" text
--  null;
ALTER TABLE "public"."user" DROP COLUMN "profile_pic";