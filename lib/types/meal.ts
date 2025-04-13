export type Meal = {
    id: string;
    mealItemId: string;
    servingSize: string;
    Carbs: number;
    Fat: number;
    Protein: number;
    Calories: number;
    dietChartId: string;
    isConsumed: boolean;
    mealItem: {
        name: string;
        id: string;
        servingSize: string;
        Carbs: number;
        Fat: number;
        Protein: number;
        Calories: number;
        Image: string;
    };
}

export type DietChart = {
    breakfastItems: Meal[],
    lunchItems: Meal[],
    dinnerItems: Meal[]
}
