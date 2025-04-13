import Link from "next/link";

const ParallelogramSection: React.FC = () => {
    return (
        <section className="relative w-full py-12 md:py-16 flex justify-center items-center font-[Outfit] px-4">
            <div className="relative pt-4 pb-4 w-full max-w-5xl md:h-[150px] bg-gradient-to-r from-[#FF4300] to-[#FF6400] transform -skew-x-12 flex flex-col md:flex-row items-center px-6 md:px-8 justify-between space-y-4 md:space-y-0">
                {/* Left Text Section */}
                <div className="text-white text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold skew-x-12 text-center md:text-left">
                    Ready to Feel Great in Your Clothes?
                    <p className="text-white text-sm sm:text-base md:text-lg font-medium mt-2">
                        Take the first step towards a healthier, more confident you. Personalized diet plans, no cravings sacrificed.
                    </p>
                </div>
                {/* Right Button Section Inside Parallelogram */}
                <button className="border-[1px] border-white text-white font-medium text-base sm:text-lg md:text-xl py-2 px-4 md:py-3 md:px-6 transform hover:bg-white hover:text-[#FF4601] transition-colors duration-300">
                    <Link href='/sign-in'>
                        <div className='skew-x-12'>
                            Start your Journey
                        </div>
                    </Link>
                </button>
            </div>
        </section>
    );
};

export default ParallelogramSection;