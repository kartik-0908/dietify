'use server'

import { getCurrentIndianDate } from "@/lib/date";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function getTodayWaterIntake(): Promise<number> {
    const user = await currentUser();
    if (!user) return 0;
    const userId = user.id;
    const today = getCurrentIndianDate();
    try {
        const waterlogs = await prisma.waterIntake.findMany({
            where: {
                userId: userId,
                date: {
                    gte: today
                }
            }
        })
        let waterIntake = 0;
        waterlogs.forEach(waterlog => {
            waterIntake += waterlog.amount;
        })
        return waterIntake;

    } catch (error) {
        console.error(`Error fetching water intake for user ${userId} on ${today}:`, error);
        return 0;
    }
}

export async function getCurrentTargetWaterIntake(): Promise<number> {
    const user = await currentUser();
    if (!user) return 0;
    const userId = user.id;
    try {
        const userDetails = await prisma.user.findUnique({
            where: {
                id: userId
            },
        })
        if (!userDetails) return 0;
        return userDetails.waterIntakeGoal;
    } catch (error) {
        console.error(`Error fetching current target water intake for user ${userId}:`, error);
        return 0;
    }
}

export async function setWaterIntakeGoal(goal: number) {
    const user = await currentUser();
    if (!user) return;
    const userDetails = await prisma.user.findUnique({
        where: {
            id: user.id
        },
    })
    if (!userDetails) return;
    const userId = user.id;
    try {
        console.log('setting water intake goal for user', userId, goal)
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                waterIntakeGoal: goal
            }
        })
        return {
            success: true
        }
    } catch (error) {
        console.error(`Error setting water intake goal for user ${userId}:`, error);
        return {
            success: false
        }
    }
}

export async function getWaterlogs() {
    const user = await currentUser();
    if (!user) return [];
    const userId = user.id;
    try {
        const waterlogs = await prisma.waterIntake.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                date: 'desc'
            },
            select: {
                date: true,
                amount: true
            }
        })
        console.log(waterlogs)
        return waterlogs;
    } catch (error) {
        console.error(`Error fetching water intake logs for user ${userId}:`, error);
        return [];
    }
}

export async function addWaterIntake(amount: number) {
    const user = await currentUser();
    if (!user) return;
    const userId = user.id;
    try {
        console.log('adding water intake for user', userId)
        const waterIntake = await prisma.waterIntake.create({
            data: {
                userId: userId,
                date: new Date(),
                amount: amount
            }
        })
        return waterIntake;
    } catch (error) {
        console.error(`Error adding water intake for user ${userId}:`, error);
        return;
    }
}

export async function getWaterDataforChart() {
    const user = await currentUser();
    if (!user) return [];
    const userId = user.id;
    try {
        const waterIntake = await prisma.waterIntake.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                date: 'desc'
            },
            select: {
                date: true,
                amount: true
            }
        });

        const dateMap = new Map();

        waterIntake.forEach(entry => {
            const dateObj = new Date(entry.date);
            const formattedDate = `${dateObj.getDate()} ${dateObj.toLocaleString('en-US', { month: 'short' })}`;

            if (dateMap.has(entry.date.toDateString())) {
                dateMap.set(entry.date.toDateString(), {
                    date: formattedDate,
                    amount: dateMap.get(entry.date.toDateString()).amount + entry.amount
                });
            } else {
                dateMap.set(entry.date.toDateString(), {
                    date: formattedDate,
                    amount: entry.amount
                });
            }
        });

        // Convert map values to array and sort by date ascending
        const result = Array.from(dateMap.values())
            //@ts-expect-error: types are not confirmed
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(-7); // last 7 days, in increasing order

        return result;
    } catch (error) {
        console.error(`Error fetching water intake logs for user ${userId}:`, error);
        return [];
    }
}
