/*
  Warnings:

  - You are about to drop the column `calories` on the `MealItem` table. All the data in the column will be lost.
  - You are about to drop the column `carbs` on the `MealItem` table. All the data in the column will be lost.
  - You are about to drop the column `fats` on the `MealItem` table. All the data in the column will be lost.
  - You are about to drop the column `mealId` on the `MealItem` table. All the data in the column will be lost.
  - You are about to drop the column `protein` on the `MealItem` table. All the data in the column will be lost.
  - You are about to drop the `Meal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PersonalInfo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,day,month,year]` on the table `DietChart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `day` to the `DietChart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `DietChart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `DietChart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Calories` to the `MealItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Carbs` to the `MealItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Fat` to the `MealItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Image` to the `MealItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Protein` to the `MealItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servingSize` to the `MealItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DietChart" DROP CONSTRAINT "DietChart_userId_fkey";

-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_dietChartId_fkey";

-- DropForeignKey
ALTER TABLE "MealItem" DROP CONSTRAINT "MealItem_mealId_fkey";

-- DropForeignKey
ALTER TABLE "PersonalInfo" DROP CONSTRAINT "PersonalInfo_userId_fkey";

-- DropIndex
DROP INDEX "DietChart_userId_key";

-- AlterTable
ALTER TABLE "DietChart" ADD COLUMN     "day" INTEGER NOT NULL,
ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MealItem" DROP COLUMN "calories",
DROP COLUMN "carbs",
DROP COLUMN "fats",
DROP COLUMN "mealId",
DROP COLUMN "protein",
ADD COLUMN     "Calories" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Carbs" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Fat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Image" TEXT NOT NULL,
ADD COLUMN     "Protein" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "servingSize" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activityLevel" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "dietPreference" TEXT,
ADD COLUMN     "diseases" TEXT[],
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "goal" TEXT,
ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "onboarded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "waterIntakeGoal" INTEGER NOT NULL DEFAULT 2000,
ADD COLUMN     "weight" DOUBLE PRECISION,
ALTER COLUMN "phoneNumber" DROP NOT NULL;

-- DropTable
DROP TABLE "Meal";

-- DropTable
DROP TABLE "PersonalInfo";

-- DropEnum
DROP TYPE "MealType";

-- CreateTable
CREATE TABLE "WeightLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,

    CONSTRAINT "WeightLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StepLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "steps" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StepLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteMeal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mealItemId" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteMeal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "met" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" DOUBLE PRECISION,
    "caloriesBurned" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "WorkoutLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaterIntake" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "WaterIntake_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BreakfastItem" (
    "id" TEXT NOT NULL,
    "dietChartId" TEXT NOT NULL,
    "mealItemId" TEXT NOT NULL,
    "servingSize" TEXT NOT NULL,
    "Carbs" DOUBLE PRECISION NOT NULL,
    "Fat" DOUBLE PRECISION NOT NULL,
    "Protein" DOUBLE PRECISION NOT NULL,
    "Calories" DOUBLE PRECISION NOT NULL,
    "isConsumed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BreakfastItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LunchItem" (
    "id" TEXT NOT NULL,
    "dietChartId" TEXT NOT NULL,
    "mealItemId" TEXT NOT NULL,
    "servingSize" TEXT NOT NULL,
    "Carbs" DOUBLE PRECISION NOT NULL,
    "Fat" DOUBLE PRECISION NOT NULL,
    "Protein" DOUBLE PRECISION NOT NULL,
    "Calories" DOUBLE PRECISION NOT NULL,
    "isConsumed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "LunchItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DinnerItem" (
    "id" TEXT NOT NULL,
    "dietChartId" TEXT NOT NULL,
    "mealItemId" TEXT NOT NULL,
    "servingSize" TEXT NOT NULL,
    "Carbs" DOUBLE PRECISION NOT NULL,
    "Fat" DOUBLE PRECISION NOT NULL,
    "Protein" DOUBLE PRECISION NOT NULL,
    "Calories" DOUBLE PRECISION NOT NULL,
    "isConsumed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DinnerItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WeightLog_userId_idx" ON "WeightLog"("userId");

-- CreateIndex
CREATE INDEX "WeightLog_date_idx" ON "WeightLog"("date");

-- CreateIndex
CREATE INDEX "StepLog_userId_idx" ON "StepLog"("userId");

-- CreateIndex
CREATE INDEX "StepLog_date_idx" ON "StepLog"("date");

-- CreateIndex
CREATE INDEX "FavoriteMeal_userId_idx" ON "FavoriteMeal"("userId");

-- CreateIndex
CREATE INDEX "FavoriteMeal_mealItemId_idx" ON "FavoriteMeal"("mealItemId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteMeal_userId_mealItemId_key" ON "FavoriteMeal"("userId", "mealItemId");

-- CreateIndex
CREATE INDEX "WorkoutLog_userId_idx" ON "WorkoutLog"("userId");

-- CreateIndex
CREATE INDEX "WorkoutLog_workoutId_idx" ON "WorkoutLog"("workoutId");

-- CreateIndex
CREATE INDEX "WaterIntake_userId_idx" ON "WaterIntake"("userId");

-- CreateIndex
CREATE INDEX "WaterIntake_date_idx" ON "WaterIntake"("date");

-- CreateIndex
CREATE INDEX "BreakfastItem_dietChartId_idx" ON "BreakfastItem"("dietChartId");

-- CreateIndex
CREATE INDEX "BreakfastItem_mealItemId_idx" ON "BreakfastItem"("mealItemId");

-- CreateIndex
CREATE INDEX "LunchItem_dietChartId_idx" ON "LunchItem"("dietChartId");

-- CreateIndex
CREATE INDEX "LunchItem_mealItemId_idx" ON "LunchItem"("mealItemId");

-- CreateIndex
CREATE INDEX "DinnerItem_dietChartId_idx" ON "DinnerItem"("dietChartId");

-- CreateIndex
CREATE INDEX "DinnerItem_mealItemId_idx" ON "DinnerItem"("mealItemId");

-- CreateIndex
CREATE INDEX "DietChart_userId_idx" ON "DietChart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DietChart_userId_day_month_year_key" ON "DietChart"("userId", "day", "month", "year");

-- AddForeignKey
ALTER TABLE "WeightLog" ADD CONSTRAINT "WeightLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepLog" ADD CONSTRAINT "StepLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteMeal" ADD CONSTRAINT "FavoriteMeal_mealItemId_fkey" FOREIGN KEY ("mealItemId") REFERENCES "MealItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteMeal" ADD CONSTRAINT "FavoriteMeal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutLog" ADD CONSTRAINT "WorkoutLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutLog" ADD CONSTRAINT "WorkoutLog_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaterIntake" ADD CONSTRAINT "WaterIntake_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietChart" ADD CONSTRAINT "DietChart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BreakfastItem" ADD CONSTRAINT "BreakfastItem_dietChartId_fkey" FOREIGN KEY ("dietChartId") REFERENCES "DietChart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BreakfastItem" ADD CONSTRAINT "BreakfastItem_mealItemId_fkey" FOREIGN KEY ("mealItemId") REFERENCES "MealItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LunchItem" ADD CONSTRAINT "LunchItem_dietChartId_fkey" FOREIGN KEY ("dietChartId") REFERENCES "DietChart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LunchItem" ADD CONSTRAINT "LunchItem_mealItemId_fkey" FOREIGN KEY ("mealItemId") REFERENCES "MealItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DinnerItem" ADD CONSTRAINT "DinnerItem_dietChartId_fkey" FOREIGN KEY ("dietChartId") REFERENCES "DietChart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DinnerItem" ADD CONSTRAINT "DinnerItem_mealItemId_fkey" FOREIGN KEY ("mealItemId") REFERENCES "MealItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
