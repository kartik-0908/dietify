import { getDietChartById, getAllMealItems } from "@/app/actions/meal";
import AddItemForm from "./additem";

interface Props {
    params: Promise<{ chart: string }>;
}

export default async function UserDietChartsPage({ params }: Props) {
    const { chart } = await params;
    const chartData = await getDietChartById(chart);
    const mealItems = await getAllMealItems();

    // Helper to render Add Item form for a meal type
   

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Breakfast Section */}
            <section className="p-4 border rounded shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Breakfast</h2>
                    <AddItemForm mealType="breakfast" chart={chart} mealItems={mealItems} />
                </div>
                <ul>
                    {chartData.breakfastItems.length === 0 && (
                        <li className="text-gray-500">No items</li>
                    )}
                    {chartData.breakfastItems.map((item: any) => (
                        <li key={item.id} className="mb-2">
                            {item.mealItem?.name || "Unnamed Item"}
                        </li>
                    ))}
                </ul>
            </section>

            {/* Lunch Section */}
            <section className="p-4 border rounded shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Lunch</h2>
                    <AddItemForm mealType="lunch" chart={chart} mealItems={mealItems} />
                </div>
                <ul>
                    {chartData.lunchItems.length === 0 && (
                        <li className="text-gray-500">No items</li>
                    )}
                    {chartData.lunchItems.map((item: any) => (
                        <li key={item.id} className="mb-2">
                            {item.mealItem?.name || "Unnamed Item"}
                        </li>
                    ))}
                </ul>
            </section>

            {/* Dinner Section */}
            <section className="p-4 border rounded shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Dinner</h2>
                    <AddItemForm mealType="dinner" chart={chart} mealItems={mealItems} />
                </div>
                <ul>
                    {chartData.dinnerItems.length === 0 && (
                        <li className="text-gray-500">No items</li>
                    )}
                    {chartData.dinnerItems.map((item: any) => (
                        <li key={item.id} className="mb-2">
                            {item.mealItem?.name || "Unnamed Item"}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}