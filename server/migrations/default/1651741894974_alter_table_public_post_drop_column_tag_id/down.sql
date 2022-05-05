alter table "public"."post" alter column "tag_id" drop not null;
alter table "public"."post" add column "tag_id" int4;
