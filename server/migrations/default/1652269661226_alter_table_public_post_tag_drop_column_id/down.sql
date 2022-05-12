alter table "public"."post_tag" alter column "id" set default nextval('post_tag_id_seq'::regclass);
alter table "public"."post_tag" alter column "id" drop not null;
alter table "public"."post_tag" add column "id" int4;
