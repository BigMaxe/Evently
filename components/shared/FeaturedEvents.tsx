'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from 'lucide-react'

const events = [
    {
        id: 1,
        title: 'Tech Summer Summit 2025',
        date: '10/20/2025',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/w_1920,h_1080,c_fill,q_auto,f_auto/v1763340064/fe-img1_iny63s.jpg',
        slug: 'tech-summer-summit-2025',
    },
    {
        id: 2,
        title: 'Local Food Fun Fair',
        date: '11/15/2025',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/w_1920,h_1080,c_fill,q_auto,f_auto/v1763340295/fe-img4_gmuaxk.jpg',
        slug: 'local-food-fun-fair',
    },
    {
        id: 3,
        title: 'Summer Music Festival',
        date: '10/20/2025',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/w_1920,h_1080,c_fill,q_auto,f_auto/v1763340307/fe-img2_oqeukl.jpg',
        slug: 'summer-music-festival',
    },
    {
        id: 4,
        title: 'Art & Culture Expo',
        date: '12/05/2025',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/w_1920,h_1080,c_fill,q_auto,f_auto/v1763340108/cta-img-7_pln0uu.jpg',
        slug: 'art-culture-expo',
    },
    {
        id: 5,
        title: 'Comedy Night Live',
        date: '10/11/2025',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/w_1920,h_1080,c_fill,q_auto,f_auto/v1763340140/cta-img-8_wxsp5w.jpg',
        slug: 'comedy-night-live'
    },
]

export function FeaturedEvents() {
    const [activeTab, setActiveTab] = useState<'featured' | 'popular' | 'upcoming'>('featured')

    return (
        <section className="py-16 bg-white">
            <div className="wrapper">
                {/* Header with Tabs */}
                <div className="flex items-center gap-6 mb-5">
                    <h2 className="text-2xl md:text-3xl font-bold font-black-han-sans">
                        Featured Events
                    </h2>

                    <div className="flex gap-2">
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
                                activeTab === 'popular'
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Upcoming
                        </button>
                    </div>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.slice(0, 3).map((event) => (
                        <Link
                            key={event.id}
                            href={`/events/${event.slug}`}
                            className="group"
                        >
                            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                                {/* Event image */}
                                <div className="relative h-64 overflow-hidden">
                                    <Image 
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </div>

                                {/* Event info */}
                                <div className="p-5">
                                    <h3 className="text-xl font-bold mb-2 font-sarala group-hover:text-green-600 transition">
                                        {event.title}
                                    </h3>
                                    <p className="text-gray-600 font-sarala">{event.date}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Arrow navigation */}
                <div className="flex justify-end mt-6">
                    <button
                        className="w-12 h-12 rounded-full bg-gray-900 hover:bg-green-600 text-white flex items-center justify-center transition"
                        aria-label="View more events"
                    >
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </section>
    )
}
