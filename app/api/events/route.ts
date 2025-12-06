import { NextRequest, NextResponse } from 'next/server'
// import { getEventsByCategory } from '@/lib/events-data'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const category = searchParams.get('category') || undefined
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '6')

        const where = category && category !== 'All'
            ? { category: { equals: category, mode: 'insensitive' as const } }
            : {}
        
        const [events, total] = await Promise.all([
            prisma.event.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { date: 'asc' },
                include: {
                    organizer: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        }
                    }
                }
            }), prisma.event.count({ where })
        ])

        const transformedEvents = events.map(event => ({
            id: event.id,
            title: event.title,
            date: event.date.toLocaleDateString(),
            location: event.location,
            image: event.image,
            slug: event.slug,
            category: event.category,
            price: event.isFree ? 'Free' : `₦${event.price.toLocaleString()}`,
            isFree: event.isFree,
            featured: event.featured,
            upcoming: event.upcoming,
            popular: event.popular,
        }))

        return NextResponse.json({
            events: transformedEvents,
            hasMore: page * limit < total,
            total,
        }, { status: 200 })

    } catch (error) {
        console.error('Error fetching events:', error)
        return NextResponse.json(
            { error: 'Failed to fetch events' },
            { status: 500 }
        )
    }
}
