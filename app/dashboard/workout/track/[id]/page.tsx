import { getWorkoutbyId } from "@/app/actions/workout";
import WorkoutInput from "@/components/workoutInput";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const workout = await getWorkoutbyId(id);
    return (
        <div className="flex flex-col items-start justify-start gap-4 py-10 bg-[#000000] text-white min-h-screen px-6">
            <div className="flex items-center w-full mb-4">
                <Link href={"/dashboard/workout/track"} className="mr-4 p-2 rounded-lg">
                    <ChevronLeft />
                </Link>
                <div className="flex-grow text-center">
                    <h1 className="text-xl font-bold">{workout?.name}</h1>
                </div>

                <div className="w-8"></div>
            </div>
            <div className="flex items-center justify-between  rounded-2xl w-full">
                <Image src={`/workouts/${id}.jpeg`} width={400} height={40} alt={"alt"} className="rounded-lg" />
            </div>
            <div className="w-full">
                <WorkoutInput unit={workout?.unit || "hours"} name={workout?.name || ""} id={id} />
            </div>

        </div>
    );
}