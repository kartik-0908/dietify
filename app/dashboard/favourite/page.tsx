'use client'
import { useEffect, useState } from 'react';
import { ChevronLeft, Search, X, Plus, Minus } from 'lucide-react';
import { Poppins } from 'next/font/google';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { getUserFavoriteMeals, toggleFavoriteItem } from '@/app/actions/meal';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins',
    display: 'swap'
})

interface FoodItem {
    id: string;
    name: string;
    Calories: number;
    Protein: number;
    Carbs: number;
    Fat: number;
    isFavorite: boolean;
    servingSize: string;
}

export default function FavouriteMeals() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

    useEffect(() => {
        const fetchFoodItems = async () => {
            const response = await getUserFavoriteMeals()
            setFoodItems(response);
        };
        fetchFoodItems();
    }, []);

    const toggleFavorite = async (id: string) => {
        setFoodItems(foodItems.map(item =>
            item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
        ));
        await toggleFavoriteItem(id)

    };

    const filteredItems = foodItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={`${poppins.variable} font-poppins flex flex-col items-start justify-start gap-4 py-10 bg-[#070417] text-white min-h-screen px-6`}>
            {/* Header */}
            <div className="flex items-center w-full mb-4">
                <button onClick={() => router.back()} className="mr-4 p-2 rounded-lg">
                    <ChevronLeft />
                </button>
                <div className="flex-grow text-center">
                    <h1 className="text-xl font-bold">Favourite Meals</h1>
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
                    placeholder="Search meals..."
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
                        <div key={item.id} className="flex items-center justify-between bg-[#232545] rounded-2xl p-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-[#1F1F2B] rounded-xl flex items-center justify-center">
                                    <Image src={`/meals/${item.id}.jpeg`} width={64} height={64} alt={item.name} className="rounded-lg" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-white">{item.name}</h3>
                                    <p className="text-sm text-[#ADA4A5]">{item.Calories} cal | P: {item.Protein} | C: {item.Carbs} | F: {item.Fat}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleFavorite(item.id)}
                                className="p-2 rounded-full bg-[#1F1F2B] flex items-center justify-center"
                            >
                                {item.isFavorite ? (
                                    <Minus size={20} className="text-red-500" />
                                ) : (
                                    <Plus size={20} className="text-green-500" />
                                )}
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                        <p className="text-[#ADA4A5] text-lg mb-2">No meals found</p>
                        <p className="text-[#ADA4A5] text-sm">Try a different search term</p>
                    </div>
                )}
            </div>
        </div>
    );
}