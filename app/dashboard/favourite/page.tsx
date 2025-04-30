import { Poppins } from 'next/font/google';
import BackButton from '@/components/backButton';
import FavouriteMealSearchandShow from '@/components/favList';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins',
    display: 'swap'
})

export default function FavouriteMeals() {
    return (
        <div className={`${poppins.variable} font-poppins flex flex-col items-start justify-start gap-4 py-10 bg-[#070417] text-white min-h-screen px-6`}>
            {/* Header */}
            <div className="flex items-center w-full mb-4">
                <BackButton route='/dashboard/home' />
                <div className="flex-grow text-center">
                    <h1 className="text-xl font-bold">Favourite Meals</h1>
                </div>
                <div className="w-8"></div>
            </div>
            <FavouriteMealSearchandShow/>
        </div>
    );
}