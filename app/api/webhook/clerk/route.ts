import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'
export async function POST(req: Request) {
    const SIGNING_SECRET = process.env.SIGNING_SECRET
    if (!SIGNING_SECRET) {
        throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env')
    }
    const wh = new Webhook(SIGNING_SECRET)
    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id') as string
    const svix_timestamp = headerPayload.get('svix-timestamp') as string
    const svix_signature = headerPayload.get('svix-signature') as string
    const payload = await req.json()
    const body = JSON.stringify(payload)

    let evt: WebhookEvent
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error: Could not verify webhook:', err)
        return new Response('Error: Verification error', {
            status: 400,
        })
    }

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error: Missing Svix headers', {
            status: 400,
        })
    }
    try {
        const { id } = evt.data
        const eventType = evt.type
        console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
        console.log('Webhook payload:', body)
        const email = payload.data.email_addresses[0].email_address
        const firstName = payload.data.first_name
        const lastName = payload.data.last_name
        const userId = payload.data.id
        const phoneNumber = payload.data.phone_numbers[0].phone_number

        const user = await prisma.user.create({
            data: {
                id: userId,
                email,
                firstName,
                lastName,
                phoneNumber,
            }
        })
        console.log('User created:', JSON.stringify(user))
    } catch (error) {
        return new Response(`Webhook error: ${error}`, {
            status: 400,
        })

    }
    return new Response('Ok', {
        status: 200,
    })
}