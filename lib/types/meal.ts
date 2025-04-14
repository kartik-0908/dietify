export type Meal = {
    id: string;
    mealItemId: number;
    servingSize: string;
    Carbs: number;
    Fat: number;
    Protein: number;
    Calories: number;
    dietChartId: string;
    isConsumed: boolean;
    mealItem: {
        name: string;
        id: number;
        servingSize: string;
        Carbs: number;
        Fat: number;
        Protein: number;
        Calories: number;
    };
}

export type DietChart = {
    breakfastItems: Meal[],
    lunchItems: Meal[],
    dinnerItems: Meal[]
}
