'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
    Calendar, 
    Mail, 
    Phone, 
    MapPin, 
    Facebook, 
    Twitter, 
    Instagram, 
    Linkedin,
    Youtube,
    Send,
    ArrowUp
} from 'lucide-react'
// import { section } from 'framer-motion/client'

export function Footer() {
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // simulate API Call
        setTimeout(() => {
            console.log('Newsletter Signup:', email)
            setEmail('')
            setIsSubmitting(false)
        }, 1000)
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const footerSections = [
        {
            title: 'Company',
            links: [
                { name: 'About Us', href: '/about' },
                { name: 'How It Works', href: '/how-it-works' },
                { name: 'Careers', href: '/careers' },
                { name: 'Press', href: '/press' },
                { name: 'Blog', href: '/blog' },
            ]
        },
        {
            title: 'For Organizers',
            links: [
                { name: 'Create Event', href: '/events/create' },
                { name: 'Pricing', href: '/pricing' },
                { name: 'Resources', href: '/resources' },
                { name: 'Guide', href: '/guide' },
                { name: 'Advertise', href: '/advertise' },
            ]
        },
        {
            title: 'Discover',
            links: [
                { name: 'All Events', href: '/events' },
                { name: 'Categories', href: '/categories' },
                { name: 'Featured Events', href: '/events?filter=featured' },
                { name: 'Popular Events', href: '/events?filter=popular' },
                { name: 'This Weekend', href: '/events?filter=weekend' },
            ]
        },
        {
            title: 'Support',
            links: [
                { name: 'Help Center', href: '/help' },
                { name: 'Contact Us', href: '/contact' },
                { name: 'FAQs', href: '/faqs' },
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Privacy Policy', href: '/privacy' },
            ]
        }
    ]

    const socialLinks = [
        { name: 'Facebook', icon: Facebook, href: 'https://facebook.com', color: 'hover:bg-blue-600' },
        { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', color: 'hover:bg-sky-500' },
        { name: 'Instagram', icon: Instagram, href: 'https://instagram.com', color: 'hover:bg-pink-600' },
        { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com', color: 'hover:bg-blue-700' },
        { name: 'YouTube', icon: Youtube, href: 'https://youtube.com', color: 'hover:bg-red-600' },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVaraints = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <footer className='bg-gradient-to-b from-gray-900 to-black text-white'>
            {/* main footer content */}
            <div className='wrapper pt-16 pb-8'>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-6'
                >
                    {/* brand section - takes 2 columns */}
                    <motion.div variants={itemVaraints} className='lg:col-span-2'>
                        <Link href="/" className='flex items-center gap-2 mb-4'>
                            <Calendar className='w-8 h-8 text-green-500' />
                            <span className='text-2xl font-bold font-montserrat-alt'>Evently</span>
                        </Link>
                        <p className='text-gray-400 mb-6 font-sarala leading-relaxed'>
                            Your one-stop platform for discovering and managing amazing events. 
                            Connect with experiences that matter.
                        </p>

                        {/* contact info */}
                        <div className='space-y-3'>
                            <div className='flex items-center gap-3 text-gray-400 hover:text-green-500 transition'>
                                <Mail className='w-5 h-5 flex-shrink-0' />
                                <a href="mailto:hello@evently.com" className='font-sarala text-sm'>
                                    hello@evently.com
                                </a>
                            </div>
                            <div className='flex items-center gap-3 text-gray-400 hover:text-green-500 transition'>
                                <Phone className='w-5 h-5 flex-shrink-0' />
                                <a href="tel: +2347011546916" className='font-sarala text-sm'>
                                    +234 701 154 6916
                                </a>
                            </div>
                            <div className='flex items-start gap-3 text-gray-400'>
                                <MapPin className='w-5 h-5 flex-shrink-0 mt-0.5' />
                                <p className='font-sarala text-sm'>
                                    123 Event Street, Victoria Island<br />
                                    Lagos, Nigeria
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* footer links sections */}
                    {footerSections.map((section, index) => (
                        <motion.div key={section.title} variants={itemVaraints}>
                            <h3 className='font-bold text-lg mb-4 font-black-han-sans text-green-500'>
                                {section.title}
                            </h3>
                            <ul className='space-y-2'>
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className='text-gray-400 hover:text-white transition font-sarala text-sm inline-block hover:translate-x-1 duration-200'
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                {/* newsletter section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className='mt-12 pt-12 border-t border-gray-800'
                >
                    <div className='max-w-2xl mx-auto text-center'>
                        <h3 className='text-2xl font-bold mb-3 font-black-han-sans'>
                            Stay Updated
                        </h3>
                        <p className='text-gray-400 mb-6 font-sarala'>
                            Subscribe to our newsletter for the latest events, exclusive offers, and updates.
                        </p>

                        <form onSubmit={handleNewsletterSubmit} className='flex flex-col sm:flex-row gap-3 max-w-md mx-auto'>
                            <input 
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter your email'
                                required
                                className='flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 text-white placeholder-gray-500 font-sarala'
                            />
                            <motion.button
                                type='submit'
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className='px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed font-sarala'
                            >
                                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                                <Send className='w-4 h-4' />
                            </motion.button>
                        </form>
                    </div>
                </motion.div>

                {/* social links & copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className='mt-12 pt-8 border-t border-gray-800'
                >
                    <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
                        {/* social media icons */}
                        <div className='flex items-center gap-4'>
                            {socialLinks.map((social) => {
                                const Icon = social.icon
                                return (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                        className={`w-10 h-10 rounded-full bg-gray-800 ${social.color} flex items-center justify-center transition-all duration-300`}
                                        aria-label={social.name}
                                    >
                                        <Icon className='w-5 h-5' />
                                    </motion.a>
                                )
                            })}
                        </div>

                        {/* copyright */}
                        <p className='text-gray-500 text-sm font-sarala'>
                            © {new Date().getFullYear()} Evently. All rights reserved.
                        </p>

                        {/* back to top button */}
                        <motion.button
                            onClick={scrollToTop}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className='w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-all duration-300 shadow-lg'
                            aria-label='Back to top'
                        >
                            <ArrowUp className='w-5 h-5' />
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* bottom bar */}
            <div className='bg-black py-4'>
                <div className='wrapper'>
                    <div className='flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-500 text-xs font-sarala'>
                        <Link href='/terms' className='hover:text-green-500 transition'>
                            Terms of Services
                        </Link>
                        <span className='hidden sm:inline'>.</span>
                        <Link href='/privacy' className='hover:text-green-500 transition'>
                            Privacy Policy
                        </Link>
                        <span className='hidden sm:inline'>.</span>
                        <Link href='/cookies' className='hover:text-green-500 transition'>
                            Cookie Policy
                        </Link>
                        <span className='hidden sm:inline'>.</span>
                        <Link href='/accessibility' className='hover:text-green-500 transition'>
                            Accessibility
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
