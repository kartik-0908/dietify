import prisma from '@/lib/prisma'
import axios from 'axios'
import { NextResponse } from 'next/server'
export async function GET(req: Request) {
    try {
        const res = await axios.get('https://sheetdb.io/api/v1/uxkjb92bfewmz')
        const data = res.data
        data.map(async (item: any) => {
            console.log(item)
            if (item.image !== '') {
                await prisma.mealItem.create({
                    data: {
                        name: item.meal_item,
                        servingSize: item.serving_size,
                        Carbs: parseFloat(item.carbs),
                        Fat: parseFloat(item.fats),
                        Protein: parseFloat(item.protein),
                        Calories: parseFloat(item.calories),
                        Image: item.image
                    }
                })
            }

        })

        return NextResponse.json({ 'message': 'Hello from /api/sheet' })
    } catch (error) {
        console.error(error)
        return new Response('Error: Could not fetch data from SheetDB API', {
            status: 500,
        })

    }

}