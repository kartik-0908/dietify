'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Card } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { WaterChart } from '@/components/charts/water-tracker';
import { addWaterIntake, getCurrentTargetWaterIntake, getWaterlogs, setWaterIntakeGoal } from '@/app/actions/water';
import { WaterIntakeLogs } from '@/lib/types/water';
import BackButton from '@/components/backButton';

export default function WaterTracker() {
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);
    const [currentWater, setCurrentWater] = useState('');
    const [dailyGoal, setDailyGoal] = useState(2000); // in ml
    const [waterData, setWaterData] = useState<WaterIntakeLogs[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getCurrentTargetWaterIntake()
            setDailyGoal(response)
            const res = await getWaterlogs()
            setWaterData(res)
        }
        fetchData()
    }, [])

    const addWaterEntry = async () => {
        if (currentWater) {
            const newEntry = {
                date: new Date(),
                amount: parseInt(currentWater)
            };
            setWaterData([newEntry, ...waterData]);
            setCurrentWater('');
            setIsDialogOpen(false);
            await addWaterIntake(parseInt(currentWater))
        }
    };

    const handleGoalChange = (goal: number) => {
        setDailyGoal(goal)
        setWaterIntakeGoal(goal)
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    return (
        <div className="flex flex-col items-start justify-start gap-2 py-10 bg-black text-white min-h-screen px-6 relative">
            {/* Header */}
            <div className="flex items-center w-full mb-4">
                <BackButton route='/dashboard/home' />
                <div className="flex-grow text-center">
                    <h1 className="text-xl font-bold">Water Tracker</h1>
                </div>
                <div className="w-8"></div>
            </div>

            <WaterChart />

            {/* Daily Goal */}
            <div className="w-full bg-[#232545] rounded-3xl p-4">
                <h2 className="text-lg font-semibold">Daily Goal: {dailyGoal} ml</h2>
                <Button variant="secondary" onClick={() => setIsGoalDialogOpen(true)}>Edit Goal</Button>
            </div>

            {/* Recent Updates */}
            <div className="w-full bg-[#232545] rounded-3xl p-4 h-screen mt-4">
                <h2 className="text-lg font-semibold">Recent Updates</h2>
                <div className="w-full space-y-2 mt-2">
                    {waterData.map((entry, index) => (
                        <Card key={index} className="bg-black text-white p-4 rounded-2xl flex justify-between">
                            <span>{formatDate(entry.date)}</span>
                            <span className="font-medium">{entry.amount} ml</span>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Floating Action Button */}
            <button
                onClick={() => setIsDialogOpen(true)}
                className="fixed bottom-6 right-6 p-4 rounded-full shadow-lg bg-gradient-to-r from-[#3877EC] to-[#A4DEEE] hover:opacity-80"
            >
                <Plus size={24} className="text-white" />
            </button>

            {/* Add Water Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className='max-w-[300px] rounded-lg bg-[#232545] p-4 shadow-lg text-white'>
                    <DialogHeader>
                        <DialogTitle>Log Water Intake</DialogTitle>
                    </DialogHeader>
                    <Input
                        type="number"
                        placeholder="Enter water intake (ml)"
                        value={currentWater}
                        onChange={(e) => setCurrentWater(e.target.value)}
                        className="w-full p-2 rounded-lg border border-gray-600"
                    />
                    <DialogFooter className='gap-2'>
                        <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button onClick={addWaterEntry}>Add</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Goal Dialog */}
            <Dialog open={isGoalDialogOpen} onOpenChange={setIsGoalDialogOpen}>
                <DialogContent className='max-w-[300px] rounded-lg bg-[#232545] p-4 shadow-lg text-white'>
                    <DialogHeader>
                        <DialogTitle>Set Daily Goal</DialogTitle>
                    </DialogHeader>
                    <Input
                        type="number"
                        placeholder="Enter daily goal (ml)"
                        value={dailyGoal}
                        onChange={(e) => handleGoalChange(parseInt(e.target.value))}
                        className="w-full p-2 rounded-lg border border-gray-600"
                    />
                    <DialogFooter className='gap-2'>
                        <Button variant="secondary" onClick={() => setIsGoalDialogOpen(false)}>Cancel</Button>
                        <Button onClick={() => setIsGoalDialogOpen(false)}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
