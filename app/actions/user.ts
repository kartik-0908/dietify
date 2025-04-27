'use server'

import prisma from "@/lib/prisma"
import { getUserWeight } from "./weight"
import { currentUser } from "@clerk/nextjs/server";

export async function getUserDetails() : Promise<{
    firstName: string;
    lastName: string;
    email: string;
    gender: string ;
    dateOfBirth: Date;
    weight: number ;
    height: number ;
} | null> {
    const clerkUser = await currentUser()
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: clerkUser?.id
            }
        });
        if (!user) return null;
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            gender: user.gender || '',
            dateOfBirth: (user.dateOfBirth) || new Date(),
            weight: user.weight || 0,
            height: user.height || 0
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

interface UpdateUserProfileFormData {
    firstName: string;
    lastName: string;
    gender: string;         // or a literal union, e.g. 'male'|'female'|'other'
    dateOfBirth: string;    // e.g. 'YYYY-MM-DD'; you can parse it into a Date if needed
    weight: number;
    height: number;
}


export async function updateUserProfile(formData: UpdateUserProfileFormData) {
    const user = await currentUser();
    if (!user) return;
    const userId = user.id;
    console.log(formData);
    try {
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                gender: formData.gender,
                dateOfBirth: formData.dateOfBirth,
                weight: formData.weight,
                height: formData.height,
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
                isOnboarded: true
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
