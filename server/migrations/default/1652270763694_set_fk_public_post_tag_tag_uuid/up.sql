alter table "public"."post_tag"
  add constraint "post_tag_tag_uuid_fkey"
  foreign key ("tag_uuid")
  references "public"."tag"
  ("uuid") on update restrict on delete restrict;
