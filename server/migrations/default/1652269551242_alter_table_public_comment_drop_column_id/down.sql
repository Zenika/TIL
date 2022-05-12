alter table "public"."comment" alter column "id" set default nextval('comment_id_seq'::regclass);
alter table "public"."comment" alter column "id" drop not null;
alter table "public"."comment" add column "id" int4;
