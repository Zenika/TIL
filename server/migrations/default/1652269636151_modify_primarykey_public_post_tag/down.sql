alter table "public"."post_tag" drop constraint "post_tag_pkey";
alter table "public"."post_tag"
    add constraint "post_tag_pkey"
    primary key ("id");
