// Event interface
export interface Event {
    id: number
    title: string
    date: string
    location: string
    image: string
    slug: string
    category: string
    price: string
    isFree: boolean
    featured: boolean
    upcoming: boolean
    popular: boolean
}

// API Response types
export interface EventsResponse {
    events: Event[]
    hasMore: boolean
    total: number
}

// Category type
export type EventCategory = 
    | 'All'
    | 'Technology'
    | 'Food and Drinks'
    | 'Music'
    | 'Art'
    | 'Entertainment'
    | 'Gala'
    | 'Fashion'
    | 'Sports'
    | 'Business'
    | 'Health'
    | 'Education'
    