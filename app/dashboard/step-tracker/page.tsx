'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Card } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { StepChart } from '@/components/charts/step-tracker';
import { formatDate } from '@/lib/date';
import { addStepLog, getStepLogs } from '@/app/actions/steps';

export default function StepTracker() {
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [stepCount, setStepCount] = useState('');
    const [stepData, setStepData] = useState<{ steps: number, date: Date }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getStepLogs()
            setStepData(response);
        }
        fetchData()
    }, [])

    const addStepEntry = async () => {
        if (stepCount) {
            const newEntry = {
                date: new Date(),
                steps: parseInt(stepCount)
            };
            setStepData([...stepData, newEntry]);
            setStepCount('');
            setIsDialogOpen(false);
            await addStepLog(parseInt(stepCount));
        }
    };

    return (
        <div className="flex flex-col items-start justify-start gap-2 py-10 bg-black text-white min-h-screen px-6 relative pl-0 pr-0">
            {/* Header */}
            <div className="flex items-center w-full mb-4">
                <button onClick={() => router.back()} className="mr-4 p-2 rounded-lg">
                    <ChevronLeft />
                </button>
                <div className="flex-grow text-center">
                    <h1 className="text-xl font-bold">Step Tracker</h1>
                </div>
                <div className="w-8"></div>
            </div>

            <StepChart />

            {/* Recent Updates */}
            <div className="w-full bg-[#232545] rounded-3xl p-4 h-screen">
                <h2 className="text-lg font-semibold">Recent Updates</h2>
                <div className="w-full space-y-2 mt-2">
                    {stepData.slice(-5).reverse().map((entry, index) => (
                        <Card key={index} className="bg-black text-white p-4 rounded-2xl flex justify-between">
                            <span>{formatDate(entry.date)}</span>
                            <span className="font-medium">{entry.steps} steps</span>
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

            {/* Dialog Box */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className='max-w-[300px] rounded-lg bg-[#232545] p-4 shadow-lg text-white'>
                    <DialogHeader>
                        <DialogTitle>Log Steps</DialogTitle>
                    </DialogHeader>
                    <Input
                        type="number"
                        placeholder="Enter your steps"
                        value={stepCount}
                        onChange={(e) => setStepCount(e.target.value)}
                        className="w-full p-2 rounded-lg border border-gray-600"
                    />
                    <DialogFooter className='gap-2'>
                        <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button onClick={addStepEntry}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}