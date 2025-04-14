import { getCaloriesBurnt } from '@/app/actions/workout';
import BackButton from '@/components/backButton';
import { Button } from '@/components/ui/button';
import { currentUser } from '@clerk/nextjs/server';
import { Poppins } from 'next/font/google';
import Image from "next/image";
import Link from 'next/link';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins',
    display: 'swap'
})

export default async function Page() {
    const user = await currentUser()
    if (!user) {
        return <div>You are not logged in</div>
    }
    const caloriesBurnt = getCaloriesBurnt(user.id)
    return (
        <div className={`${poppins.variable} font-poppins flex flex-col items-start justify-start gap-4 py-10 bg-[#000000] text-white min-h-screen px-6`}>
            {/* Header */}
            <div className="flex items-center w-full mb-4">
                <BackButton route="/dashboard/home" />
                <div className="flex-grow text-center">
                    <h1 className="text-xl font-bold">Today</h1>
                </div>
                <div className="w-8"></div>
            </div>
            <div className="flex items-center justify-between bg-[#232545] rounded-2xl p-4 w-full">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#1F1F2B] rounded-xl flex items-center justify-center">
                        <Image src={"/workout.png"} width={40} height={40} alt={"alt"} className="rounded-lg" />
                    </div>
                    <div>
                        <h3 className="font-medium text-white">{caloriesBurnt}</h3>
                        <p className="text-sm text-[#ADA4A5]">Calories burnt</p>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center w-full pt-8'>
                <Image src={"/workout.png"} width={250} height={200} alt={"alt"} className="rounded-lg" />
            </div>
            <div className=' w-[100%] flex items-center justify-center pt-16'>
                <Link href={"/dashboard/workout/track"} className='w-[50%] bg-[#2667E8] text-white rounded-full flex items-center justify-center'>
                    <Button className=" bg-[#2667E8] text-white rounded-full hover:bg-none shadow-none">
                        Track Workout
                    </Button>
                </Link>

            </div>
        </div>
    );
}