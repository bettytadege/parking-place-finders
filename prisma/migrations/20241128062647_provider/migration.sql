/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `ParkingProvider` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ParkingProvider_email_key" ON "ParkingProvider"("email");
