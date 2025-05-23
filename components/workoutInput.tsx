'use client'

import { useState } from "react";
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { addWorkout } from "@/app/actions/workout";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function WorkoutInput({ unit, name, id }: { unit: string, name: string, id: string }) {
    const router = useRouter()
    const [duration, setDuration] = useState<number>(0.0);
    const [numberOfSets, setNumberOfSets] = useState<number>(0.0);
    const [count, setCount] = useState<number>(0.0);

    const handleAddWorkout = async () => {
        try {

            const res = await addWorkout(id, unit, duration, numberOfSets, count)
            console.log(res);
            toast({
                title: "Workout added successfully",
                description: "Workout added successfully",
                duration: 3000,
            })
            router.push('/dashboard/workout/track')
        } catch (error) {
            console.log(error);
            toast({
                title: "Error adding workout",
                description: "Error adding workout",
                duration: 3000,
            })
        }
    };

    return (
        <div className="w-full flex flex-col items-center gap-2">
            {unit === "hours" ? (
                <div className="w-full flex flex-col gap-2">
                    <label>{name} Duration</label>
                    <div className="w-full bg-[#232545] flex items-center rounded-sm p-2 pr-4 text-white">
                        <Input
                            className=" bg-[#232545] rounded-sm text-white focus:outline-none"
                            onChange={(e) => setDuration(parseFloat(e.target.value))}
                            placeholder="1.5" type="number" min={1} max={100} step={1} defaultValue={0.0} />
                        <div>hours</div>
                    </div>

                </div>
            ) :
                unit === 'min' ? (
                    <div className="w-full flex flex-col gap-2">
                        <label>{name} Duration</label>
                        <div className="w-full bg-[#232545] flex items-center rounded-sm p-2 pr-4 text-white">
                            <Input
                                className=" bg-[#232545] rounded-sm text-white focus:outline-none"
                                onChange={(e) => setDuration(parseFloat(e.target.value))}
                                placeholder="10" type="number" min={1} max={100} step={1} defaultValue={0.0} />
                            <div>minutes</div>
                        </div>
                    </div>
                ) :

                    unit === 'set' ? (
                        <div className="w-full flex flex-col gap-2">
                            <label>{name} no. of sets</label>
                            <div className="w-full bg-[#232545] flex items-center rounded-sm p-2 pr-4 text-white">
                                <Input
                                    className=" bg-[#232545] rounded-sm text-white focus:outline-none"
                                    onChange={(e) => setNumberOfSets(parseFloat(e.target.value))}
                                    placeholder="10" type="number" min={1} max={100} step={1} defaultValue={0.0} />
                                <div>sets</div>
                            </div>
                        </div>
                    ) :
                        unit === 'count' ? (
                            <div className="w-full flex flex-col gap-2">
                                <label>{name} Count</label>
                                <div className="w-full bg-[#232545] flex items-center rounded-sm p-2 pr-4 text-white">
                                    <Input
                                        className=" bg-[#232545] rounded-sm text-white focus:outline-none"
                                        onChange={(e) => setCount(parseFloat(e.target.value))}
                                        placeholder="10" type="number" min={1} max={100} step={1} defaultValue={0.0} />
                                    <div>no.</div>
                                </div>
                            </div>
                        )
                            :
                            <Input placeholder="Enter workout duration in minutes" type="number" min={1} max={100} step={1} defaultValue={0} />
            }
            <div className="w-full flex justify-center gap-2 mt-8">
                <Button onClick={handleAddWorkout} className="bg-[#1D61E7] text-white rounded-md px-4 py-2">
                    Add Workout
                </Button>
            </div>

        </div>
    )
}