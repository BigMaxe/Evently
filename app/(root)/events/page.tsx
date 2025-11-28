'use client'

import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Loader2 } from "lucide-react"
import { Header } from "@/components/shared/Header"
import { Footer } from "@/components/shared/Footer"
import { AuthModal } from "@/components/auth/AuthModal"
import { Event, EventsResponse } from "@/types"

const categories = [
    'All',
    'Technology',
    'Food and Drinks',
    'Music',
    'Art',
    'Entertainment',
    'Gala',
    'Fashion',
    'Sports',
    'Business',
    'Health',
    'Education'
]

export default function EventPage() {
    const searchParams = useSearchParams()
    const categoryParam = searchParams.get('category')

    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [page, setPage] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All')
    const [showAuthModal, setShowAuthModal] = useState(false)

    const { status } = useSession()
    const isAuthenticated = status === 'authenticated'

    // fetch events
    const fetchEvents = async (pageNum: number, category: string, append: boolean = false) => {
        try {
            if (append) {
                setLoadingMore(true)
            } else {
                setLoading(true)
            }

            const categoryQuery = category !== 'All' ? `&category=${encodeURIComponent(category)}` : ''
            const responses = await fetch(`/api/events?page=${pageNum}&limit=6${categoryQuery}`)

            if (!responses.ok) throw new Error('Failed to fetch events')

            const data: EventsResponse = await responses.json()

            if (append) {
                setEvents(prev => [...prev, ...data.events])
            } else {
                setEvents(data.events)
            }

            setHasMore(data.hasMore)
        } catch (error) {
            console.error('Error fetching events:', error)
        } finally {
            setLoading(false)
            setLoadingMore(false)
        }
    }

    // initial load and category change
    useEffect(() => {
        setPage(1)
        fetchEvents(1, selectedCategory, false)
    }, [selectedCategory])

    // load more events
    const handleLoadMore = () => {
        const nextPage = page + 1
        setPage(nextPage)
        fetchEvents(nextPage, selectedCategory, true)
    }

    // handle category change
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
    }

    //auth protection
    const handleEventClick = (e: React.MouseEvent, slug: string) => {
        if (!isAuthenticated) {
            e.preventDefault()
            setShowAuthModal(true)
        }
    }

    const handleBookTicket = (e:React.MouseEvent, eventTitle: string) => {
        e.preventDefault()
        e.stopPropagation()

        if (!isAuthenticated) {
            setShowAuthModal(true)
        } else {
            console.log('Book ticket for:', eventTitle)
        }
    }

    return (
        <>
            <main className="min-h-screen bg-gray-50">
                <Header />

                {/* page header */}
                <section className="bg-gray-900 text-white py-12">
                    <div className="wrapper">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2 font-black-han-sans">
                            {selectedCategory === 'All' ? 'All Events' : `${selectedCategory} Events`}
                        </h1>
                        <p className="text-gray-300 font-sarala">
                            Discover amazing events happening near you.
                        </p>
                    </div>
                </section>

                {/* category filter */}
                <section className="bg-white border-b sticky top-0 z-10 shadow-sm">
                    <div className="wrapper py-4">
                        <div className="flex gap-2 overflow-x-auto scroller-hide">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryChange(category)}
                                    className={`px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap font-sarala ${
                                        selectedCategory === category
                                            ? 'bg-gray-900 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* event grid */}
                <section className="py-12">
                    <div className="wrapper">
                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
                            </div>
                        ) : events.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-xl text-gray-600 font-sarala">
                                    No events found in this category
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {events.map((event) => (
                                        <Link
                                            key={event.id}
                                            href={`/events/${event.slug}`}
                                            onClick={(e) => handleEventClick(e, event.slug)}
                                            className="group block h-full"
                                        >
                                            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                                                {/* event image */}
                                                <div className="relative h-64 overflow-hidden">
                                                    <Image 
                                                        src={event.image}
                                                        alt={event.title}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    />

                                                    {/* category badge */}
                                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                                        <span className="text-xs font-semibold text-gray-800 font-sarala">
                                                            {event.category}
                                                        </span>
                                                    </div>

                                                    {/* price badge */}
                                                    <div
                                                        className={`absolute top-3 right-3 ${
                                                            event.isFree ? 'bg-green-500' : 'bg-gray-900'
                                                        } px-3 py-1 rounded-full`}
                                                    >
                                                        <span className="text-xs font-bold text-white font-sarala">
                                                            {event.price}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* event info */}
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
                                                            <span className="text-sm font-sarala line-clamp-2">
                                                                {event.location}
                                                            </span>
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
                                    ))}
                                </div>

                                {/* load more button */}
                                {hasMore && (
                                    <div className="flex justify-center mt-12">
                                        <button
                                            onClick={handleLoadMore}
                                            disabled={loadingMore}
                                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed font-sarala flex items-center gap-2"
                                        >
                                            {loadingMore ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Loading...
                                                </>
                                            ) : (
                                                'Load More Events'
                                            )}
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>

                <Footer />
            </main>

            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </>
    )
}
