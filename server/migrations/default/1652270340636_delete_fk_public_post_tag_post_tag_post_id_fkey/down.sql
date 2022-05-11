alter table "public"."post_tag"
  add constraint "post_tag_post_id_fkey"
  foreign key ("post_id")
  references "public"."post"
  ("id") on update restrict on delete restrict;
