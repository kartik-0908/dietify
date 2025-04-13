'use server'
import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server";

export async function getAllWorkouts() {
    try {
        const res = await prisma.workout.findMany();
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        return [];

    }
}

export async function getWorkoutbyId(id: string) {
    try {
        return await prisma.workout.findUnique({
            where: {
                id: parseInt(id)
            }
        });
    } catch (error) {
        console.log(error);
        return null;

    }
}

export async function addWorkout(id: string, duration: number) {
    try {
        const user = await currentUser();
        if (!user) return;
        const userId = user.id;
        const workoutId = parseInt(id);
        const workout = await prisma.workout.findUnique({
            where: {
                id: workoutId
            }
        });
        if (!workout) return;
        const userDetails = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!userDetails || !userDetails.weight) return;

        if (workoutId === 1 || workoutId === 2 || workoutId === 4) {
            const caloriesBurned = ((workout?.met * userDetails?.weight * (duration) * 1.05));
            await prisma.workoutLog.create({
                data: {
                    userId: userId,
                    workoutId: parseInt(id),
                    duration: duration,
                    caloriesBurned: caloriesBurned,
                }
            })
            return {
                status: 'ok'
            }
        }
    } catch (error) {
        console.log(error)
        throw new Error('addition sucessfull')
    }
}

export async function getCaloriesBurnt(userId: string) {
    try {
        console.log('calculating total calories for', userId)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const workouts = await prisma.workoutLog.findMany({
            where: {
                userId: userId,
                date: {
                    gte: today
                }
            }
        })
        console.log(workouts)
        let caloriesBurnt = 0;
        workouts.forEach(workout => {
            caloriesBurnt += workout.caloriesBurned
        })
        return Math.round(caloriesBurnt)
    } catch (error) {
        console.log(error)
        return 0;
    }
}