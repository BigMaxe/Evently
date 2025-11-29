'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Menu, Search, X, User, LogOut } from 'lucide-react'

export function EventsPageHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    
    const pathname = usePathname()
    const { data: session, status } = useSession()
    const isAuthenticated = status === 'authenticated'

    // Handle scroll behavior
    useEffect(() => {
        let ticking = false

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY

                    // Update scrolled state (for background)
                    setIsScrolled(currentScrollY > 10)

                    // Show/hide header based on scroll direction
                    if (currentScrollY > lastScrollY && currentScrollY > 100) {
                        // Scrolling down & past 100px
                        setIsVisible(false)
                    } else {
                        // Scrolling up
                        setIsVisible(true)
                    }

                    setLastScrollY(currentScrollY)
                    ticking = false
                })

                ticking = true
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [lastScrollY])

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' })
    }

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isVisible ? 'translate-y-0' : '-translate-y-full'
            } ${
                isScrolled 
                    ? 'bg-gray-900/95 backdrop-blur-sm shadow-md' 
                    : 'bg-gray-900 shadow-sm'
            }`}
        >
            <nav className="wrapper py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-2xl text-white hover:text-green-700 font-bold font-montserrat-alt">
                        Evently
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className='relative w-100'>
                            <Search className='absolute left-3 top-1/2 -translate-y-1/2  w-4 h-4 text-green-500 pointer-events-none' />
                            <input 
                                type="text"
                                placeholder='Search'
                                className='w-full bg-gray-900/40 backdrop-blur-md border  border-white/40 text-white placeholder-white rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
                            />
                        </div>

                        <Link
                            href="/"
                            className={`font-semibold transition font-sarala ${
                                pathname === '/' 
                                    ? 'text-green-600' 
                                    : 'text-white hover:text-green-600'
                            }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/events"
                            className={`font-semibold transition font-sarala ${
                                pathname === '/events' 
                                    ? 'text-green-600' 
                                    : 'text-gray-700 hover:text-green-600'
                            }`}
                        >
                            Discover
                        </Link>
                        {isAuthenticated && (
                            <Link
                                href="/my-events"
                                className={`font-semibold transition font-sarala ${
                                    pathname === '/my-events' 
                                        ? 'text-green-600' 
                                        : 'text-gray-700 hover:text-green-600'
                                }`}
                            >
                                My Events
                            </Link>
                        )}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    href="/create-event"
                                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg transition font-sarala"
                                >
                                    Create Event
                                </Link>
                                
                                {/* User Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition"
                                    >
                                        <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center">
                                            {session?.user?.name?.[0]?.toUpperCase() || <User className="w-5 h-5" />}
                                        </div>
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isDropdownOpen && (
                                        <>
                                            <div 
                                                className="fixed inset-0 z-10"
                                                onClick={() => setIsDropdownOpen(false)}
                                            />
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border z-20">
                                                <div className="px-4 py-2 border-b">
                                                    <p className="font-semibold text-sm font-sarala">
                                                        {session?.user?.name || 'User'}
                                                    </p>
                                                    <p className="text-xs text-gray-500 font-sarala">
                                                        {session?.user?.email}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={handleSignOut}
                                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition flex items-center gap-2 font-sarala"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    Sign Out
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>
                        ) : (
                            <Link
                                href="/signin"
                                className="bg-gray-900 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg transition font-sarala"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 space-y-4">
                        <Link
                            href="/"
                            className="block font-semibold text-gray-700 hover:text-green-600 transition font-sarala"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/events"
                            className="block font-semibold text-gray-700 hover:text-green-600 transition font-sarala"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Discover
                        </Link>
                        {isAuthenticated && (
                            <Link
                                href="/my-events"
                                className="block font-semibold text-gray-700 hover:text-green-600 transition font-sarala"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                My Events
                            </Link>
                        )}
                        
                        <div className="pt-4 space-y-2">
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        href="/create-event"
                                        className="block w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg transition text-center font-sarala"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Create Event
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleSignOut()
                                            setIsMenuOpen(false)
                                        }}
                                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold px-6 py-2 rounded-lg transition font-sarala"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/signin"
                                    className="block w-full bg-gray-900 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg transition text-center font-sarala"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}