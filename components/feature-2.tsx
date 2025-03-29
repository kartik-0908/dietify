import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';

const FeatureSection2: React.FC = () => {
    return (
        <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/bg-gradient.png"
                    alt="Feature Background"
                    className="w-full h-[900px] object-cover object-center opacity-100"
                />
            </div>

            <div className="container px-4 md:px-6 mx-auto max-w-5xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - iPhone Images */}
                    <div className="flex items-center relative">
                        <div className="z-10">
                            <Image
                                height={1500}
                                width={1500}
                                src="/feature-2.png"
                                alt="LookFit App Screen"
                                className="md:w-80 lg:w-96 rounded-3xl"
                            />
                        </div>
                    </div>

                    {/* Right Side - Text Content */}
                    <div className="space-y-6">
                        <h4 className="uppercase text-bold text-lg text-gray-300 max-w-xl">
                            100% Personalisation
                        </h4>
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                            Your Plan, Your Progress!
                        </h1>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <span className="text-white">
                                    No more one-size-fits-all diets. Get a plan designed for your goals, your cravings, and your schedule.
                                </span>
                            </div>
                        </div>
                        <Button className="mb-4 bg-white hover:bg-gray-300 text-[#FF4601] font-semibold font-[Helvetica]">
                            START YOUR JOURNEY NOW !!!
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FeatureSection2;
