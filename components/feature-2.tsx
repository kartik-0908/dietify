import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

const FeatureSection2: React.FC = () => {
    return (
        <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/bg-gradient.png"
                    alt="Feature Background"
                    className="w-full h-full object-cover opacity-100"
                />
            </div>

            <div className="container px-4 md:px-6 mx-auto max-w-5xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - iPhone Image */}
                    <div className="flex justify-center items-center relative">
                        <div className="w-48 sm:w-64 md:w-80 lg:w-96">
                            <Image
                                height={1500}
                                width={1500}
                                src="/feature-2.png"
                                alt="LookFit App Screen"
                                className="w-full rounded-3xl"
                            />
                        </div>
                    </div>

                    {/* Right Side - Text Content */}
                    <div className="space-y-6 text-center lg:text-left">
                        <h4 className="uppercase text-base md:text-lg text-gray-300">
                            100% Personalisation
                        </h4>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-white">
                            Your Plan, Your Progress!
                        </h1>

                        <p className="text-white text-sm sm:text-base">
                            No more one-size-fits-all diets. Get a plan designed for your goals,
                            your cravings, and your schedule.
                        </p>

                        {/* Center button in mobile view */}
                        <div className="flex justify-center lg:justify-start">
                            <Button className="w-full max-w-[250px] bg-white hover:bg-gray-300 text-[#FF4601] font-semibold font-[Helvetica]">
                                <Link href='/sign-in'>
                                    START YOUR JOURNEY NOW !!!
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeatureSection2;
