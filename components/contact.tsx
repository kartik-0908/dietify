'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const WaitlistSignup = () => {
    const [signupMethod, setSignupMethod] = useState('email');
    const [inputValue, setInputValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Replace this with your actual Make.com webhook URL
    const WEBHOOK_URL = 'https://hook.us2.make.com/v3fjvcta4bykp1vyo4ggos7m693gofgw';

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async () => {
        // Basic validation
        if (!inputValue.trim()) {
            alert(`Please enter your ${signupMethod === 'email' ? 'email address' : 'mobile number'}`);
            return;
        }

        // Email validation if email is selected
        if (signupMethod === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(inputValue)) {
                alert('Please enter a valid email address');
                return;
            }
        }

        setIsSubmitting(true);

        try {
            // Send data to Make.com webhook
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: signupMethod,
                    value: inputValue,
                    timestamp: new Date().toISOString(),
                    [signupMethod]: inputValue // This will create either 'email' or 'mobile' field
                })
            });

            if (response.ok) {
                alert("Thank you for joining our waitlist! We'll be in touch soon.");
                setInputValue(''); // Reset form
            } else {
                throw new Error('Failed to submit');
            }
        } catch (error) {
            console.error('Error submitting to webhook:', error);
            alert('Sorry, something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id='waitlist' className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/bg-gradient.png"
                    alt="Waitlist Background"
                    fill
                    className="object-cover opacity-100"
                    priority
                />
            </div>

            <div className="container px-4 md:px-6 mx-auto max-w-4xl relative z-10">
                <div className="bg-white/10 backdrop-blur-lg p-8 md:p-12 rounded-2xl shadow-lg text-white">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center">
                        Join Our Waitlist
                    </h2>
                    <p className="text-center text-gray-300 text-sm md:text-base mt-2 mb-6">
                        Be the first to know when we launch! Join waitlist with your email or mobile number.
                    </p>

                    <div className="mt-6 space-y-6">
                        {/* Signup Method Toggle */}
                        <div className="flex justify-center space-x-4 mb-6">
                            <button
                                type="button"
                                onClick={() => setSignupMethod('email')}
                                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                                    signupMethod === 'email'
                                        ? 'bg-[#FF4601] text-white'
                                        : 'bg-white/20 text-gray-300 hover:bg-white/30'
                                }`}
                            >
                                Sign up with Email
                            </button>
                            <button
                                type="button"
                                onClick={() => setSignupMethod('mobile')}
                                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                                    signupMethod === 'mobile'
                                        ? 'bg-[#FF4601] text-white'
                                        : 'bg-white/20 text-gray-300 hover:bg-white/30'
                                }`}
                            >
                                Sign up with Mobile
                            </button>
                        </div>

                        {/* Input Field */}
                        <input
                            type={signupMethod === 'email' ? 'email' : 'tel'}
                            placeholder={signupMethod === 'email' ? 'Your Email Address' : 'Your Mobile Number'}
                            value={inputValue}
                            onChange={handleInputChange}
                            className="w-full p-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-[#FF4601] focus:outline-none text-center text-lg"
                        />

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button 
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`w-full max-w-[250px] py-3 px-6 rounded-lg font-semibold transition-colors ${
                                    isSubmitting 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-white hover:bg-gray-300 text-[#FF4601]'
                                }`}
                            >
                                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                            </button>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <p className="text-center text-gray-400 text-xs mt-4">
                        We&apos;ll notify you as soon as we&apos;re ready to launch. No spam, promise!
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WaitlistSignup;