'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, Search, X, LogOut, User } from 'lucide-react'
import { AuthModal } from '@/components/auth/AuthModal'

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [showAuthModal, setShowAuthModal] = useState(false)
    const { data: session, status } = useSession()
    const isAuthenticated = status === 'authenticated'

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' })
    }

    return (
        <>
            <header className="bg-black/50 backdrop-blur-md text-white fixed top-0 left-0 z-50 border-b border-black/10 w-full">
                <div className='wrapper flex items-center justify-between py-4'>
                    <Link href="/events" className='flex items-center gap-2'>
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
                        <Link href="/events" className='bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 rounded-full transitiontext-sm hover:text-white transition whitespace-nowrap'> Discover </Link>
                        
                        {isAuthenticated ? (
                            <>
                                <Link
                                    href="/profile"
                                    className='flex items-center gap-2 hover:text-green-500 transition'
                                >
                                    {session?.user?.image ? (
                                        <Image 
                                            src={session.user.image}
                                            alt={session.user.name || 'User'}
                                            width={32}
                                            height={32}
                                            className='rounded-full'
                                        />
                                    ) : (
                                        <User className='w-8 h-8 p-1 bg-gray-700 rounded-full' />
                                    )}
                                    <span className='text-sm font-semibold'>{session?.user?.name}</span>
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className='border border-red-500 hover:bg-red-500 text-red-500 hover:text-white font-semibold px-4 py-2 rounded-full transition whitespace-nowrap flex items-center gap-2'
                                >
                                    <LogOut className='w-4 h-4' />
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setShowAuthModal(true)}
                                className='border border-white hover:bg-white hover:text-black font-semibold px-6 py-2 rounded-full transition whitespace-nowrap'
                            >
                                Sign in
                            </button>
                        )}
                    </div>

                    {/* mobile menu button */}
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
                            <Link href="/events" className='bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 rounded-full transitiontext-left py-3 hover:text-green-500 transition'>
                                Discover
                            </Link>
                            
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        href="/profile"
                                        className='text-left py-2 hover:text-green-500 transition flex items-center gap-2'
                                    >
                                        <User className='w-5 h-5' />
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className='border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold py-2 rounded-full transition text-center flex items-center justify-center gap-2'
                                    >
                                        <LogOut className='w-4 h-4' />
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setShowAuthModal(true)}
                                    className='border border-white hover:bg-white hover:text-black font-semibold py-2 rounded-full transition text-center'
                                >
                                    Sign in
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* Auth modal */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </>
    )
}