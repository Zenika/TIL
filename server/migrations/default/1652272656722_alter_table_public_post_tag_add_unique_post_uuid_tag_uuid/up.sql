alter table "public"."post_tag" add constraint "post_tag_post_uuid_tag_uuid_key" unique ("post_uuid", "tag_uuid");
