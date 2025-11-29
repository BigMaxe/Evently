'use client'

import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { X, Calendar, MapPin, Loader2, ChevronDown, Filter } from "lucide-react"
import { Footer } from "@/components/shared/Footer"
import { AuthModal } from "@/components/auth/AuthModal"
import { Event, EventsResponse } from "@/types"
import { EventsPageHeader } from "@/components/shared/EventsPageHeader"

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

const dateFilters = [
    { label: 'All Dates', value: 'all' },
    { label: 'Today', value: 'today' },
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
    { label: 'This Year', value: 'year' },
]

const priceFilters = [
    { label: 'All Prices', value: 'all' },
    { label: 'Free', value: 'free' },
    { label: 'Paid', value: 'paid' },
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
    const [selectedDate, setSelectedDate] = useState('all')
    const [selectedPrice, setSelectedPrice] = useState('all')
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    const [isFilterOpen, setIsFilterOpen] = useState(false)

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

            // client side filters for date and time
            let filteredEvents = data.events

            // date filter
            if (selectedDate !== 'all') {
                // date filtering logic
            }

            // price filter
            if (selectedPrice === 'free') {
                filteredEvents = filteredEvents.filter(e => e.isFree)
            } else if (selectedPrice === 'paid') {
                filteredEvents = filteredEvents.filter(e => !e.isFree)
            }

            if (append) {
                setEvents(prev => [...prev, ...filteredEvents])
            } else {
                setEvents(filteredEvents)
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
    }, [selectedCategory, selectedDate, selectedPrice])

    // load more events
    const handleLoadMore = () => {
        const nextPage = page + 1
        setPage(nextPage)
        fetchEvents(nextPage, selectedCategory, true)
    }

    // handle category change
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
        setIsCategoryOpen(false)
    }

    const clearFilters = () => {
        setSelectedCategory('All')
        setSelectedDate('all')
        setSelectedPrice('all')
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

    const activeFiltersCount = [
        selectedCategory !== 'All' ? 1 : 0,
        selectedDate !== 'all' ? 1 : 0,
        selectedPrice !== 'all' ? 1 : 0,
    ].reduce((a, b) => a + b, 0)

    return (
        <>
            <main className="min-h-screen bg-gray-50">
                <div className="pt-12">
                    <EventsPageHeader />

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

                    <section className="bg-white border-b shadow-sm">
                        <div className="wrapper py-4">
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* category dropdwon */}
                                <div className="relative flex-1">
                                    <button
                                        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                        className="w-full md:w-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition font-sarala flex items-center justify-between gap-2"
                                    >
                                        <span>Category: {selectedCategory}</span>
                                        <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isCategoryOpen && (
                                        <>
                                            <div 
                                                className="fixed inset-0 z-10"
                                                onClick={() => setIsCategoryOpen(false)}
                                            />
                                            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border z-20 max-h-96 overflow-y-auto">
                                                {categories.map((category) => (
                                                    <button
                                                        key={category}
                                                        onClick={() => handleCategoryChange(category)}
                                                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition font-sarala ${
                                                            selectedCategory === category ? 'bg-gray-100 font-semibold' : ''
                                                        }`}
                                                    >
                                                        {category}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* more filters button */}
                                <button
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition font-sarala flex items-center justify-center gap-2"
                                >
                                    <Filter className="w-4 h-4" />
                                    <span>Filters</span>
                                    {activeFiltersCount > 0 && (
                                        <span className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {activeFiltersCount}
                                        </span>
                                    )}
                                </button>

                                {/* clear filters */}
                                {activeFiltersCount > 0 && (
                                    <button
                                        onClick={clearFilters}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-900 font-semibold transition font-sarala flex items-center gap-2"
                                    >
                                        <X className="w-4 h-4" />
                                        Clear All
                                    </button>
                                )}
                            </div>

                            {/* advanced filters panel */}
                            {isFilterOpen && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* date filter */}
                                        <div>
                                            <label className="block text-sm font-semibold mb-2 font-sarala">
                                                Date
                                            </label>
                                            <select
                                                value={selectedDate}
                                                onChange={(e) => setSelectedDate(e.target.value)}
                                                className="w-full px-4 py-2 border rounded-lg font-sarala focus:outline-none focus:ring-2 focus:ring-green-500"
                                            >
                                                {dateFilters.map((filter) => (
                                                    <option key={filter.value} value={filter.value}>
                                                        {filter.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* price filter */}
                                        <div>
                                            <label className="block text-sm font-semibold mb-2 font-sarala">
                                                Price
                                            </label>
                                            <select
                                                value={selectedPrice}
                                                onChange={(e) => setSelectedPrice(e.target.value)}
                                                className="w-full px-4 py-2 border rounded-lg font-sarala focus:outline-none focus:ring-2 focus:ring-green-500"
                                            >
                                                {priceFilters.map((filter) => (
                                                    <option key={filter.value} value={filter.value}>
                                                        {filter.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}
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
                                        No events found with the selected filters.
                                    </p>
                                    <button
                                        onClick={clearFilters}
                                        className="mt-4 text-green-600 hover:text-green-700 font-semibold font-sarala"
                                    >
                                        Clear all filters
                                    </button>
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
                </div>
            </main>

            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </>
    )
}
