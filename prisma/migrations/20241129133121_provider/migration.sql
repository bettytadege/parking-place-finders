/*
  Warnings:

  - A unique constraint covering the columns `[providerName]` on the table `ParkingProvider` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "startTime" SET DATA TYPE TEXT,
ALTER COLUMN "endTime" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ParkingProvider_providerName_key" ON "ParkingProvider"("providerName");
