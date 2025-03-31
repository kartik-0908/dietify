import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="bg-[#070417] flex flex-col min-h-screen justify-center items-center">
      <div className="w-full">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <Image src="/logo.svg" alt="Dietify Logo" width={120} height={40} />
        </div>

        {/* Sign-in Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">Sign in to your account</h2>
          <p className=" mt-2">Welcome back! Please enter your details</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: 'w-full flex justify-center items-center rounded-[35px]',
              // cardBox: 'rounded-[35px] bg-[#232645] w-full max-w-none shadow-none',
              // card: 'bg-[#232645] w-full',
              // socialButtons: 'bg-white w-full rounded-lg shadow-none',
              // socialButtonsBlockButton:'shadow-none border-none p-4 text-black',
              // dividerText: 'text-[#6C7278]',
              // dividerLine:"bg-[#EDF1F3]",
              // formFieldLabel: 'text-white',
              // formButtonPrimary:'bg-[#1D61E7]',
              // footer: 'bg-red w-full',
              headerTitle: 'hidden',
            },
          }}
        />


        {/* Sign-up Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-green-600 hover:text-green-700 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}