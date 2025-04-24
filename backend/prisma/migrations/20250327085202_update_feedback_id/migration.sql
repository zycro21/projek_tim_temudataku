-- AlterTable
CREATE SEQUENCE feedback_id_seq;
ALTER TABLE "feedback" ALTER COLUMN "id" SET DEFAULT nextval('feedback_id_seq');
ALTER SEQUENCE feedback_id_seq OWNED BY "feedback"."id";
