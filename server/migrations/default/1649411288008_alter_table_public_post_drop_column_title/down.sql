alter table "public"."post" alter column "title" drop not null;
alter table "public"."post" add column "title" varchar;
