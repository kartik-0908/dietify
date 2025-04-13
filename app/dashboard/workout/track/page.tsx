'use client'

import { getAllWorkouts } from "@/app/actions/workout";
import BackButton from "@/components/backButton";
import { ChevronRight, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [workouts, setWorkouts] = useState<{
        name: string;
        id: number;
        duration: number;
        met: number;
        unit: string;
    }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllWorkouts();
            console.log(response);
            setWorkouts(response);
        }
        fetchData();
    }, []);


    const filteredItems = workouts.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div className={` flex flex-col items-start justify-start gap-4 py-10 bg-[#000000] text-white min-h-screen px-6`}>
            {/* Header */}
            <div className="flex items-center w-full mb-4">
                <BackButton route="/dashboard/workout" />
                <div className="flex-grow text-center">
                    <h1 className="text-xl font-bold">Track Workout</h1>
                </div>
                <div className="w-8"></div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-[#ADA4A5]" />
                </div>
                <input
                    type="text"
                    placeholder="Search workout..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#232545] rounded-xl py-3 pl-10 pr-10 text-white placeholder-[#ADA4A5] focus:outline-none focus:ring-2 focus:ring-[#95ADFE]"
                />
                {searchQuery && (
                    <button className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setSearchQuery('')}>
                        <X size={18} className="text-[#ADA4A5] hover:text-white" />
                    </button>
                )}
            </div>

            {/* Food Items List */}
            <div className="w-full space-y-4">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <div key={item.id} onClick={() => router.push(`/dashboard/workout/track/${item.id}`)} className="flex items-center justify-between bg-[#232545] rounded-2xl p-4">
                            <div className="flex items-center gap-4">
                                <div>
                                    <h3 className="font-medium text-white">{item.name}</h3>
                                </div>
                            </div>
                            <div>
                                <ChevronRight size={20} className="text-white" />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                        <p className="text-[#ADA4A5] text-lg mb-2">No workout found</p>
                        <p className="text-[#ADA4A5] text-sm">Try a different search term</p>
                    </div>
                )}
            </div>
        </div >
    );
}