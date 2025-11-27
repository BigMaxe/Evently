'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { AuthModal } from '@/components/auth/AuthModal'

export function CTASection() {
    const containerRef = useRef<HTMLElement>(null)
    const isInView = useInView(containerRef, { once: false, amount: 0.3 })
    const [showAuthModal, setShowAuthModal] = useState(false)
    const { status } = useSession()
    const isAuthenticated = status === 'authenticated'

    // Parallax effect
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, -100])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5])
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

    const handleGetStarted = () => {
        if (!isAuthenticated) {
            setShowAuthModal(true)
        } else {
            window.location.href = '/events/create'
        }
    }

    return (
        <>
            <motion.section
                ref={containerRef}
                style={{ opacity, scale }}
                className='relative py-20 md:py-32 overflow-hidden'
            >
                {/* background image with parallax */}
                <motion.div
                    style={{ y }}
                    className='absolute inset-0 z-0'
                >
                    <Image 
                        src='https://res.cloudinary.com/dg2et5gsi/image/upload/v1763340295/fe-img4_gmuaxk.jpg'
                        alt='Create and manage events'
                        fill
                        className='object-cover'
                        quality={90}
                        priority={false}
                    />

                    {/* dark overlay with gradient */}
                    <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70'></div>
                </motion.div>

                {/* animated particles/dots */}
                <div className='absolute inset-0 z-10 opacity-30'>
                    <motion.div 
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 100, 360]
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className='absolute top-10 right-10 w-32 h-32 bg-green-500 rounded-full blur-3xl'
                    />
                    <motion.div 
                        animate={{
                            scale: [1, 1.3, 1],
                            rotate: [360, 180, 0]
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className='absolute bottom-10 left-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl'
                    />
                </div>

                {/* content */}
                <div className='wrapper relative z-20'>
                    <div className='max-w-4xl mx-auto text-center'>
                        {/* heading with staggered animation */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate= {isInView ? { opacity: 1, y:0 } : { opacity: 0, y:50 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-black-han-sans leading-tight'>
                                Create and manage your own events
                            </h2>
                        </motion.div>

                        {/* subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity:1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className='text-lg md:text-xl text-gray-200 mb-10 font-sarala max-w-2xl mx-auto'
                        >
                            Reach a wider audience and streamline your event management with our powerful platform
                        </motion.p>

                        {/* CTA button with hover effects */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                        >
                            
                            <motion.button
                                onClick={handleGetStarted}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 0 30px rgba(34, 197, 94, 0.5)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                className='relative group bg-green-500 hover:bg-green-600 text-white font-bold px-10 py-4 rounded-full text-lg transition-all duration-300 font-sarala overflow-hidden'
                            >
                                {/* button shine effect */}
                                <motion.span 
                                    className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent'
                                    animate={{
                                        x: ["-200%", "200%"]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatDelay: 1
                                    }}
                                />
                                <span className='relative z-10'>Get Started</span>
                            </motion.button>
                            
                        </motion.div>

                        {/* floating elements for visual interest */}
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className='absolute top-1/4 left-10 hidden lg:block'
                        >
                            <div className='w-3 h-3 bg-green-500 rounded-full opacity-60'></div>
                        </motion.div>

                        <motion.div
                            animate={{
                                y: [0, 20, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1
                            }}
                            className='absolute top-1/3 right-20 hidden lg:block'
                        >
                            <div className="w-4 h-4 bg-purple-500 rounded-full opacity-40"></div>
                        </motion.div>

                        <motion.div
                            animate={{
                                y: [0, -15, 0],
                            }}
                            transition={{
                                duration: 3.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5
                            }}
                            className='absolute bottom-1/4 right-10 hidden lg:block'
                        >
                            <div className="w-2 h-2 bg-green-400 rounded-full opacity-70"></div>
                        </motion.div>
                    </div>
                </div>

                {/* bottom fade effect */}
                <div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10'></div>
            </motion.section>

            <AuthModal 
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </>
    )
}
