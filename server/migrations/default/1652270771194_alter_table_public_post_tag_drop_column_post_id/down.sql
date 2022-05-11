alter table "public"."post_tag" alter column "post_id" drop not null;
alter table "public"."post_tag" add column "post_id" int4;
