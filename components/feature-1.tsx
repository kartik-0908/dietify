import React from 'react';
import { Button } from './ui/button';

const FeatureSection1: React.FC = () => {
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
                    {/* Left Side - Text Content */}
                    <div className="space-y-6">
                        <h4 className="uppercase text-lg text-gray-300 max-w-xl">
                            Your Body, Your Confidence!
                        </h4>
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                            MEALS & MINDSET, MASTERED !
                        </h1>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#BB5200"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                                <span className="text-white">
                                    Look and feel great in your favorite clothes
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#BB5200"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                                <span className="text-white">
                                    Lose weight without giving up the foods you love
                                </span>
                            </div>
                        </div>
                        <Button className="mb-4 bg-white hover:bg-gray-300 text-[#FF4601] font-semibold font-[Helvetica]">
                            START YOUR JOURNEY NOW !!!
                        </Button>
                    </div>

                    {/* Right Side - iPhone Images */}
                    <div className="flex justify-center items-center relative">
                        <div className="z-10">
                            <img
                                src="/feature-1.png"
                                alt="LookFit App Screen"
                                className="w-64 md:w-80 lg:w-96 rounded-3xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeatureSection1;