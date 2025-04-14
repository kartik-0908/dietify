/*
  Warnings:

  - The primary key for the `MealItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `MealItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `mealItemId` on the `BreakfastItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `mealItemId` on the `DinnerItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `mealItemId` on the `FavoriteMeal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `mealItemId` on the `LunchItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "BreakfastItem" DROP CONSTRAINT "BreakfastItem_mealItemId_fkey";

-- DropForeignKey
ALTER TABLE "DinnerItem" DROP CONSTRAINT "DinnerItem_mealItemId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteMeal" DROP CONSTRAINT "FavoriteMeal_mealItemId_fkey";

-- DropForeignKey
ALTER TABLE "LunchItem" DROP CONSTRAINT "LunchItem_mealItemId_fkey";

-- AlterTable
ALTER TABLE "BreakfastItem" DROP COLUMN "mealItemId",
ADD COLUMN     "mealItemId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "DinnerItem" DROP COLUMN "mealItemId",
ADD COLUMN     "mealItemId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "FavoriteMeal" DROP COLUMN "mealItemId",
ADD COLUMN     "mealItemId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LunchItem" DROP COLUMN "mealItemId",
ADD COLUMN     "mealItemId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MealItem" DROP CONSTRAINT "MealItem_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "MealItem_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "BreakfastItem_mealItemId_idx" ON "BreakfastItem"("mealItemId");

-- CreateIndex
CREATE INDEX "DinnerItem_mealItemId_idx" ON "DinnerItem"("mealItemId");

-- CreateIndex
CREATE INDEX "FavoriteMeal_mealItemId_idx" ON "FavoriteMeal"("mealItemId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteMeal_userId_mealItemId_key" ON "FavoriteMeal"("userId", "mealItemId");

-- CreateIndex
CREATE INDEX "LunchItem_mealItemId_idx" ON "LunchItem"("mealItemId");

-- AddForeignKey
ALTER TABLE "FavoriteMeal" ADD CONSTRAINT "FavoriteMeal_mealItemId_fkey" FOREIGN KEY ("mealItemId") REFERENCES "MealItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BreakfastItem" ADD CONSTRAINT "BreakfastItem_mealItemId_fkey" FOREIGN KEY ("mealItemId") REFERENCES "MealItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LunchItem" ADD CONSTRAINT "LunchItem_mealItemId_fkey" FOREIGN KEY ("mealItemId") REFERENCES "MealItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DinnerItem" ADD CONSTRAINT "DinnerItem_mealItemId_fkey" FOREIGN KEY ("mealItemId") REFERENCES "MealItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
