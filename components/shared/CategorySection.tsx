'use client'

import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'
import { AuthModal } from '@/components/auth/AuthModal'


const categories = [
    {
        id: 1,
        name: 'Birthday Bash',
        slug: 'birthday-bash',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/v1763340096/cta-img-1_wu4ebc.jpg',
    },
    {
        id: 2,
        name:'Technology',
        slug: 'technology',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/v1763340064/fe-img1_iny63s.jpg',
    },
    {
        id: 3,
        name: 'Sports',
        slug: 'sports',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/v1763340119/cta-img-3_mfrciy.jpg',
    },
    {
        id: 4,
        name: 'Food and Drinks',
        slug: 'food-and-drinks',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/v1763340123/cta-img-4_smfyt5.jpg',
    },
    {
        id: 5,
        name: 'Carnivals',
        slug: 'carnivals',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/v1763340108/cta-img-7_pln0uu.jpg',
    },
    {
        id: 6,
        name: 'Religious',
        slug: 'religious',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/v1763340116/cta-img-6_tcdxso.jpg',
    },
    {
        id: 7,
        name: 'Music Festivals',
        slug: 'music-festivals',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/v1763340115/cta-img-5_au69nd.jpg',
    },
    {
        id: 8,
        name: 'Comedy',
        slug: 'comedy',
        image: 'https://res.cloudinary.com/dg2et5gsi/image/upload/v1763340140/cta-img-8_wxsp5w.jpg',
    },
]

export function CategorySection() {
    const { status } = useSession()
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const isAuthenticated = status === 'authenticated'

    const handleCategoryClick = (e: React.MouseEvent, slug: string) => {
        if (!isAuthenticated) {
            e.preventDefault()
            setSelectedCategory(slug)
            setShowAuthModal(true)
        }
    }

    return (
        <>
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
                                href={`/categories/${category.slug}`}
                                onClick={(e) => handleCategoryClick(e, category.slug)}
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
                                </div>

                                {/* Category Name */}
                                <p className='mt-2 text-center font-semibold text-gray-800 font-sarala'>
                                    {category.name}
                                </p>
                            </Link>
                        ))}
                    </div>

                    {/* More button */}
                    <div className='text-right mt-6'>
                        <Link
                            href="/categories"
                            onClick={(e) => handleCategoryClick(e, 'all')}
                            className='ext-green-600 font-semibold hover:text-green-700 transition font-sarala'
                        >
                            more...
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
