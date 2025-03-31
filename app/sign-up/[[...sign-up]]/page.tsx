import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
    return (
        <div className="bg-[#070417] flex flex-col min-h-screen justify-center items-center pt-4">
            <div className="w-full">
                <div className="flex items-center justify-center mb-4">
                    <Image src="/logo.svg" alt="Dietify Logo" width={120} height={40} />
                </div>
                <SignUp
                    appearance={{
                        elements: {
                            rootBox: 'w-full flex justify-center items-center rounded-[35px]',
                        },
                    }}
                />
            </div>
        </div>
    )
}