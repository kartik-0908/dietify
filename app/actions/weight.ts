'use server'

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function addWeightLog(weight: number) {
    try {
        const user = await currentUser();
        if (!user) return;
        const userId = user.id;
        const weightLog = await prisma.weightLog.create({
            data: {
                userId: userId,
                weight: weight,
                date: new Date(),
            }
        })
        return weightLog;
    } catch (error) {
        console.log(error);
        return;
    }
}
export async function getWeightLogs() {
    try {
        const user = await currentUser();
        if (!user) return [];
        const userId = user.id;
        const weightLogs = await prisma.weightLog.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                date: 'desc'
            },
            select: {
                date: true,
                weight: true
            }
        })
        console.log(weightLogs)
        return weightLogs;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function getWeightlogsforChart() {
    try {
        const user = await currentUser();
        if (!user) return [];
        const userId = user.id;

        // Get the date 7 days ago
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const weightLogs = await prisma.weightLog.findMany({
            where: {
                userId: userId,
                date: {
                    gte: sevenDaysAgo // Greater than or equal to 7 days ago
                }
            },
            orderBy: {
                date: 'asc'
            },
            select: {
                date: true,
                weight: true
            }
        });

        // Group entries by date and keep only the highest weight for each day
        const dateMap = new Map();

        weightLogs.forEach(entry => {
            const dateString = entry.date.toDateString();
            const dateObj = new Date(entry.date);
            const formattedDate = `${dateObj.getDate()} ${dateObj.toLocaleString('en-US', { month: 'short' })}`;

            if (!dateMap.has(dateString) || entry.weight > dateMap.get(dateString).weight) {
                dateMap.set(dateString, {
                    date: formattedDate,
                    weight: entry.weight
                });
            }
        });
        const result = Array.from(dateMap.values());
        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function getUserWeight(userId: string): Promise<number> {
    try {

        const weightLog = await prisma.weightLog.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                date: 'desc'
            },
            take: 1,
            select: {
                weight: true
            }
        });

        if (weightLog.length > 0) {
            return weightLog[0].weight
        }
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user || user.weight === null) {
            return 0; // Return 0 if user or required fields are missing
        }

        return (user.weight);
    } catch (error) {
        console.error("Error calculating weight:", error);
        throw new Error("Failed to calculate weight");
    }
}