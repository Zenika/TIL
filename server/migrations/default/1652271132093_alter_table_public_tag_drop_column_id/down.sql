alter table "public"."tag" alter column "id" set default nextval('tag_id_seq'::regclass);
alter table "public"."tag" alter column "id" drop not null;
alter table "public"."tag" add column "id" int4;
