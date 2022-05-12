alter table "public"."post_tag" alter column "tag_id" drop not null;
alter table "public"."post_tag" add column "tag_id" int4;
