'use server'
import prisma from "@/lib/prisma";
import { DietChart } from "@/lib/types/meal";
import { currentUser } from "@clerk/nextjs/server";

export async function getUserFavoriteMeals() {
    try {
        const user = await currentUser();
        if (!user) return []
        const userId = user.id
        const allMeals = await prisma.mealItem.findMany();
        console.log('finding favorite meals for user', userId)
        const userFavorites = await prisma.favoriteMeal.findMany({
            where: {
                userId: userId,
            },
            select: {
                mealItemId: true,
            },
        });
        const favoriteMealIds = userFavorites.map((fav: { mealItemId: number; }) => fav.mealItemId);
        const result = allMeals.map((meal) => ({
            ...meal,
            isFavorite: favoriteMealIds.includes(meal.id),
        }));
        console.log(result);
        return result;
    } catch (error) {
        console.error(`Error fetching favorite meals`, error);
        throw error;
    }
}



export async function toggleFavoriteItem(mealItemId: number) {
    try {
        const user = await currentUser();
        if (!user) return;
        const userId = user.id;
        const favorite = await prisma.favoriteMeal.findUnique({
            where: {
                userId_mealItemId: {
                    userId,
                    mealItemId,
                },
            },
        });
        if (!favorite) {
            const newFavorite = await prisma.favoriteMeal.create({
                data: {
                    userId,
                    mealItemId,
                },
                include: {
                    mealItem: true,
                },
            });
            return newFavorite;
        } else {
            const deletedFavorite = await prisma.favoriteMeal.delete({
                where: {
                    userId_mealItemId: {
                        userId,
                        mealItemId,
                    },
                },
            });
            return deletedFavorite;
        }
    } catch (error) {
        console.error(`Error adding meal ${mealItemId} to favorites`, error);
        throw error;
    }
}

export async function removeMealFromFavorites(userId: string, mealItemId: number) {
    try {
        const favorite = await prisma.favoriteMeal.delete({
            where: {
                userId_mealItemId: {
                    userId,
                    mealItemId,
                },
            },
        });
        return favorite;
    } catch (error) {
        console.error(`Error removing meal ${mealItemId} from favorites for user ${userId}:`, error);
        throw error;
    }
}

