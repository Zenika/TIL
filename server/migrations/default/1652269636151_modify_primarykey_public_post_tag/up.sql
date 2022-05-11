BEGIN TRANSACTION;
ALTER TABLE "public"."post_tag" DROP CONSTRAINT "post_tag_pkey";

ALTER TABLE "public"."post_tag"
    ADD CONSTRAINT "post_tag_pkey" PRIMARY KEY ("uuid");
COMMIT TRANSACTION;
