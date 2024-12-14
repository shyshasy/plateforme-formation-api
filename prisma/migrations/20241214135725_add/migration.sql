/*
  Warnings:

  - Added the required column `remainingAmount` to the `registrations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "registrations" ADD COLUMN     "remainingAmount" DECIMAL(10,2) NOT NULL;
