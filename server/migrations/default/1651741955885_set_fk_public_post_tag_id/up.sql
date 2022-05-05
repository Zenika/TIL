alter table "public"."post"
  add constraint "post_tag_id_fkey"
  foreign key ("tag_id")
  references "public"."tag"
  ("id") on update restrict on delete restrict;
