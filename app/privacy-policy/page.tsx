import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full pt-16 md:pt-24 font-inter">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-6 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Privacy <span className="text-[#FF4601]">Policy</span>
              </h1>
              <p className="mx-auto max-w-[700px] md:text-xl text-[#BB5200]">
                Your privacy is important to us. Here’s how Dietify collects, uses, and protects your data.
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="space-y-8 text-gray-700 md:text-lg">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-4">
                Information We Collect
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-semibold">Camera Access:</span> We request access to your device’s camera so you can take photos of your food. These photos help us analyze your meals and provide accurate calorie and nutrition tracking.
                </li>
                <li>
                  <span className="font-semibold">Food Data:</span> We collect information about the foods you log, including photos, meal types, and portion sizes, to personalize your nutrition plan and track your daily calorie intake.
                </li>
                <li>
                  <span className="font-semibold">Workout Data:</span> We collect details about your workouts, such as activity type, duration, and intensity, to help manage your calorie balance and provide tailored recommendations.
                </li>
                <li>
                  <span className="font-semibold">Account Information:</span> When you sign up, we collect basic information like your name, email address, and preferences.
                </li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-4">
                How We Use Your Data
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  To provide personalized meal and workout recommendations.
                </li>
                <li>
                  To analyze your food photos for calorie and nutrition estimation.
                </li>
                <li>
                  To help you track your progress and achieve your health goals.
                </li>
                <li>
                  To improve our services and user experience.
                </li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-4">
                Data Protection & Security
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Your data is stored securely and is only accessible to authorized personnel.
                </li>
                <li>
                  We do not share your personal information with third parties without your consent, except as required by law.
                </li>
                <li>
                  All photos and sensitive data are encrypted and handled with strict confidentiality.
                </li>
              </ul>

              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-4">
                Your Choices & Rights
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  You can review, update, or delete your data at any time from your account settings.
                </li>
                <li>
                  You may revoke camera access or other permissions via your device settings.
                </li>
                <li>
                  For any privacy-related questions or requests, contact us at <a href="mailto:teamdietify@gmail.com" className="text-[#FF4601] underline">teamdietify@gmail.com</a>.
                </li>
              </ul>

              <p className="text-gray-500 mt-8">
                By using Dietify, you agree to this Privacy Policy. We may update this policy from time to time. Please review it periodically for changes.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-[#2E2C2C]">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-white mb-6">
              Questions or Concerns?
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-lg mb-8">
              We’re here to help. Reach out to our support team for any privacy-related queries.
            </p>
            <Button className="bg-[#FF4601] hover:bg-[#E34000] text-white font-semibold">
              <a href="mailto:teamdietify@gmail.com">
                CONTACT SUPPORT
              </a>
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
              <p className="text-lg text-white font-medium mb-4">Your privacy, our priority.</p>
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
                  Privacy Policy
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}