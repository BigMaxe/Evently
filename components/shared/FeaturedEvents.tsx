'use client'

import React, { useCallback, useState } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Calendar, MapPin } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { AuthModal } from "@/components/auth/AuthModal"

const allEvents = [
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
]

export function FeaturedEvents() {
    const [activeTab, setActiveTab] = useState<'featured' | 'popular' | 'upcoming'>('featured')
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
    const { status } = useSession()
    const isAuthenticated = status === 'authenticated'

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
        // slidesToScroll: 1,
    })

    const getFilteredEvents = () => {
        switch(activeTab) {
            case 'featured':
                return allEvents.filter(event => event.featured)
            case 'popular':
                return allEvents.filter(event => event.popular)
            case 'upcoming':
                return allEvents.filter(event => event.upcoming)
            default:
                return allEvents
        }
    }

    const filteredEvents = getFilteredEvents()

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const handleEventClick = (e: React.MouseEvent, slug: string) => {
        if (!isAuthenticated) {
            e.preventDefault()
            setSelectedEvent(slug)
            setShowAuthModal(true)
        }
    }

    const handleBookTicket = (e: React.MouseEvent, eventTitle: string) => {
        e.preventDefault()
        e.stopPropagation()

        if (!isAuthenticated) {
            setShowAuthModal(true)
        } else (
            // booking logic
            console.log('Book ticket for:', eventTitle)
        )
    }

    return (
        <>
            <section className="py-16 bg-white">
                <div className="wrapper">
                    {/* Header with Tabs */}
                    <div className="flex items-center gap-6 mb-5">
                        <h2 className="text-2xl md:text-3xl font-bold font-black-han-sans">
                            Featured Events
                        </h2>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setActiveTab('featured')}
                                className={`px-4 py-2 rounded-lg font-semibold transition font-sarala ${
                                    activeTab === 'featured'
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Featured
                            </button>
                            <button
                                onClick={() => setActiveTab('popular')}
                                className={`px-4 py-2 rounded-lg font-semibold transition font-sarala ${
                                    activeTab === 'popular'
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Popular
                            </button>
                            <button
                                onClick={() => setActiveTab('upcoming')}
                                className={`px-4 py-2 rounded-lg font-semibold transition font-sarala ${
                                    activeTab === 'upcoming'
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Upcoming
                            </button>
                        </div>
                    </div>

                    {/* Carousel Container */}
                    <div className="relative">
                        {/* Carousel */}
                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="flex gap-6">
                                {filteredEvents.map((event) => (
                                    <div key={event.id} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                                        <Link
                                            href={`/events/${event.slug}`}
                                            onClick={(e) => handleEventClick(e, event.slug)}
                                            className="group block h-full"
                                        >
                                            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                                                {/* Event image */}
                                                <div className="relative h-64 overflow-hidden">
                                                    <Image 
                                                        src={event.image}
                                                        alt={event.title}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    />

                                                    {/* Category badge */}
                                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                                        <span className="text-xs font-semibold text-gray-800 font-sarala">
                                                            {event.category}
                                                        </span>
                                                    </div>

                                                    {/* Price Badge */}
                                                    <div className={`absolute top-3 right-3 ${event.isFree ? 'bg-green-500' : 'bg-gray-900'} px-3 py-1 rounded-full`}>
                                                        <span className="text-xs font-bold text-white font-sarala">
                                                            {event.price}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Event info */}
                                                <div className="p-5 flex-1 flex flex-col">
                                                    <h3 className="text-xl font-bold mb-2 font-sarala group-hover:text-green-600 transition line-clamp-2">
                                                        {event.title}
                                                    </h3>
                                                    <div className="space-y-2 mb-4">
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <Calendar className="w-4 h-4 flex-shrink-0" />
                                                            <span className="text-sm font-sarala">{event.date}</span>
                                                        </div>

                                                        <div className="flex items-start gap-2 text-gray-600">
                                                            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                                            <span className="text-sm font-sarala line-clamp-2">{event.location}</span>
                                                        </div>
                                                    </div>

                                                    <button
                                                        className="mt-auto w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg transition font-sarala"
                                                        onClick={(e) => handleBookTicket(e, event.title)}
                                                    >
                                                        Book Ticket
                                                    </button>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div> 
                    

                    {/* Arrow navigation + view all */}
                    <div className="flex justify-between items-center mt-6">
                        <div className="flex gap-2">
                            <button
                                onClick={scrollPrev}
                                className="w-12 h-12 rounded-full bg-gray-900 hover:bg-green-600 text-white flex items-center justify-center transition"
                                aria-label="Previous events"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={scrollNext}
                                className="w-12 h-12 rounded-full bg-gray-900 hover:bg-green-600 text-white flex items-center justify-center transition"
                                aria-label="Previous events"
                            >
                                <ArrowRight className="w-6 h-6" />
                            </button>
                        </div>

                        {/* View all events button */}
                        <Link
                            href="/events"
                            className="group flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition font-sarala"
                        >
                            <span>View All Events</span>
                            <div className="w-10 h-10 rounded-full bg-gray-900 group-hover:bg-green-600 text-white flex items-center justify-center transition">
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            <AuthModal 
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </>
    )
}
