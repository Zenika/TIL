BEGIN TRANSACTION;
ALTER TABLE "public"."tag" DROP CONSTRAINT "tag_pkey";

ALTER TABLE "public"."tag"
    ADD CONSTRAINT "tag_pkey" PRIMARY KEY ("uuid");
COMMIT TRANSACTION;