export async function getDietChart(day: number, month: number, year: number): Promise<DietChart> {
    try {
        const user = await currentUser();
        if (!user) return {
            breakfastItems: [],
            lunchItems: [],
            dinnerItems: []
        };
        const userId = user.id;
        console.log(`finding diet chart for user ${userId} of ${day}/${month}/${year}`)
        const dietChart = await prisma.dietChart.findUnique({
            where: {
                userId_day_month_year: {
                    userId: userId,
                    day: day,
                    month: month,
                    year: year,
                },
            },
            include: {
                breakfastItems: {
                    include: {
                        mealItem: true
                    }
                },
                lunchItems: {
                    include: {
                        mealItem: true
                    }
                },
                dinnerItems: {
                    include: {
                        mealItem: true
                    }
                },
            }
        });
        if (!dietChart) {
            return {
                breakfastItems: [],
                lunchItems: [],
                dinnerItems: []
            };
        }
        return dietChart
    } catch (error) {
        console.error(`Error fetching diet chart for user on ${day}/${month}/${year}:`, error);
        return {
            breakfastItems: [],
            lunchItems: [],
            dinnerItems: [],
        }
    }
}
export async function updatemealconsumption(id: string, isConsumed: boolean) {
    try {
        const meal = await prisma.breakfastItem.findUnique({
            where: {
                id: id
            }
        })
        if (meal) {
            await prisma.breakfastItem.update({
                where: {
                    id: id
                },
                data: {
                    isConsumed: isConsumed
                }
            })
            return;
        }
        const lunch = await prisma.lunchItem.findUnique({
            where: {
                id: id
            }
        })
        if (lunch) {
            await prisma.lunchItem.update({
                where: {
                    id: id
                },
                data: {
                    isConsumed: isConsumed
                }
            })
            return;
        }
        const dinner = await prisma.dinnerItem.findUnique({
            where: {
                id: id
            }
        })
        if (dinner) {
            await prisma.dinnerItem.update({
                where: {
                    id: id
                },
                data: {
                    isConsumed: isConsumed
                }
            })
            return;
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getCurrentTargetCaloriesIntake() {
    const user = await currentUser()
    if (!user) return 0
    const userId = user.id
    try {
        const data = await prisma.dietChart.findUnique({
            where: {
                userId_day_month_year: {
                    userId: userId,
                    day: new Date().getDate(),
                    month: new Date().getMonth() + 1,
                    year: new Date().getFullYear()
                }
            },
            include: {
                breakfastItems: true,
                lunchItems: true,
                dinnerItems: true
            }
        })
        if (!data) return 0
        let calories = 0
        data.breakfastItems.forEach(item => {
            calories += item.Calories
        })
        data.lunchItems.forEach(item => {
            calories += item.Calories
        })
        data.dinnerItems.forEach(item => {
            calories += item.Calories
        })
        console.log("today's target ", calories)
        return calories
    } catch (error) {
        console.error('Error getting current target calories intake:', error)
        return 0
    }
}

export async function getTodayCaloriesIntake() {
    const user = await currentUser()
    if (!user) return 0
    const userId = user.id
    try {
        const data = await prisma.dietChart.findUnique({
            where: {
                userId_day_month_year: {
                    userId: userId,
                    day: new Date().getDate(),
                    month: new Date().getMonth() + 1,
                    year: new Date().getFullYear()
                }
            },
            include: {
                breakfastItems: true,
                lunchItems: true,
                dinnerItems: true
            }
        })
        if (!data) return 0
        let calories = 0
        data.breakfastItems.forEach(item => {
            if (item.isConsumed) calories += item.Calories
        })
        data.lunchItems.forEach(item => {
            if (item.isConsumed) calories += item.Calories
        })
        data.dinnerItems.forEach(item => {
            if (item.isConsumed) calories += item.Calories
        })
        console.log("today's intake ", calories)
        return calories
    } catch (error) {
        console.error('Error getting current target calories intake:', error)
        return 0
    }
}

export async function getAllDietChartsForUser(userId: string) {
    try {
        const dietCharts = await prisma.dietChart.findMany({
            where: { userId },
            orderBy: {
                createdAt: 'desc',
            },
        });
        console.log(dietCharts)
        return dietCharts;
    } catch (error) {
        console.error(`Error fetching all diet charts for user ${userId}:`, error);
        return [];
    }
}

export async function createDietChartForUser(
    userId: string,
    day: number,
    month: number,
    year: number
): Promise<{ success: boolean; message: string }> {
    try {
        const existingChart = await prisma.dietChart.findUnique({
            where: {
                userId_day_month_year: {
                    userId,
                    day,
                    month,
                    year,
                },
            },
        });

        if (existingChart) {
            return {
                success: false,
                message: `Diet chart for ${day}/${month}/${year} already exists for this user.`,
            };
        }

        await prisma.dietChart.create({
            data: {
                userId,
                day,
                month,
                year,
            },
        });

        return {
            success: true,
            message: "Diet chart created successfully.",
        };
    } catch (error) {
        console.error(`Error creating diet chart for user ${userId}:`, error);
        return {
            success: false,
            message: "Failed to create diet chart.",
        };
    }
}

// Define types matching your Prisma models
export type BreakfastItem = {
    id: string;
    dietChartId: string;
    mealItemId: number;
    servingSize: string;
    Carbs: number;
    Fat: number;
    Protein: number;
    Calories: number;
    isConsumed: boolean;
    mealItem: {
        // Add relevant MealItem fields here, or import MealItem type if available
        id: number;
        name: string;
        // ...other fields...
    };
};

export type LunchItem = {
    id: string;
    dietChartId: string;
    mealItemId: number;
    servingSize: string;
    Carbs: number;
    Fat: number;
    Protein: number;
    Calories: number;
    isConsumed: boolean;
    mealItem: {
        id: number;
        name: string;
        // ...other fields...
    };
};

export type DinnerItem = {
    id: string;
    dietChartId: string;
    mealItemId: number;
    servingSize: string;
    Carbs: number;
    Fat: number;
    Protein: number;
    Calories: number;
    isConsumed: boolean;
    mealItem: {
        id: number;
        name: string;
        // ...other fields...
    };
};

export async function getDietChartById(chartId: string): Promise<{
    breakfastItems: BreakfastItem[],
    lunchItems: LunchItem[],
    dinnerItems: DinnerItem[]
}> {
    try {
        const dietChart = await prisma.dietChart.findUnique({
            where: { id: chartId },
            include: {
                breakfastItems: { include: { mealItem: true } },
                lunchItems: { include: { mealItem: true } },
                dinnerItems: { include: { mealItem: true } },
            },
        });

        if (!dietChart) {
            return {
                breakfastItems: [],
                lunchItems: [],
                dinnerItems: [],
            };
        }

        return {
            breakfastItems: dietChart.breakfastItems as BreakfastItem[],
            lunchItems: dietChart.lunchItems as LunchItem[],
            dinnerItems: dietChart.dinnerItems as DinnerItem[],
        };
    } catch (error) {
        console.error(`Error fetching diet chart by id ${chartId}:`, error);
        return {
            breakfastItems: [],
            lunchItems: [],
            dinnerItems: [],
        };
    }
}

export async function getAllMealItems() {
    try {
        const mealItems = await prisma.mealItem.findMany();
        console.log(mealItems)
        return mealItems;
    } catch (error) {
        console.error("Error fetching all meal items:", error);
        return [];
    }
}

// Add a meal item to a diet chart for a specific meal type
type AddItemResult =
    | { success: true; message: string; item: BreakfastItem | LunchItem | DinnerItem }
    | { success: false; message: string };

export async function addItemToDietChart(
    chartId: string,
    mealType: "breakfast" | "lunch" | "dinner",
    mealItemId: number,
    servingSize: string,
    unit: number
): Promise<AddItemResult> {
    try {
        const mealItem = await prisma.mealItem.findUnique({
            where: { id: mealItemId },
        });
        if (!mealItem) {
            return {
                success: false,
                message: "Meal item not found.",
            };
        }

        const itemData = {
            dietChartId: chartId,
            mealItemId,
            servingSize: servingSize,
            Carbs: mealItem.Carbs * unit,
            Fat: mealItem.Fat * unit,
            Protein: mealItem.Protein * unit,
            Calories: mealItem.Calories * unit,
        };

        let createdItem: BreakfastItem | LunchItem | DinnerItem;
        if (mealType === "breakfast") {
            createdItem = await prisma.breakfastItem.create({
                data: itemData,
                include: { mealItem: true },
            }) as BreakfastItem;
        } else if (mealType === "lunch") {
            createdItem = await prisma.lunchItem.create({
                data: itemData,
                include: { mealItem: true },
            }) as LunchItem;
        } else if (mealType === "dinner") {
            createdItem = await prisma.dinnerItem.create({
                data: itemData,
                include: { mealItem: true },
            }) as DinnerItem;
        } else {
            return {
                success: false,
                message: "Invalid meal type.",
            };
        }

        return {
            success: true,
            message: `Item added to ${mealType} successfully.`,
            item: createdItem,
        };
    } catch (error) {
        console.error(`Error adding item to ${mealType} for chart ${chartId}:`, error);
        return {
            success: false,
            message: "Failed to add item to diet chart.",
        };
    }
}

// Delete a meal item from a diet chart for a specific meal type
export async function deleteItemFromDietChart(
    mealType: "breakfast" | "lunch" | "dinner",
    itemId: string
) {
    try {
        if (mealType === "breakfast") {
            return await prisma.breakfastItem.delete({
                where: { id: itemId },
            });
        } else if (mealType === "lunch") {
            return await prisma.lunchItem.delete({
                where: { id: itemId },
            });
        } else if (mealType === "dinner") {
            return await prisma.dinnerItem.delete({
                where: { id: itemId },
            });
        }
    } catch (error) {
        console.error(`Error deleting item from ${mealType}:`, error);
        throw error;
    }
}

