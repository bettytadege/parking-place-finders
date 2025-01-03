/*
  Warnings:

  - You are about to drop the column `providerName` on the `ParkingProvider` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `ParkingProvider` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `ParkingProvider` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ParkingProvider_providerName_key";

-- AlterTable
ALTER TABLE "ParkingProvider" DROP COLUMN "providerName",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ParkingProvider_name_key" ON "ParkingProvider"("name");
