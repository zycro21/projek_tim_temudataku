-- AlterTable
ALTER TABLE "users" ADD COLUMN     "verification_token" TEXT,
ADD COLUMN     "verification_token_expires" TIMESTAMP(3);
