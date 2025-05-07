import { getAllDietChartsForUser } from "@/app/actions/meal";
import { getUserNameAndEmail } from "@/app/actions/user";
import CreateDietChartButton from "./createDietButton";
import Link from "next/link";

interface Props {
    params: Promise<{ id: string }>;
}

interface DietChart {
    id: string;
    day: number;
    month: number;
    year: number;
    // Add other fields if needed
}

interface User {
    name: string;
    email: string;
}

export default async function UserDietChartsPage({ params }: Props) {
    const { id } = await params;
    const charts: DietChart[] = await getAllDietChartsForUser(id);
    const user: User | null = await getUserNameAndEmail(id);

    if (!charts || charts.length === 0) {
        return (
            <div className="max-w-2xl mx-auto py-10 px-4">
                {user && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold">{user.name}</h2>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                )}
                <CreateDietChartButton userId={id} />
                <h1 className="text-2xl font-bold mb-4">No Diet Charts Found</h1>
                <p>This user does not have any diet charts yet.</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            {user && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>
                </div>
            )}
            <CreateDietChartButton userId={id} />

            <h1 className="text-3xl font-bold mb-8 text-center">Diet Charts</h1>
            <ul className="space-y-6">
                {charts.map((chart) => (
                    <li key={chart.id} className="border rounded-lg p-4 shadow hover:bg-gray-50 transition">
                        <Link href={`/admin/user/${id}/${chart.id}`}>
                            <div className="font-semibold mb-2 cursor-pointer">
                                {chart.day}/{chart.month}/{chart.year}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}