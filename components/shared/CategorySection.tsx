import Image from 'next/image'
import Link from 'next/link'

import birthdayBash from '@/public/images/cta-img-1.jpg'
import technology from '@/public/images/cta-img-2.jpg'
import sports from '@/public/images/cta-img-3.jpg'
import foodDrinks from '@/public/images/cta-img-4.jpg'
import carnivals from '@/public/images/cta-img-5.jpg'
import religious from '@/public/images/cta-img-6.jpg'
import musicFestivals from '@/public/images/cta-img-7.jpg'
import comedy from '@/public/images/cta-img-8.jpg'

const categories = [
    {
        id: 1,
        name: 'Birthday Bash',
        slug: 'birthday-bash',
        image: birthdayBash,
    },
    {
        id: 2,
        name:'Technology',
        slug: 'technology',
        image: technology,
    },
    {
        id: 3,
        name: 'Sports',
        slug: 'sports',
        image: sports,
    },
    {
        id: 4,
        name: 'Food and Drinks',
        slug: 'food-and-drinks',
        image: foodDrinks,
    },
    {
        id: 5,
        name: 'Carnivals',
        slug: 'carnivals',
        image: carnivals,
    },
    {
        id: 6,
        name: 'Religious',
        slug: 'religious',
        image: religious,
    },
    {
        id: 7,
        name: 'Music Festivals',
        slug: 'music-festivals',
        image: musicFestivals,
    },
    {
        id: 8,
        name: 'Comedy',
        slug: 'comedy',
        image: comedy,
    },
]

export function CatergorySection() {
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
                            href={`/categories/${category.slug}`}
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
                        className='ext-green-600 font-semibold hover:text-green-700 transition font-sarala'
                    >
                        more...
                    </Link>
                </div>
            </div>
        </section>
    )
}
