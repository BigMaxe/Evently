import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    const organizer = await prisma.user.upsert({
        where: { email: 'organizer@evently.com' },
        update: {},
        create: {
            email: 'organizer@evently.com',
            name: 'Event Organizer',
            role: 'ORGANIZER',
        },
    })

    console.log('✅ Created organizer:', organizer.email)

    const events = [
        {
            title: 'Tech Summer Summit 2025',
            description: 'Join us for the biggest tech conference of the year',
            slug: 'tech-summer-summit-2025',
            image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/w_800,h_600,c_fill,q_auto,f_auto/v1763340064/fe-img1_iny63s.jpg',
            category: 'Technology',
            location: 'The Bridge Hall, Eliozu',
            date: new Date('2025-10-20'),
            price: 8000,
            isFree: false,
            featured: true,
            popular: true,
            upcoming: true,
            totalTickets: 500,
            availableTickets: 500,
            organizerId: organizer.id,
        },
        {
            title: 'Local Food Fun Fair',
            description: 'Experience the best local cuisine',
            slug: 'local-food-fun-fair',
            image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/w_800,h_600,c_fill,q_auto,f_auto/v1763340295/fe-img4_gmuaxk.jpg',
            category: 'Food and Drinks',
            location: 'Obi Wali Cultural Centre, Eliozu',
            date: new Date('2025-11-15'),
            price: 0,
            isFree: true,
            featured: true,
            popular: true,
            upcoming: true,
            totalTickets: 1000,
            availableTickets: 1000,
            organizerId: organizer.id,
        },
        {
            title: 'Summer Music Festival',
            description: 'Live performances from top artists',
            slug: 'summer-music-festival',
            image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/w_800,h_600,c_fill,q_auto,f_auto/v1763340307/fe-img2_oqeukl.jpg',
            category: 'Music',
            location: 'Yakubu Gowon Stadium, Elekahia',
            date: new Date('2025-10-20'),
            price: 10000,
            isFree: false,
            featured: true,
            popular: false,
            upcoming: true,
            totalTickets: 2000,
            availableTickets: 2000,
            organizerId: organizer.id,
        },
        {
            title: 'Comedy Night Live',
            description: 'An evening of laughter with top comedians',
            slug: 'comedy-night-live',
            image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/w_800,h_600,c_fill,q_auto,f_auto/v1763340140/cta-img-8_wxsp5w.jpg',
            category: 'Entertainment',
            location: 'Presidential Hotel Conference Center',
            date: new Date('2025-10-11'),
            price: 25000,
            isFree: false,
            featured: true,
            popular: true,
            upcoming: false,
            totalTickets: 300,
            availableTickets: 300,
            organizerId: organizer.id,
        },
    ]

    for (const event of events) {
        await prisma.event.upsert({
            where: { slug: event.slug },
            update: {},
            create: event,
        })
    }

    console.log(`✅ Created ${events.length} events`)
    console.log('🎉 Seeding complete!')
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
