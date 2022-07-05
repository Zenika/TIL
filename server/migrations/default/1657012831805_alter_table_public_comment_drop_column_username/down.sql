alter table "public"."comment" alter column "username" drop not null;
alter table "public"."comment" add column "username" text;
