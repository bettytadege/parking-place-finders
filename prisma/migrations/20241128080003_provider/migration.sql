/*
  Warnings:

  - A unique constraint covering the columns `[contactNumber]` on the table `ParkingProvider` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ParkingProvider_contactNumber_key" ON "ParkingProvider"("contactNumber");
