import CircleWithArc from "@/components/charts/pie";
import WaterIntakeTracker from "@/components/tracker";
import { currentUser } from "@clerk/nextjs/server";
import { FootprintsIcon, ForkKnifeCrossed, LucideWeight, User, WeightIcon } from "lucide-react";
import { Poppins } from 'next/font/google'
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const poppins = Poppins({
    subsets: ['latin'], // Or other subsets as needed
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // Or specific weights
    variable: '--font-poppins', // CSS variable name
    display: 'swap' // Recommended for performance
})

export default async function Home({ bmi, weight, steps }: { bmi: number, weight: number, steps: number }) {
    const user = await currentUser();  // Clerk hook to get the authenticated user

    return (
        <div className={`${poppins.variable} font-poppins flex flex-col items-start justify-start gap-4 py-20 bg-[#070417] text-white min-h-screen px-10`}>
            <div className="flex items-center gap-6 w-full">
                {/* Profile image */}
                <img
                    src={user?.imageUrl || "/default-profile.png"}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex flex-col items-start">
                    <h1 className="text-lg font-medium text-[#ADA4A5]">Welcome Back</h1>
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold">{user ? user.firstName : "User"}</h2>
                        <h2 className="text-2xl font-bold">{user ? user.lastName : "User"}</h2>
                    </div>
                </div>
            </div>
            <Link href={'/dashboard/meal-schedule'} className="w-full">
                <div className="flex items-center justify-start gap-4 mt-8 w-full px-4 py-3 bg-[#232545] rounded-3xl">
                    <div className="flex items-center justify-center shadow-none pl-2">
                        <Image
                            height={64}
                            width={64}
                            src="/food.svg"
                            alt="Track food"
                            className="w-16 h-16 justify-center items-center shadow-none border-none"
                        />
                    </div>
                    <span className="text-lg font-medium pl-8 text-white">Track Food</span>
                </div>
            </Link>

            <div className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-[#232545] to-[#070517] rounded-3xl shadow-lg drop-shadow-[0_5px_8px_#95ADFE]">
                {/* Left Container: BMI Text & Message */}
                <div className="flex flex-col items-start text-white">
                    <span className="text-lg font-medium">BMI (Body Mass Index)</span>
                    {bmi < 18.5 && <p className="text-sm">You are underweight.</p>}
                    {bmi >= 18.5 && bmi < 24.9 && <p className="text-sm">You have a normal weight.</p>}
                    {bmi >= 25 && bmi < 29.9 && <p className="text-sm">You are overweight.</p>}
                    {bmi >= 30 && <p className="text-sm">You are obese.</p>}

                </div>

                {/* Right Container: Circular BMI Indicator */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                    {/* White Circle Background */}
                    <CircleWithArc bmi={bmi} />
                </div>
            </div>
            <div className="font-semibold text-lg">
                Activity Status
            </div>
            <WaterIntakeTracker />
            <Link href={'/dashboard/workout'} className="w-full">
                <div className="flex items-center justify-between gap-4 w-full px-4 py-3 bg-[#232545] rounded-3xl">
                    <div className="flex items-center gap-4">
                        <WeightIcon className="text-[#4B89EC]" />
                        <span className="text-lg font-medium text-white">Track Workout</span>
                    </div>
                    <span className="text-white text-xl">{'>'}</span>
                </div>
            </Link>
            <Link href={'/dashboard/favourite'} className="w-full">
                <div className="flex items-center justify-between gap-4 w-full px-4 py-3 bg-[#232545] rounded-3xl">
                    <div className="flex items-center gap-4">
                        <ForkKnifeCrossed className="text-[#4B89EC]" />
                        <span className="text-lg font-medium text-white">Favourites Meal</span>
                    </div>
                    <span className="text-white text-xl">{'>'}</span>
                </div>
            </Link>
            <div className="flex gap-4 w-full">
                {/* Footsteps Card */}
                <Link href={'/dashboard/step-tracker'} className="w-full">
                    <div className="flex items-center gap-3 bg-[#232545] px-4 py-3 rounded-2xl h-full">
                        <FootprintsIcon className="text-white text-3xl" />
                        <span className="text-white text-sm font-medium">{steps}  Foot Steps</span>
                    </div>
                </Link>
                {/* Weight Card */}
                <Link href={'/dashboard/weight-tracker'} className="w-full">
                    <div className="flex items-center gap-3 bg-[#232545] px-4 py-3 rounded-2xl h-full">
                        <LucideWeight className="text-white text-2xl" />
                        <div className="flex flex-col">
                            <span className="text-white font-medium">{weight} kg</span>
                            <span className="text-white text-sm font-medium opacity-75">Weight Track</span>
                        </div>
                    </div>
                </Link>


            </div>
            <Link href={'/dashboard/profile'} className="w-full">
                <div className="flex items-center justify-between gap-4 w-full px-4 py-3 bg-[#232545] rounded-3xl">
                    <div className="flex items-center gap-4">
                        <User className="text-[#4B89EC]" />
                        <span className="text-lg font-medium text-white">User Profile</span>
                    </div>
                    <span className="text-white text-xl">{'>'}</span>
                </div>
            </Link>
        </div>
    );
}
