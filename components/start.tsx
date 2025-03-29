import React from 'react';

const ParallelogramSection: React.FC = () => {
    return (
        <section className="relative w-full py-16 flex justify-center items-center font-[Outfit]">
            <div className="relative w-[90%] max-w-5xl h-[150px] bg-gradient-to-r from-[#FF4300] to-[#FF6400] transform -skew-x-12 flex items-center px-8 justify-between">
                {/* Left Text Section */}
                <div className="text-white pr-4 text-xl md:text-4xl font-bold skew-x-12">
                    Ready to Feel Great in Your Clothes?
                    <p className="text-white text-lg md:text-lg font-medium mt-2">
                        Take the first step towards a healthier, more confident you. Personalized diet plans, no cravings sacrificed.
                    </p>
                </div>
                {/* Right Button Section Inside Parallelogram */}
                <button className="border-[1px] border-white text-white font-medium text-lg md:text-xl py-3 px-6 transform hover:bg-white hover:text-[#FF4601] transition-colors duration-300">
                    <div className='skew-x-12'>
                        Start your Journey
                    </div>
                </button>
            </div>
        </section>
    );
};

export default ParallelogramSection;
