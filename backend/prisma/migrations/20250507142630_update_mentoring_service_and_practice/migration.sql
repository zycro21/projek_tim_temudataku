/*
  Warnings:

  - You are about to drop the column `duitku_payment_token` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `duitku_payment_url` on the `payments` table. All the data in the column will be lost.

*/
-- AlterTable
CREATE SEQUENCE bookings_id_seq;
ALTER TABLE "bookings" ALTER COLUMN "id" SET DEFAULT nextval('bookings_id_seq');
ALTER SEQUENCE bookings_id_seq OWNED BY "bookings"."id";

-- AlterTable
CREATE SEQUENCE certificates_id_seq;
ALTER TABLE "certificates" ALTER COLUMN "id" SET DEFAULT nextval('certificates_id_seq');
ALTER SEQUENCE certificates_id_seq OWNED BY "certificates"."id";

-- AlterTable
CREATE SEQUENCE commission_payments_id_seq;
ALTER TABLE "commission_payments" ALTER COLUMN "id" SET DEFAULT nextval('commission_payments_id_seq');
ALTER SEQUENCE commission_payments_id_seq OWNED BY "commission_payments"."id";

-- AlterTable
CREATE SEQUENCE feedback_id_seq;
ALTER TABLE "feedback" ALTER COLUMN "id" SET DEFAULT nextval('feedback_id_seq');
ALTER SEQUENCE feedback_id_seq OWNED BY "feedback"."id";

-- AlterTable
CREATE SEQUENCE mentor_profiles_id_seq;
ALTER TABLE "mentor_profiles" ALTER COLUMN "id" SET DEFAULT nextval('mentor_profiles_id_seq');
ALTER SEQUENCE mentor_profiles_id_seq OWNED BY "mentor_profiles"."id";

-- AlterTable
CREATE SEQUENCE mentoring_services_id_seq;
ALTER TABLE "mentoring_services" ADD COLUMN     "alumni_portfolio" TEXT,
ADD COLUMN     "benefits" TEXT,
ADD COLUMN     "mechanism" TEXT,
ADD COLUMN     "schedule" TEXT,
ADD COLUMN     "syllabus_path" TEXT,
ADD COLUMN     "target_audience" TEXT,
ADD COLUMN     "tools_used" TEXT,
ALTER COLUMN "id" SET DEFAULT nextval('mentoring_services_id_seq');
ALTER SEQUENCE mentoring_services_id_seq OWNED BY "mentoring_services"."id";

-- AlterTable
CREATE SEQUENCE mentoring_sessions_id_seq;
ALTER TABLE "mentoring_sessions" ALTER COLUMN "id" SET DEFAULT nextval('mentoring_sessions_id_seq');
ALTER SEQUENCE mentoring_sessions_id_seq OWNED BY "mentoring_sessions"."id";

-- AlterTable
CREATE SEQUENCE notifications_id_seq;
ALTER TABLE "notifications" ALTER COLUMN "id" SET DEFAULT nextval('notifications_id_seq');
ALTER SEQUENCE notifications_id_seq OWNED BY "notifications"."id";

-- AlterTable
CREATE SEQUENCE payments_id_seq;
ALTER TABLE "payments" DROP COLUMN "duitku_payment_token",
DROP COLUMN "duitku_payment_url",
ALTER COLUMN "id" SET DEFAULT nextval('payments_id_seq');
ALTER SEQUENCE payments_id_seq OWNED BY "payments"."id";

-- AlterTable
CREATE SEQUENCE practice_files_id_seq;
ALTER TABLE "practice_files" ALTER COLUMN "id" SET DEFAULT nextval('practice_files_id_seq');
ALTER SEQUENCE practice_files_id_seq OWNED BY "practice_files"."id";

-- AlterTable
CREATE SEQUENCE practice_materials_id_seq;
ALTER TABLE "practice_materials" ALTER COLUMN "id" SET DEFAULT nextval('practice_materials_id_seq');
ALTER SEQUENCE practice_materials_id_seq OWNED BY "practice_materials"."id";

