import React from 'react';
import { Button } from './ui/button';

const ContactUs: React.FC = () => {
    return (
        <section id='contact' className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/bg-gradient.png"
                    alt="Contact Background"
                    className="w-full h-full object-cover opacity-100"
                />
            </div>

            <div className="container px-4 md:px-6 mx-auto max-w-4xl relative z-10">
                <div className="bg-white/10 backdrop-blur-lg p-8 md:p-12 rounded-2xl shadow-lg text-white">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center">
                        Contact Us
                    </h2>
                    <p className="text-center text-gray-300 text-sm md:text-base mt-2">
                        Reach out to us with any questions or concerns!
                    </p>

                    <form className="mt-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-[#FF4601] focus:outline-none"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-[#FF4601] focus:outline-none"
                            />
                        </div>
                        <input
                            type="tel"
                            placeholder="Your Mobile Number"
                            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-[#FF4601] focus:outline-none"
                        />
                        <textarea
                            placeholder="Your Query"
                            rows={4}
                            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-[#FF4601] focus:outline-none"
                        ></textarea>
                        <div className="flex justify-center">
                            <Button className="w-full max-w-[250px] bg-white hover:bg-gray-300 text-[#FF4601] font-semibold">
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
