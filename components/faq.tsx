'use client';
import React, { useState } from 'react';

const faqs = [
    {
        question: "How is Dietify different from other diet programs?",
        answer: "Dietify stands out by offering a personalized, flexible, and enjoyable dieting experience. Unlike conventional diet programs that provide rigid, one-size-fits-all meal plans, Dietify uses AI-powered algorithms to create plans tailored to your preferences, goals, and lifestyle. It emphasizes sustainability by incorporating foods you love while ensuring balanced nutrition."
    },
    {
        question: "What kind of foods can I expect in my personalized plan?",
        answer: "Your personalized plan will include a variety of familiar, locally available, and culturally relevant foods. From your favorite street foods to regional delicacies and home-cooked meals, Dietify ensures you don't feel restricted. Each plan is designed to maintain the right calorie intake and macronutrient balance while offering multiple options. Plus, you'll have daily alternatives to choose from, adding variety and reducing diet fatigue."
    },
    {
        question: "Can I still enjoy my favorite foods while on a diet plan?",
        answer: "Absolutely! At Dietify, we believe that sustainability is key to success. Our AI-powered system integrates your favorite foods into your diet plan without compromising your progress. Craving a slice of pizza or a plate of biryani? No problem! Dietify will adjust the remaining meals of your day to maintain a healthy balance. This ensures that you stay on track while enjoying the foods you love."
    },
    {
        question: "How can I ensure my results are long-term and not temporary?",
        answer: "Dietify promotes sustainable and long-term fat loss by focusing on habit formation rather than quick fixes. Our app tracks your progress, adapts your diet based on real-time data, and provides ongoing support. You'll receive guidance on mindful eating, portion control, and nutritional awareness, empowering you to make informed food choices."
    }
];

const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 pb-0">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-600 overflow-hidden">
                            <button
                                className="w-full text-left py-3 sm:py-4 flex justify-between items-center text-white font-medium text-base sm:text-lg transition-all duration-300 ease-in-out"
                                onClick={() => toggleFAQ(index)}
                            >
                                {faq.question}
                                <span className="text-lg sm:text-xl transition-transform duration-300 ease-in-out transform" style={{ transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                    {openIndex === index ? '-' : '+'}
                                </span>
                            </button>
                            <div className={`transition-max-height duration-500 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                                <p className="text-gray-300 pb-3 sm:pb-4 px-2 sm:px-4 text-sm sm:text-base">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;