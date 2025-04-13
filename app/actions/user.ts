'use server'

import prisma from "@/lib/prisma"
import { getUserWeight } from "./weight"

export async function createProfile(userId: string, gender: string, dateOfBirth: Date, weight: number, height: number, goal: string, activityLevel: string, diseases: string[], dietPreference: string): Promise<{ success: boolean }> {
    try {
        console.log("creating profile for", userId)
        console.log(gender, dateOfBirth, weight, height, goal, activityLevel, diseases, dietPreference)
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                gender: gender,
                goal: goal,
                activityLevel: activityLevel,
                diseases: diseases,
                dietPreference: dietPreference,
                dateOfBirth: dateOfBirth,
                weight: weight, height: height,
                onboarded: true
            }
        })
        return {
            success: true
        }
    } catch (error) {
        console.log('error creating profile', error)
        return {
            success: false
        }

    }

}

export async function getUserBmi(userId: string): Promise<number> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        
        if (!user || user.height === null) {
            return 0; // Return 0 if user or required fields are missing
        }
        
        const height: number = user.height / 100; // Convert height from cm to meters
        const weight: number = await getUserWeight(userId);
        const bmi: number = weight / (height * height);
        
        return parseFloat(bmi.toFixed(1)); // Return BMI rounded to 1 decimal place
    } catch (error) {
        console.error("Error calculating BMI:", error);
        throw new Error("Failed to calculate BMI");
    }
}
