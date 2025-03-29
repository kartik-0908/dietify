import { SignIn } from '@clerk/nextjs'
import { Apple } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left side - Brand messaging (hidden on mobile) */}
      <div className="hidden md:flex bg-green-100 md:w-1/2 flex-col justify-center p-12 lg:p-16">
        <div className="max-w-md mx-auto md:mx-0 md:ml-auto md:mr-8 lg:mr-16">
          <div className="flex items-center mb-6">
            <Apple className="h-8 w-8 text-green-500" />
            <span className="ml-2 text-2xl font-bold">TastyHealth</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Healthy Eating, Happy Taste Buds
          </h1>
          
          <p className="text-lg text-gray-700 mb-8">
            Join thousands of people who have transformed their relationship with food. 
            Our personalized diet plans make healthy eating both nutritious and delicious.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
                <span className="text-green-700 font-bold">1</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Personalized Plans</h3>
                <p className="text-gray-600">Tailored nutrition that fits your lifestyle</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
                <span className="text-green-700 font-bold">2</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Expert Support</h3>
                <p className="text-gray-600">Direct access to nutrition coaches</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
                <span className="text-green-700 font-bold">3</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Community</h3>
                <p className="text-gray-600">Join others on their health journey</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Sign-in component (full width on mobile) */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:p-12 lg:p-16">
        {/* Small screen branding - only visible on mobile */}
        <div className="w-full max-w-md">
          <div className="md:hidden flex items-center justify-center mb-8">
            <Apple className="h-7 w-7 text-green-500" />
            <span className="ml-2 text-xl font-bold">TastyHealth</span>
          </div>
          
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl font-bold">Sign in to your account</h2>
            <p className="text-gray-600 mt-2">
              Welcome back! Please enter your details
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 ">
            <SignIn />
          </div>
          
          <p className="text-center md:text-left text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link href="/sign-up" className="text-green-600 hover:text-green-700 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}