-- AlterTable
CREATE SEQUENCE practice_progress_id_seq;
ALTER TABLE "practice_progress" ALTER COLUMN "id" SET DEFAULT nextval('practice_progress_id_seq');
ALTER SEQUENCE practice_progress_id_seq OWNED BY "practice_progress"."id";

-- AlterTable
CREATE SEQUENCE practice_purchases_id_seq;
ALTER TABLE "practice_purchases" ALTER COLUMN "id" SET DEFAULT nextval('practice_purchases_id_seq');
ALTER SEQUENCE practice_purchases_id_seq OWNED BY "practice_purchases"."id";

-- AlterTable
CREATE SEQUENCE practice_reviews_id_seq;
ALTER TABLE "practice_reviews" ALTER COLUMN "id" SET DEFAULT nextval('practice_reviews_id_seq');
ALTER SEQUENCE practice_reviews_id_seq OWNED BY "practice_reviews"."id";

-- AlterTable
CREATE SEQUENCE practices_id_seq;
ALTER TABLE "practices" ADD COLUMN     "benefits" TEXT,
ADD COLUMN     "challenges" TEXT,
ADD COLUMN     "estimated_duration" TEXT,
ADD COLUMN     "expected_outcomes" TEXT,
ADD COLUMN     "target_audience" TEXT,
ADD COLUMN     "tools_used" TEXT,
ALTER COLUMN "id" SET DEFAULT nextval('practices_id_seq');
ALTER SEQUENCE practices_id_seq OWNED BY "practices"."id";

-- AlterTable
CREATE SEQUENCE projects_id_seq;
ALTER TABLE "projects" ALTER COLUMN "id" SET DEFAULT nextval('projects_id_seq');
ALTER SEQUENCE projects_id_seq OWNED BY "projects"."id";

-- AlterTable
CREATE SEQUENCE referral_codes_id_seq;
ALTER TABLE "referral_codes" ALTER COLUMN "id" SET DEFAULT nextval('referral_codes_id_seq');
ALTER SEQUENCE referral_codes_id_seq OWNED BY "referral_codes"."id";

-- AlterTable
CREATE SEQUENCE referral_commissions_id_seq;
ALTER TABLE "referral_commissions" ALTER COLUMN "id" SET DEFAULT nextval('referral_commissions_id_seq');
ALTER SEQUENCE referral_commissions_id_seq OWNED BY "referral_commissions"."id";

-- AlterTable
CREATE SEQUENCE referral_usages_id_seq;
ALTER TABLE "referral_usages" ALTER COLUMN "id" SET DEFAULT nextval('referral_usages_id_seq');
ALTER SEQUENCE referral_usages_id_seq OWNED BY "referral_usages"."id";

-- AlterTable
CREATE SEQUENCE roles_id_seq;
ALTER TABLE "roles" ALTER COLUMN "id" SET DEFAULT nextval('roles_id_seq');
ALTER SEQUENCE roles_id_seq OWNED BY "roles"."id";

-- AlterTable
CREATE SEQUENCE user_behavior_id_seq;
ALTER TABLE "user_behavior" ALTER COLUMN "id" SET DEFAULT nextval('user_behavior_id_seq');
ALTER SEQUENCE user_behavior_id_seq OWNED BY "user_behavior"."id";

-- AlterTable
CREATE SEQUENCE user_roles_id_seq;
ALTER TABLE "user_roles" ALTER COLUMN "id" SET DEFAULT nextval('user_roles_id_seq');
ALTER SEQUENCE user_roles_id_seq OWNED BY "user_roles"."id";

-- AlterTable
CREATE SEQUENCE users_id_seq;
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT nextval('users_id_seq');
ALTER SEQUENCE users_id_seq OWNED BY "users"."id";
