alter table "public"."bookmark" add column "created_at" timestamptz
 not null default now();
