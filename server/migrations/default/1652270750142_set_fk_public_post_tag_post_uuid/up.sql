alter table "public"."post_tag"
  add constraint "post_tag_post_uuid_fkey"
  foreign key ("post_uuid")
  references "public"."post"
  ("uuid") on update restrict on delete restrict;
