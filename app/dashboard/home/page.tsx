import { getTodaySteps } from '@/app/actions/steps'
import { getUserBmi } from '@/app/actions/user'
import { getUserWeight } from '@/app/actions/weight'
import Home from '@/components/home'
import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

async function isUserOnboarded(userId: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    if (!user) return false
    return user.onboarded
}

export default async function Page() {
    const user = await currentUser()
    if (!user) return <div>Not signed in</div>
    const userId = user.id;
    const isOnboarded = await isUserOnboarded(userId)
    console.log(isOnboarded)
    if (!isOnboarded) {
        redirect('/dashboard/create-profile')
    }
    const bmi = await getUserBmi(userId)
    const weight = await getUserWeight(userId)
    const steps = await getTodaySteps()
    return <Home bmi={bmi} weight={weight} steps={steps} />

}