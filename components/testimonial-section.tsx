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
      testimony: "I’ve always worked out, but never got the results I wanted because I couldn’t follow boring diet charts. Dietify gave me a macro-friendly Indian plan that lets me enjoy parathas and still hit my protein goals. I’ve leaned down, gained energy, and never felt like I’m dieting. Highly recommend for fitness lovers who want results without sacrifice!",
      userName: "Chetan Gupta",
      userTitle: "Businessman",
      userImage: "/testimonial/chetan.jpeg"
    },
    {
      testimony: "Being in college with hostel food and peer pressure, I used to eat mindlessly and feel bad later. Dietify taught me how to eat mindfully while still having Maggi or momos occasionally. It’s not just a diet app—it’s a mindset shift. I feel lighter, more confident, and more in control than ever",
      userName: "Anip Verma",
      userTitle: "College Student",
      userImage: "/testimonial/anip.jpeg"
    },
    {
      testimony: "As someone juggling long work hours and zero time to cook complex meals, I’ve failed with so many strict diets. But Dietify’s personalized plan felt different—no bans, just balance. I still eat my mom’s rajma chawal on Sundays and yet I’ve dropped 6 kg in 2 months! The tracking and support made me feel in control, not restricted",
      userName: "Pranav Gupta",
      userTitle: "Marketing Manager",
      userImage: "/testimonial/pranav.jpeg"
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