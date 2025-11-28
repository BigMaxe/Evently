import { Event } from '@/types'

// Simulated database of all events
export const allEventsData: Event[] = [
    {
        id: 1,
        title: 'Tech Summer Summit 2025',
        date: '10/20/2025',
        location: 'The Bridge Hall, Eliozu',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/w_800,h_600,c_fill,q_auto,f_auto/v1763340064/fe-img1_iny63s.jpg',
        slug: 'tech-summer-summit-2025',
        category: 'Technology',
        price: '₦8,000',
        isFree: false,
        featured: false,
        upcoming: true,
        popular: true,
    },
    {
        id: 2,
        title: 'Local Food Fun Fair',
        date: '11/15/2025',
        location: 'Obi Wali Cultural Centre, Eliozu',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/w_800,h_600,c_fill,q_auto,f_auto/v1763340295/fe-img4_gmuaxk.jpg',
        slug: 'local-food-fun-fair',
        category: 'Food and Drinks',
        price: 'Free',
        isFree: true,
        featured: false,
        upcoming: true,
        popular: true,
    },
    {
        id: 3,
        title: 'Summer Music Festival',
        date: '10/20/2025',
        location: 'Yakubu Gowon Stadium, Elekahia',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/w_800,h_600,c_fill,q_auto,f_auto/v1763340307/fe-img2_oqeukl.jpg',
        slug: 'summer-music-festival',
        category: 'Music',
        price: '₦10,000',
        isFree: false,
        featured: false,
        upcoming: true,
        popular: false,
    },
    {
        id: 4,
        title: 'Art & Culture Expo',
        date: '12/05/2025',
        location: 'Pleasure Park',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/w_800,h_600,c_fill,q_auto,f_auto/v1763340108/cta-img-7_pln0uu.jpg',
        slug: 'art-culture-expo',
        category: 'Art',
        price: '₦5,000',
        isFree: false,
        featured: false,
        upcoming: true,
        popular: true,
    },
    {
        id: 5,
        title: 'Comedy Night Live',
        date: '10/11/2025',
        location: 'Presidential Hotel Conference Center',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/w_800,h_600,c_fill,q_auto,f_auto/v1763340140/cta-img-8_wxsp5w.jpg',
        slug: 'comedy-night-live',
        category: 'Entertainment',
        price: '₦25,000',
        isFree: false,
        featured: true,
        upcoming: false,
        popular: true,
    },
    {
        id: 6,
        title: 'New Year Gala 2026',
        date: '11/31/2025',
        location: 'Presidential Hotel Conference Center',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/w_800,h_600,c_fill,q_auto,f_auto/v1763340295/fe-img4_gmuaxk.jpg',
        slug: 'new-year-gala-2026',
        category: 'Gala',
        price: '₦50,000',
        isFree: false,
        featured: true,
        upcoming: false,
        popular: true,
    },
    {
        id: 7,
        title: 'Spring Fashion Show',
        date: '11/15/2025',
        location: 'Obi Wall Cultural Centre',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/w_800,h_600,c_fill,q_auto,f_auto/v1763340295/fe-img4_gmuaxk.jpg',
        slug: 'spring-fashion-show',
        category: 'Fashion',
        price: '₦12,000',
        isFree: false,
        featured: true,
        upcoming: true,
        popular: true,
    },
    {
        id: 8,
        title: 'Jazz Festival Downtown',
        date: '11/15/2025',
        location: 'Yakubu Gowon Stadium',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/w_800,h_600,c_fill,q_auto,f_auto/v1763340295/fe-img4_gmuaxk.jpg',
        slug: 'jazz-festival-downtown',
        category: 'Music',
        price: '₦15,000',
        isFree: false,
        featured: true,
        upcoming: true,
        popular: false,
    },
    {
        id: 9,
        title: 'Business Leadership Summit',
        date: '12/10/2025',
        location: 'The Bridge Hall, Eliozu',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/w_800,h_600,c_fill,q_auto,f_auto/v1763340064/fe-img1_iny63s.jpg',
        slug: 'business-leadership-summit',
        category: 'Business',
        price: '₦20,000',
        isFree: false,
        featured: false,
        upcoming: true,
        popular: true,
    },
    {
        id: 10,
        title: 'Health & Wellness Expo',
        date: '01/15/2026',
        location: 'Pleasure Park',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/w_800,h_600,c_fill,q_auto,f_auto/v1763340108/cta-img-7_pln0uu.jpg',
        slug: 'health-wellness-expo',
        category: 'Health',
        price: 'Free',
        isFree: true,
        featured: false,
        upcoming: true,
        popular: false,
    },
    {
        id: 11,
        title: 'Photography Workshop',
        date: '12/20/2025',
        location: 'Art Gallery Downtown',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/w_800,h_600,c_fill,q_auto,f_auto/v1763340108/cta-img-7_pln0uu.jpg',
        slug: 'photography-workshop',
        category: 'Art',
        price: '₦7,000',
        isFree: false,
        featured: false,
        upcoming: true,
        popular: false,
    },
    {
        id: 12,
        title: 'International Food Festival',
        date: '01/10/2026',
        location: 'Waterfront Park',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/w_800,h_600,c_fill,q_auto,f_auto/v1763340295/fe-img4_gmuaxk.jpg',
        slug: 'international-food-festival',
        category: 'Food and Drinks',
        price: 'Free',
        isFree: true,
        featured: false,
        upcoming: true,
        popular: true,
    },
]

// Helper function to get events by category with pagination
export function getEventsByCategory(
    category?: string,
    page: number = 1,
    limit: number = 6
) {
    let filteredEvents = allEventsData

    // Filter by category if provided
    if (category && category !== 'All') {
        filteredEvents = allEventsData.filter(
            event => event.category.toLowerCase() === category.toLowerCase()
        )
    }

    // Calculate pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedEvents = filteredEvents.slice(startIndex, endIndex)
    const hasMore = endIndex < filteredEvents.length

    return {
        events: paginatedEvents,
        hasMore,
        total: filteredEvents.length,
    }
}
