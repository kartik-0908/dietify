import React from 'react';
import TestimonialCard from './testimonial-card';

// Define the type for a single testimonial
interface Testimonial {
  testimony: string;
  userName: string;
  userTitle: string;
  userImage: string;
}

const TestimonialSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      testimony: "LookFit transformed my approach to diet and fitness. The personalized plans actually work, and I've never felt better!",
      userName: "Sarah Johnson",
      userTitle: "Fitness Enthusiast",
      userImage: "/user1.jpg"
    },
    {
      testimony: "The influencer consultations are game-changing. The personalized advice has taken my performance to the next level.",
      userName: "Mike Rodriguez",
      userTitle: "Professional Athlete",
      userImage: "/user2.jpg"
    },
    {
      testimony: "As a nutrition professional, I'm impressed by LookFit's approach. The diet plans are scientifically sound and truly personalized.",
      userName: "Emma Thompson",
      userTitle: "Nutrition Coach",
      userImage: "/user3.jpg"
    }
  ];

  return (
    <section id='testimony' className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/bg-gradient.png"
          alt="Testimonial Background"
          className="w-full h-[850px] object-cover object-center opacity-100"
        />
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-16 text-white">
          What Our Users Say
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimony={testimonial.testimony}
              userName={testimonial.userName}
              userTitle={testimonial.userTitle}
              userImage={testimonial.userImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;