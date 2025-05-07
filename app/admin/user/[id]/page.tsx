import { getAllDietChartsForUser } from "@/app/actions/meal";
import { getUserNameAndEmail } from "@/app/actions/user";
import CreateDietChartButton from "./createDietButton";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-10">
                <div>
                    {user && (
                        <>
                            <h2 className="text-3xl font-bold tracking-tight">{user.name}</h2>
                            <p className="text-muted-foreground text-base">{user.email}</p>
                        </>
                    )}
                </div>
                <CreateDietChartButton userId={id} />
            </div>

            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Diet Charts</CardTitle>
                </CardHeader>
                <CardContent>
                    {(!charts || charts.length === 0) ? (
                        <div className="text-center py-16">
                            <h3 className="text-lg font-semibold mb-2">No Diet Charts Found</h3>
                            <p className="text-muted-foreground mb-6">
                                This user does not have any diet charts yet.
                            </p>
                            <CreateDietChartButton userId={id} />
                        </div>
                    ) : (
                        <ul className="grid gap-8 sm:grid-cols-2">
                            {charts.map((chart) => (
                                <li key={chart.id}>
                                    <Link href={`/admin/user/${id}/${chart.id}`}>
                                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                                            <CardContent className="p-8 flex flex-col items-center">
                                                <span className="text-lg font-semibold mb-2">
                                                    {chart.day}/{chart.month}/{chart.year}
                                                </span>
                                                <Button variant="link" className="mt-2">
                                                    View Details
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}