"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from '@/hooks/use-toast';
import { createDietChartForUser } from "@/app/actions/meal";


export default function CreateDietChartButton({ userId }: { userId: string }) {
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = await createDietChartForUser(userId, parseInt(day), parseInt(month), parseInt(year));

        toast({
            title: data.message,
            description: data.success
                ? "Diet chart created successfully."
                : "Failed to create diet chart.",
        })
        setLoading(false);
        if (data.success) {
            setDay("");
            setMonth("");
            setYear("");
            router.refresh();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
            <div className="flex gap-2">
                <input
                    type="number"
                    placeholder="Day"
                    value={day}
                    onChange={e => setDay(e.target.value)}
                    min={1}
                    max={31}
                    required
                    className="border rounded px-2 py-1"
                />
                <input
                    type="number"
                    placeholder="Month"
                    value={month}
                    onChange={e => setMonth(e.target.value)}
                    min={1}
                    max={12}
                    required
                    className="border rounded px-2 py-1"
                />
                <input
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    min={2000}
                    max={2100}
                    required
                    className="border rounded px-2 py-1"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {loading ? "Creating..." : "Create Diet Chart"}
            </button>
        </form>
    );
}