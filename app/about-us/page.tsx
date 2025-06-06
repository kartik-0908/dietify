import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full pt-16 md:pt-24 font-inter">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-6 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                About <span className="text-[#FF4601]">Dietify</span>
              </h1>
              <p className="mx-auto max-w-[700px] md:text-xl text-[#BB5200]">
                Transform Your Body. Own Your Confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className=" items-center">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                  Our Mission
                </h2>
                <p className="text-gray-400 md:text-lg">
                  At Dietify, our mission is to empower individuals to achieve their fitness goals without sacrificing their love for food. We believe that sustainable fat loss and a healthy lifestyle should be enjoyable, accessible, and personalized.
                </p>
                <p className="text-gray-400 md:text-lg">
                  By leveraging AI-powered technology and offering flexible, culturally relevant meal plans, we aim to make balanced nutrition a part of everyday life.
                </p>
                <p className="text-gray-400 md:text-lg">
                  We are committed to breaking the cycle of restrictive dieting by promoting mindful eating and positive habit formation. Our goal is to support individuals in their journey to a healthier, happier version of themselves — one delicious meal at a time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="w-full py-12 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-black text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-center mb-12">
              Our Story
            </h2>
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="relative h-96 rounded-xl overflow-hidden">
                  <div className="absolute -inset-2 bg-gray-900/10 blur-xl rounded-full opacity-50"></div>
                  <Image
                    src="/ss.png" 
                    alt="Dhruv's transformation journey"
                    fill
                    className=" rounded-xl"
                  />
                </div>
                <div className="mt-4 text-sm text-gray-500 text-center">
                  Dhruv&apos;s story was featured in Hindustan Times
                </div>
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <p className="text-gray-700 md:text-lg">
                  At Dietify, we believe that achieving your fitness goals shouldn&apos;t mean giving up the foods you love. Our journey began when we noticed a common struggle — people wanting to lose fat but feeling trapped by restrictive diets.
                </p>
                <p className="text-gray-700 md:text-lg">
                  This realization hit home when Dhruv, our co-founder and a fitness influencer, embarked on his own transformation journey. His story, recently featured in Hindustan Times, became a powerful source of inspiration for us. Dhruv lost 27 kg in just five months, not by giving up his favorite foods, but by adopting a balanced, flexible approach to nutrition.
                </p>
                <p className="text-gray-700 md:text-lg">
                  Seeing how Dhruv navigated common fat-loss mistakes and achieved sustainable results motivated us to take action. We knew there had to be a better way for people to reach their goals while enjoying their meals. That&apos;s when Dietify was born.
                </p>
                <div className="pt-4">
                  <Button className="bg-[#2E2C2C] hover:bg-[#3D3B3B] text-[#FF4601] font-semibold">
                    <a href="https://www.hindustantimes.com/lifestyle/health/man-who-lost-27-kg-in-5-months-without-sacrificing-food-reveals-top-4-fat-loss-mistakes-weight-loss-fast-skipping-meals-101737083153757.html" target="_blank" rel="noopener noreferrer">
                      READ THE ARTICLE
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values and Beliefs Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-center mb-12">
              Values and Beliefs that Drive Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-[#FF4601]/10 flex items-center justify-center rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF4601" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
                    <circle cx="12" cy="10" r="3" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <h3 className="text-xl text-gray-700 font-bold mb-2">Personalization Over Restriction</h3>
                <p className="text-gray-600">
                  We understand that no two people are the same. Dietify celebrates individuality by offering AI-powered, customized diet plans tailored to personal tastes, preferences, and lifestyles.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-[#FF4601]/10 flex items-center justify-center rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF4601" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                  </svg>
                </div>
                <h3 className="text-xl text-gray-700 font-bold mb-2">Enjoyment Without Guilt</h3>
                <p className="text-gray-600">
                  Food is meant to be enjoyed. Whether it&apos;s a family gathering or a spontaneous street food craving, we believe in finding a balance. We aim to make dieting flexible and enjoyable.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-[#FF4601]/10 flex items-center justify-center rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF4601" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className="text-xl text-gray-700 font-bold mb-2">Sustainability for Success</h3>
                <p className="text-gray-600">
                  Quick fixes and crash diets don&apos;t last. Dietify promotes a sustainable approach to weight management by focusing on habit formation and providing realistic, adaptable plans.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-[#FF4601]/10 flex items-center justify-center rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF4601" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <h3 className="text-xl text-gray-700 font-bold mb-2">Empowerment Through Knowledge</h3>
                <p className="text-gray-600">
                  We are committed to helping users make informed decisions about their health. Our platform educates users about nutrition, portion control, and mindful eating.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-[#FF4601]/10 flex items-center justify-center rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF4601" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl text-gray-700 font-bold mb-2">Community and Support</h3>
                <p className="text-gray-600">
                  Health journeys are better when shared. We foster a supportive community where users can share experiences, celebrate milestones, and motivate one another.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-[#FF4601]/10 flex items-center justify-center rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF4601" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <h3 className="text-xl text-gray-700 font-bold mb-2">Results That Last</h3>
                <p className="text-gray-600">
                  At Dietify, we don&apos;t believe in temporary transformations — we believe in lasting change. And we&apos;re here to support you every step of the way.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="w-full py-12 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-2xl text-black font-bold tracking-tighter sm:text-3xl md:text-4xl text-center mb-12">
              Why Choose Dietify?
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-start space-y-3">
                <div className="p-2 bg-[#FF4601]/10 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF4601" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                    <polyline points="7.5 19.79 7.5 14.6 3 12" />
                    <polyline points="21 12 16.5 14.6 16.5 19.79" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
                <h3 className="text-xl text-gray-700 font-bold">Personalized, Not Generic</h3>
                <p className="text-gray-600">
                  Unlike one-size-fits-all diets, our AI-powered technology creates a fully customized meal plan tailored to your preferences, goals, and lifestyle.
                </p>
              </div>
              
              <div className="flex flex-col items-start space-y-3">
                <div className="p-2 bg-[#FF4601]/10 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF4601" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                    <line x1="6" y1="1" x2="6" y2="4" />
                    <line x1="10" y1="1" x2="10" y2="4" />
                    <line x1="14" y1="1" x2="14" y2="4" />
                  </svg>
                </div>
                <h3 className="text-xl text-gray-700 font-bold">Enjoy the Foods You Love</h3>
                <p className="text-gray-600">
                  Craving street food or your favorite dessert? No problem! Dietify offers multiple alternatives for every meal, so you can enjoy a variety of delicious dishes without guilt.
                </p>
              </div>
              
              <div className="flex flex-col items-start space-y-3">
                <div className="p-2 bg-[#FF4601]/10 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF4601" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                  </svg>
                </div>
                <h3 className="text-xl text-gray-700 font-bold">Localized & Accessible Meals</h3>
                <p className="text-gray-600">
                  We recommend meals based on the ingredients and dishes available in your area. No exotic ingredients or complex recipes — just wholesome, enjoyable meals.
                </p>
              </div>
              
              <div className="flex flex-col items-start space-y-3">
                <div className="p-2 bg-[#FF4601]/10 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF4601" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 20v-3" />
                    <path d="M18 14V6a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v14a3 3 0 0 0 3 3h9" />
                    <circle cx="18" cy="18" r="3" />
                    <path d="M14 9h-4" />
                    <path d="M14 13h-7" />
                    <path d="M9 17H7" />
                  </svg>
                </div>
                <h3 className="text-xl text-gray-700 font-bold">Sustainable, Long-term Results</h3>
                <p className="text-gray-600">
                  Forget crash diets and yo-yo effects. Dietify promotes habit formation and gradual, sustainable fat loss. Our plans are designed to help you build healthier eating habits that last.
                </p>
              </div>
              
              <div className="flex flex-col items-start space-y-3">
                <div className="p-2 bg-[#FF4601]/10 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF4601" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                  </svg>
                </div>
                <h3 className="text-xl text-gray-700 font-bold">AI Adaptability</h3>
                <p className="text-gray-600">
                  Your plan evolves with you. Whether you&apos;re dining out, traveling, or celebrating, our AI dynamically adjusts your plan to keep you on track without missing out on life&apos;s moments.
                </p>
              </div>
              
              <div className="flex flex-col items-start space-y-3">
                <div className="p-2 bg-[#FF4601]/10 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF4601" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                  </svg>
                </div>
                <h3 className="text-xl text-gray-700 font-bold">Designed for Indian Foodies</h3>
                <p className="text-gray-600">
                  We celebrate the diverse food culture of India. From local delicacies to regional favorites, Dietify offers meal suggestions that resonate with your tastes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-[#2E2C2C]">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-lg mb-8">
              Join thousands who are transforming their lives without giving up the foods they love.
            </p>
            <Button className="bg-[#FF4601] hover:bg-[#E34000] text-white font-semibold">
              <Link href='/sign-in'>
                GET STARTED NOW
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-4 md:px-6 border-t bg-black text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            {/* Left Side - Brand Info */}
            <div className="flex flex-col max-w-md">
              <h3 className="text-2xl font-bold text-white mb-2">Dietify</h3>
              <p className="text-gray-300 mb-3">
                Transform Your Body. Own Your Confidence.
              </p>
              <p className="text-lg text-white font-medium mb-4">Ready to feel great</p>
              <a href="#" className="text-gray-300 hover:text-white" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>

            {/* Right Side - Navigation Links */}
            <div className="flex flex-col">
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <nav className="flex flex-col gap-3">
                <Link className="text-gray-300 hover:text-white" href="#">
                  About Us
                </Link>
               
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}