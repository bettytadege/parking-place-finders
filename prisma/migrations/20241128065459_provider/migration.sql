/*
  Warnings:

  - A unique constraint covering the columns `[adminId]` on the table `ParkingProvider` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ParkingProvider_adminId_key" ON "ParkingProvider"("adminId");
