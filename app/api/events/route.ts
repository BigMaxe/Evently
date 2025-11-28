import { NextRequest, NextResponse } from 'next/server'
import { getEventsByCategory } from '@/lib/events-data'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const category = searchParams.get('category') || undefined
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '6')

        // simulate database delay, remove this in production
        await new Promise(resolve => setTimeout(resolve, 500))

        const result = getEventsByCategory(category, page, limit)

        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        console.error('Error fetching events:', error)
        return NextResponse.json(
            { error: 'Failed to fetch events' },
            { status: 500 }
        )
    }
}
