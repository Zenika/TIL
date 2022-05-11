alter table "public"."comment"
  add constraint "comment_post_id_fkey"
  foreign key ("post_id")
  references "public"."post"
  ("id") on update restrict on delete restrict;
