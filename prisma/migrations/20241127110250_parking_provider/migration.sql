/*
  Warnings:

  - Added the required column `adminId` to the `ParkingProvider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNumber` to the `ParkingProvider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `ParkingProvider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParkingProvider" ADD COLUMN     "adminId" INTEGER NOT NULL,
ADD COLUMN     "contactNumber" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ParkingProvider" ADD CONSTRAINT "ParkingProvider_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
