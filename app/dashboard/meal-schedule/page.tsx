'use client'
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight} from 'lucide-react';
import { Poppins } from 'next/font/google';
import Image from "next/image";
import { getDietChart } from '@/app/actions/meal';
import { DietChart, Meal } from '@/lib/types/meal';
import BackButton from '@/components/backButton';
import Consume from '@/components/consume';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins',
    display: 'swap'
})


export default function MealSchedule() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [diet, setDiet] = useState<DietChart>({
        breakfastItems: [],
        lunchItems: [],
        dinnerItems: []
    })

    useEffect(() => {
        const fetchDiet = async () => {
            console.log(`selected Date ${selectedDate}`)
            const response = await getDietChart(selectedDate.getDate(), selectedMonth + 1, selectedYear)
            setDiet(response)
        }
        fetchDiet()
    }, [selectedDate]);

    // Generate array of dates for the date picker
    const getDates = () => {
        const dates = [];
        const currentDate = new Date(selectedYear, selectedMonth, selectedDate.getDate());

        // Add 3 dates before current date
        for (let i = 3; i > 0; i--) {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() - i);
            dates.push(date);
        }

        // Add the current date
        dates.push(currentDate);

        // Add 3 dates after current date
        for (let i = 1; i <= 3; i++) {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() + i);
            dates.push(date);
        }

        return dates;
    };

    const formatDay = (date: Date) => {
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };

    const formatDate = (date: Date) => {
        return date.getDate();
    };

    const isCurrentDate = (date: Date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    const isSelectedDate = (date: Date) => {
        return date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear();
    };

    const handlePrevMonth = () => {
        if (selectedMonth === 0) {
            setSelectedMonth(11);
            setSelectedYear(selectedYear - 1);
        } else {
            setSelectedMonth(selectedMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (selectedMonth === 11) {
            setSelectedMonth(0);
            setSelectedYear(selectedYear + 1);
        } else {
            setSelectedMonth(selectedMonth + 1);
        }
    };

    const MealSection = ({ title, meals }: { title: string, meals: Meal[] }) => {
        // Calculate total calories by summing up calories from all meal items
        const totalCalories = meals.reduce((sum, meal) => sum + (meal.Calories || 0), 0);

        return (
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    {meals.length > 0 && (
                        <span className="text-[#ADA4A5] text-sm">{meals.length} meals | {totalCalories} calories</span>
                    )}
                </div>
                {meals.length > 0 ? (
                    <div className="space-y-3">
                        {meals.map((meal, index) => (
                            <div key={index} className="flex items-center justify-between rounded-2xl p-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-16 h-16 bg-[#1F1F2B] rounded-xl flex items-center justify-center">
                                        <Image src={`/meals/${meal.id}.jpeg`} width={40} height={40} alt={meal.mealItem.name} className="rounded-lg" />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <h4 className="text-white font-medium">{meal.mealItem.name}</h4>
                                        <span className="text-[#ADA4A5] text-sm">{`P: ${meal.Protein} g, C: ${meal.Calories} cal, F: ${meal.Fat} g`}</span>
                                        <span className="text-[#ADA4A5] text-sm">{`Serving size: ${meal.servingSize}`}</span>
                                    </div>
                                </div>
                                {/* <div className="h-8 w-8 rounded-lg flex items-center justify-center">
                                   {meal.isConsumed ? <MinusCircle className='text-red-300' size={20} /> : <PlusCircle className='text-[#008000]' size={20} />}
                                </div> */}
                                <Consume id={meal.id} isConsumed={meal.isConsumed} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-[#ADA4A5] text-center py-4">
                        Diet chart will be available soon
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={`${poppins.variable} font-poppins flex flex-col items-start justify-start gap-4 py-10 bg-[#070417] text-white min-h-screen px-6`}>
            {/* Header with back button */}
            <div className="flex items-center w-full mb-4">
                <BackButton route='/dashboard/home' />
                <div className="flex-grow text-center">
                    <h1 className="text-xl font-bold">Meal Schedule</h1>
                </div>
            </div>

            {/* Month and Year Selector */}
            <div className="flex items-center justify-between w-full bg-[#232545] rounded-2xl p-3 mb-4">
                <button onClick={handlePrevMonth} className="text-white p-2">
                    <ChevronLeft size={20} />
                </button>
                <h2 className="text-lg font-medium">
                    {new Date(selectedYear, selectedMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <button onClick={handleNextMonth} className="text-white p-2">
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Date cards */}
            <div className="flex gap-2 overflow-x-auto w-full pb-2 mb-6">
                {getDates().map((date, index) => (
                    <div
                        key={index}
                        className={`flex flex-col items-center min-w-12 p-2 rounded-xl cursor-pointer ${isSelectedDate(date)
                            ? 'bg-gradient-to-b from-[#2567E8] to-[#1849D6] text-white'
                            : 'bg-[#232545] text-[#ADA4A5]'
                            }`}
                        onClick={() => setSelectedDate(date)}
                    >
                        <span className="text-xs font-medium">{formatDay(date)}</span>
                        <span className={`text-xl font-bold ${isCurrentDate(date) && !isSelectedDate(date) ? 'text-[#95ADFE]' : ''}`}>
                            {formatDate(date)}
                        </span>
                    </div>
                ))}
            </div>

            {/* Meals for the day */}
            <div className="w-full overflow-y-auto pb-20">
                <MealSection title="Breakfast" meals={diet.breakfastItems} />
                <MealSection title="Lunch" meals={diet.lunchItems} />
                <MealSection title="Dinner" meals={diet.dinnerItems} />
            </div>
        </div>
    );
}