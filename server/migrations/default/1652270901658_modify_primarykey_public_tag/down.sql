alter table "public"."tag" drop constraint "tag_pkey";
alter table "public"."tag"
    add constraint "tag_pkey"
    primary key ("id");
