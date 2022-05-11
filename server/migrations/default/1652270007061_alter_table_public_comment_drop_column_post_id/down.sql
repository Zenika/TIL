alter table "public"."comment" alter column "post_id" drop not null;
alter table "public"."comment" add column "post_id" int4;
