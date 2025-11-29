'use client'

import Image from 'next/image'
// import { useSession } from 'next-auth/react'
// import { useState } from 'react'
import Link from 'next/link'
// import { AuthModal } from '@/components/auth/AuthModal'


const categories = [
    {
        id: 1,
        name: 'Birthday Bash',
        displayName: 'Birthday Bash',
        slug: 'birthday-bash',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/v1763340096/cta-img-1_wu4ebc.jpg',
    },
    {
        id: 2,
        name:'Technology',
        displayName: 'Technology',
        slug: 'technology',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/v1763340064/fe-img1_iny63s.jpg',
    },
    {
        id: 3,
        name: 'Sports',
        displayName: 'Sports',
        slug: 'sports',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/v1763340119/cta-img-3_mfrciy.jpg',
    },
    {
        id: 4,
        name: 'Food and Drinks',
        displayName: 'Food & Drinks',
        slug: 'food-and-drinks',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/v1763340123/cta-img-4_smfyt5.jpg',
    },
    {
        id: 5,
        name: 'Carnivals',
        displayName: 'Carnivals',
        slug: 'carnivals',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/v1763340108/cta-img-7_pln0uu.jpg',
    },
    {
        id: 6,
        name: 'Religious',
        displayName: 'Religious',
        slug: 'religious',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/v1763340116/cta-img-6_tcdxso.jpg',
    },
    {
        id: 7,
        name: 'Entertainment',
        displayName: 'Entertainment',
        slug: 'entertainment',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/v1763340115/cta-img-5_au69nd.jpg',
    },
    {
        id: 8,
        name: 'Comedy',
        displayName: 'Comedy',
        slug: 'comedy',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/v1763340140/cta-img-8_wxsp5w.jpg',
    },
    {
        id: 9,
        name: 'Business',
        displayName: 'Business',
        slug: 'business',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/v1763340116/cta-img-6_tcdxso.jpg',
    },
    {
        id: 10,
        name: 'Fashion',
        displayName: 'Fashion Shows',
        slug: 'fashion',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/v1763340116/cta-img-6_tcdxso.jpg',
    },
    {
        id: 11,
        name: 'Gala',
        displayName: 'Gala Events',
        slug: 'gala',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/v1763340116/cta-img-6_tcdxso.jpg',
    },
    {
        id: 12,
        name: 'Art',
        displayName: 'Art & Culture',
        slug: 'art',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/v1763340116/cta-img-6_tcdxso.jpg',
    },
    {
        id: 13,
        name: 'Music',
        displayName: 'Music Festivals',
        slug: 'music-festivals',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/v1763340116/cta-img-6_tcdxso.jpg',
    },
]

export function CategorySection() {
    // const { status } = useSession()
    // const [showAuthModal, setShowAuthModal] = useState(false)
    // const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    // const isAuthenticated = status === 'authenticated'

    // const handleCategoryClick = (e: React.MouseEvent, slug: string) => {
    //     if (!isAuthenticated) {
    //         e.preventDefault()
    //         setSelectedCategory(slug)
    //         setShowAuthModal(true)
    //     }
    // }

    return (
        <section className='bg-gray-100 py-16'>
            <div className='wrapper'>
                <h2 className='text-3xl md:text-4xl font-bold mb-8 font-black-han-sans'>
                    Explore Events by Category
                </h2>

                {/* category grid */}
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6'>
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/events?categories=${encodeURIComponent(category.name)}`}
                            // onClick={(e) => handleCategoryClick(e, category.slug)}
                            className='group'
                        >
                            <div className='relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:scale-105'>
                                <Image 
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className='object-cover'
                                    sizes='(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw'
                                />
                                {/* Overlay */}
                                <div className='absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300'></div>

                                {/* Category Name */}
                                <div className='absolute inset-0 flex items-center justify-center'>
                                    <h3 className='text-white font-bold text-lg text-center px-4 font-sarala drop-shadow-lg'>
                                        {category.displayName}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* More button */}
                <div className='text-right mt-8'>
                    <Link
                        href="/categories"
                        // onClick={(e) => handleCategoryClick(e, 'all')}
                        className='inline-block bg-gray-900 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg transition font-sarala'
                    >
                        more...
                    </Link>
                </div>
            </div>
        </section>

        // <AuthModal 
        //     isOpen={showAuthModal}
        //     onClose={() => setShowAuthModal(false)}
        // />
        
    )
}
