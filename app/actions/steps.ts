'use server'

import { getCurrentIndianDate } from "@/lib/date";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function addStepLog(steps: number) {
    try {
        const user = await currentUser();
        if (!user) return;
        const userId = user.id;
        const weightLog = await prisma.stepLog.create({
            data: {
                userId: userId,
                steps: steps,
                date: new Date(),
            }
        })
        return weightLog;
    } catch (error) {
        console.log(error);
        return;
    }
}
export async function getStepLogs() {
    try {
        const user = await currentUser();
        if (!user) return [];
        const userId = user.id;
        const stepsLogs = await prisma.stepLog.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                date: 'desc'
            },
            select: {
                date: true,
                steps: true
            }
        })
        return stepsLogs;
    } catch (error) {
        console.log(error);
        return [];
    }
}


export async function getStepsDataforChart() {
    const user = await currentUser();
    if (!user) return [];
    const userId = user.id;
    try {
        const waterIntake = await prisma.stepLog.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                date: 'desc'
            },
            select: {
                date: true,
                steps: true
            }
        });

        const dateMap = new Map();

        waterIntake.forEach(entry => {
            const dateObj = new Date(entry.date);
            const formattedDate = `${dateObj.getDate()} ${dateObj.toLocaleString('en-US', { month: 'short' })}`;

            if (dateMap.has(entry.date.toDateString())) {
                dateMap.set(entry.date.toDateString(), {
                    date: formattedDate,
                    steps: dateMap.get(entry.date.toDateString()).steps + entry.steps
                });
            } else {
                dateMap.set(entry.date.toDateString(), {
                    date: formattedDate,
                    steps: entry.steps
                });
            }
        });

        // Convert map values to array and sort by date ascending
        const result = Array.from(dateMap.values())
            //@ts-ignore
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(-7); // last 7 days, in increasing order

        return result;
    } catch (error) {
        console.error(`Error fetching water intake logs for user ${userId}:`, error);
        return [];
    }
}

export async function getTodaySteps(): Promise<number> {
    const user = await currentUser();
    if (!user) return 0;
    const userId = user.id;
    const today = getCurrentIndianDate();
    try {
        const steplogs = await prisma.stepLog.findMany({
            where: {
                userId: userId,
                date: {
                    gte: today
                }
            }
        })
        let steps = 0;
        steplogs.forEach(waterlog => {
            steps += waterlog.steps
        })
        return steps;

    } catch (error) {
        console.error(`Error fetching water intake logs for user ${userId}:`, error);
        return 0;
    }
}