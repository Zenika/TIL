alter table "public"."comment"
  add constraint "comment_post_uuid_fkey"
  foreign key ("post_uuid")
  references "public"."post"
  ("uuid") on update restrict on delete restrict;
