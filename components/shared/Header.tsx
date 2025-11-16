'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Search, X } from 'lucide-react'

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="bg-black/50 backdrop-blur-md text-white fixed top-0 left-0 z-50 border-b border-black/10 w-full">
            <div className='wrapper flex items-center justify-between py-4'>
                <Link href="/" className='flex items-center gap-2'>
                    <span className='text-2xl font-bold font-montserrat-alt'>Evently</span>
                </Link>

                {/* Desktop Navigation */}
                <div className='hidden md:block flex-1 max-w-md mx-8'>
                    {/* Search Bar */}
                    <div className='relative'>
                        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white' />
                        <input 
                            type="text"
                            placeholder='Search'
                            className='w-full bg-black/40 backdrop-blur-md border  border-white/40 text-white placeholder-white rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
                        />
                    </div>
                </div>

                {/* Desktop Buttons */}
                <div className='hidden md:flex items-center gap-4 flex-shrink-0'>
                    <button className='bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 rounded-full transitiontext-sm hover:text-white transition whitespace-nowrap'> Discover </button>
                    <button className='border border-white hover:bg-white hover:text-black font-semibold px-6 py-2 rounded-full transition whitespace-nowrap'> Sign in </button>
                </div>

                <button
                    className='md:hidden'
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label='Toggle Menu'
                >
                    {isMenuOpen ? (
                        <X className='w-6 h-6' />
                    ) : (
                        <Menu className='w-6 h-6' />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className='md:hidden bg-gray-900 border-t border-gray-800'>
                    <div className='wrapper py-4 flex flex-col gap-4'>
                        {/* Mobile Search */}
                        <div className='relative'>
                            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                            <input 
                                type='text'
                                placeholder='Search'
                                className='w-full bg-gray-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
                            />
                        </div>

                        {/* Mobile Navigation Links */}
                        <button className='bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 rounded-full transitiontext-left py-2 hover:text-green-500 transition'>
                            Discover
                        </button>
                        <button className='border border-white hover:bg-white hover:text-black font-semibold py-2 rounded-full transition text-center'>
                            Sign in
                        </button>
                    </div>
                </div>
            )}
        </header>
    )
}