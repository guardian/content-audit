/*
  Warnings:

  - Made the column `url` on table `audit_page_run` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "RunStatus" AS ENUM ('IN_FLIGHT', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "audit_page_run" ADD COLUMN     "error" TEXT,
ADD COLUMN     "status" "RunStatus" NOT NULL DEFAULT 'IN_FLIGHT',
ALTER COLUMN "url" SET NOT NULL;
