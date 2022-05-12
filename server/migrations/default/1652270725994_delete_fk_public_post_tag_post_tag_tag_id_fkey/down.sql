alter table "public"."post_tag"
  add constraint "post_tag_tag_id_fkey"
  foreign key ("tag_id")
  references "public"."tag"
  ("id") on update restrict on delete restrict;
