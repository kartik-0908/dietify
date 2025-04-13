import { Chart as ChartJS, Title, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Required for displaying text inside the donut chart
import { Component } from './charts/radial-chart';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCurrentTargetWaterIntake, getTodayWaterIntake } from '@/app/actions/water';
import { getCurrentTargetCaloriesIntake, getTodayCaloriesIntake } from '@/app/actions/meal';

ChartJS.register(Title, ArcElement, Tooltip, Legend, ChartDataLabels);

const WaterIntakeTracker = () => {
    const router = useRouter()
    const [waterIntake, setWaterIntake] = useState<number>(0);
    const [waterIntakeTarget, setWaterIntakeTarget] = useState<number>(0);
    const [caloriesIntake, setCaloriesIntake] = useState<number>(0);
    const [caloriesIntakeTarget, setCaloriesIntakeTarget] = useState<number>(0);
    useEffect(() => {
        const fetchData = async () => {
            const response = await getCurrentTargetWaterIntake()
            const res = await getTodayWaterIntake()
            const response2 = await getCurrentTargetCaloriesIntake()
            const res2 = await getTodayCaloriesIntake()
            setWaterIntake(res)
            setWaterIntakeTarget(response)
            setCaloriesIntake(res2)
            setCaloriesIntakeTarget(response2)
        }
        fetchData()
    }, [])
    return (
        <div className="flex gap-4 w-full px-4 py-3 pl-0 pr-0 pt-0">
            {/* Water Intake Card */}
            <div onClick={() => router.push('/dashboard/water-intake')} className="flex flex-col items-start justify-start gap-4 w-1/2 px-4 py-3 bg-[#232545] rounded-3xl">
                <span className="text-sm font-medium text-white">Water Intake</span>

                {/* Circular Chart for Water Intake */}
                <div className="w-32 h-16">
                    <Component data={waterIntake} endAngle={(waterIntake*360)/waterIntakeTarget} text="ml"  />
                </div>
            </div>

            {/* Calorie Intake Card */}
            <div className="flex flex-col items-start justify-start gap-4 w-1/2 px-4 py-3 bg-[#232545] rounded-3xl">
                <span className="text-sm font-medium text-white">Calories Intake</span>

                {/* Circular Chart for Calorie Intake */}
                <div className="w-32 h-16">
                    <Component data={caloriesIntake} endAngle={(caloriesIntake*360)/caloriesIntakeTarget} text="cal"  />

                </div>
            </div>
        </div>
    );
};

export default WaterIntakeTracker;
