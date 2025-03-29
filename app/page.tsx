import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import TestimonialSection from "@/components/testimonial-section"
import FeatureSection1 from "@/components/feature-1"
import FeatureSection2 from "@/components/feature-2"
import FAQSection from "@/components/faq"
import ParallelogramSection from "@/components/start"
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header with improved mobile responsiveness */}
      <header className="px-4 lg:px-8 py-4 flex flex-col sm:flex-row items-center font-[Helvetica] font-bold">

        <Link className="flex items-center justify-center" href="#">
          <Image src="/logo.svg" alt="logo" width={150} height={50} />
        </Link>
        <nav className="mt-4 sm:mt-0 sm:ml-auto flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-24 items-center text-white pr-16">
          <Link className="text-sm" href="#">
            ABOUT US
          </Link>
          <Link className="text-sm " href="#">
            TESTIMONY
          </Link>
          <Link className="text-sm" href="#">
            FEATURES
          </Link>
          <Link className="text-sm" href="#">
            FAQ
          </Link>
          <Link className="text-sm" href="#">
            CONTACT US
          </Link>
          <Button className="bg-[#2E2C2C] text-[#FF4601] font-semibold font-[Helvetica] hover:bg-[#3D3B3B]">
            START JOURNEY
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero section with improved spacing */}
        <section className="w-full pt-32 font-inter">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none max-w-3xl mx-auto">
                  <span className="text-[#FF4601]">LookFit</span>{' '}
                  Without Sacrificing Craving
                </h1>
                <p className="mx-auto max-w-[700px] md:text-xl text-[#BB5200]">
                  Achieve your ideal body with a personalized diet plan tailored to your goals, schedule, and preferences. Track your progress, enjoy your favorite foods, and see real results.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Button className="mb-4 bg-[#2E2C2C] hover:bg-[#3D3B3B] text-[#FF4601] font-semibold font-[Helvetica]">
                  START YOUR JOURNEY NOW !!!
                </Button>
              </div>

              {/* iPhone Screenshots */}
              <div className="w-full max-w-5xl flex justify-center items-center mt-16 space-x-4 md:space-x-8 max-h-[700px]">
                {/* Left iPhone */}
                <div className="w-1/5 opacity-90">
                  <Image
                    width={220}
                    height={200}
                    src="/hero-left.png"
                    alt="LookFit App Screenshot"
                  />
                </div>

                {/* Center (Larger) iPhone */}

                <div className="w-2/5 z-10 relative">
                  <div className="absolute -inset-8 bg-gray-900/10 blur-2xl rounded-full opacity-50"></div>
                  <Image
                    width={820}
                    height={200}
                    src="/her.png"
                    alt="LookFit App Screenshot"
                    className="relative z-20"
                  />
                </div>

                {/* Right iPhone */}
                <div className="w-1/5 max-w-[250px] opacity-90 ">
                  <Image
                    width={220}
                    height={200}
                    src="/hero-right.png"
                    alt="LookFit App Screenshot"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <TestimonialSection />
        <FeatureSection1 />
        <FeatureSection2 />
        <FAQSection />
        <ParallelogramSection />

      </main>

      {/* Footer with better mobile layout */}
      <footer className="w-full py-8 px-4 md:px-6 border-t bg-black text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            {/* Left Side - Brand Info */}
            <div className="flex flex-col max-w-md">
              <h3 className="text-2xl font-bold text-white mb-2">Dietify</h3>
              <p className="text-gray-300 mb-3">
                Your journey to a healthier, more confident you starts here. Personalized nutrition plans tailored to your goals — no cravings sacrificed.
              </p>
              <p className="text-lg text-white font-medium mb-4">Eat Smart. Look Better.</p>
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
                <Link className="text-gray-300 hover:text-white" href="#">
                  FAQ
                </Link>
                <Link className="text-gray-300 hover:text-white" href="#">
                  Contact Us
                </Link>
                <Link className="text-gray-300 hover:text-white" href="#">
                  Testimonials
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}