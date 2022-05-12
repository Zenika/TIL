alter table "public"."post" drop constraint "post_pkey";
alter table "public"."post"
    add constraint "post_pkey"
    primary key ("id");
