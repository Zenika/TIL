alter table "public"."post" alter column "id" set default nextval('post_id_seq'::regclass);
alter table "public"."post" alter column "id" drop not null;
alter table "public"."post" add column "id" int4;
