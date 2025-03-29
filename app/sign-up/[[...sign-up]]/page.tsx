import { SignUp } from '@clerk/nextjs'
import { Apple } from 'lucide-react'

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
                        Start Your Healthy Journey Today
                    </h1>

                    <p className="text-lg text-gray-700 mb-8">
                        Join our growing community and take control of your health with personalized diet plans and expert guidance.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
                                <span className="text-green-700 font-bold">1</span>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium">Customized Nutrition</h3>
                                <p className="text-gray-600">Tailored meal plans for your needs</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
                                <span className="text-green-700 font-bold">2</span>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium">Professional Advice</h3>
                                <p className="text-gray-600">Guidance from certified experts</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
                                <span className="text-green-700 font-bold">3</span>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium">Supportive Community</h3>
                                <p className="text-gray-600">Connect with like-minded individuals</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Sign-up component (full width on mobile) */}
            <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:p-12 lg:p-16">
                {/* Small screen branding - only visible on mobile */}
                <div className="w-full max-w-md">
                    <div className="md:hidden flex items-center justify-center mb-8">
                        <Apple className="h-7 w-7 text-green-500" />
                        <span className="ml-2 text-xl font-bold">TastyHealth</span>
                    </div>
                    <div className="bg-white rounded-lg p-6">
                        <SignUp />
                    </div>
                </div>
            </div>
        </div>
    )
}
