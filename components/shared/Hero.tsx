import Image from 'next/image'
import { ProtectedButton } from '@/components/shared/ProtectedButton'


export function Hero() {
    return (
        <section className='relative min-h-screen flex items-center overflow-hidden'>
            {/* background Image */}
            <div className='absolute inset-0 z-0'>
                <Image 
                    src='https://res.cloudinary.com/dg2et5gsi/image/upload/v1763342599/man-2179313_1920_jlrusj.jpg'
                    alt=' Musician Performing'
                    fill
                    className='object-cover'
                    priority
                    quality={90}
                />
                {/* Dark Overlay */}
                <div className='absolute inset-0 bg-black/60'></div>
            </div>

            {/* Decorative Blur */}
            <div className='absolute inset-0 z-10 opacity-20'>
                <div className="absolute top-20 right-20 w-64 h-64 bg-green-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
            </div>

            {/* Content */}
            <div className='w-full relative z-20 pt-32 pb-20'>
                <div className='wrapper'>
                    <div className='max-w-3xl'>
                        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 text-white font-black-han-sans'>
                            Find, book and enjoy
                            <br />
                            events you love.
                        </h1>

                        {/* CTA Buttons */}
                        <div className='flex flex-col sm:flex-row gap-4 mb-5'>
                            <ProtectedButton href='/events/create' className='bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 rounded-full transition'> Create Event </ProtectedButton>
                            <ProtectedButton href='/events' requireAuth={false} className='border-2 border-white hover:bg-white text-white hover:text-black font-semibold px-8 py-3 rounded-full transition'> Get tickets now </ProtectedButton>
                        </div>

                        {/* Subtitle */}
                        <p className='text-gray-300 text-lg mb-5 font-sarala'>
                            Your one stop place for all events tickets.
                        </p>

                        {/* Category pill */}
                        <div className='flex flex-wrap gap-4'>
                            <div className='px-6 py-2 border-2 border-green-500 rounded-lg backdrop-blur-sm'>
                                <span className='text-sm text-green-500 font-sarala whitespace-nowrap'>
                                    Birthday Bash
                                </span>
                            </div>

                            <div className='px-6 py-2 border-2 border-green-500 rounded-lg backdrop-blur-sm'>
                                <span className='text-sm text-green-500 font-sarala whitespace-nowrap'>
                                    Music Festivals
                                </span>
                            </div>

                            <div className='px-6 py-2 border-2 border-green-500 rounded-lg backdrop-blur-sm'>
                                <span className='text-sm text-green-500 font-sarala whitespace-nowrap'>
                                    Comedy Shows
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
