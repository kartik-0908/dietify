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
        const favoriteMealIds = userFavorites.map((fav: { mealItemId: string; }) => fav.mealItemId);
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



export async function toggleFavoriteItem(mealItemId: string) {
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

export async function removeMealFromFavorites(userId: string, mealItemId: string) {
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