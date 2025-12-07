'use client'

import React, { useState } from "react"
import { signIn } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Facebook, Apple } from "lucide-react"


type AuthView = 'signin' | 'signup' | 'forgot' | 'unlock'

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
    defaultView?: AuthView
}

export function AuthModal({ isOpen, onClose, defaultView = 'signin' }: AuthModalProps) {
    const [view, setView] = useState<AuthView>(defaultView)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSocialSignIn = async (provider: 'google' | 'facebook' | 'apple') => {
        try {
            setIsLoading(true)
            setError('')
            console.log('Attempting OAuth sign in with:', provider)

            await signIn(provider, {
                callbackUrl: '/',
                redirect: true,
            })
        } catch (error) {
            console.error('Social sign in error:', error)
            setError('Failed to sign in. Please try again.')
            setIsLoading(false)
        }
    }

    const handleCredentialSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        console.log('Attempting credential sign in for:', email)

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                console.error('Sign in error:', result.error)
                setError(result.error)
            } else {
                console.log('Sign in successful!')
                window.location.reload()
            }
        } catch (error) {
            console.error('Sign in error:', error)
            setError('An unexpected error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long')
            return
        }

        setIsLoading(true)
        console.log('Attempting sign up for:', email)

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: fullName,
                    email,
                    password
                }),
            })

            const data = await response.json()

            if(!response.ok) {
                console.error('Sign up error:', data)
                setError(data.error || 'Failed to create account')
                setIsLoading(false)
                return
            }

            console.log('Sign up successful, now signing in...')

            // Auto sign in after successful signup
            const signInResult = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (signInResult?.error) {
                setError('Account created! Please sign in manually.')
                setView('signin')
            } else {
                console.log('Auto sign in successful!')
                window.location.reload()
            }
        } catch (error) {
            console.error('Sign up error:', error)
            setError('An unexpected error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }
    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')


        //implement password reset
        console.log('Forgot password:', email)
        setTimeout(() => {
            setIsLoading(false)
            alert('Password reset link sent to your email')
        }, 1000)
    }

    const handleUnlockAccount = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        // implement account unlock
        console.log('Unlock account:', email)
        setTimeout(() => {
            setIsLoading(false)
            alert('Unlock instructions sent to your email')
        }, 1000)
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-8">
                            {/* Error Message */}
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-600 font-sarala">{error}</p>
                                </div>
                            )}

                            {/* sign in view */}
                            {view === 'signin' && (
                                <div>
                                    <h2 className="text-4xl font-bold text-green-600 mb-2 font-black-han-sans">Sign in</h2>
                                    <p className="text-gray-600 mb-6 font-sarala">Discover a greater experience with Evently.</p>

                                    {/* social sign in */}
                                    <div className="space-y-3 mb-6">
                                        <button
                                            onClick={() => handleSocialSignIn('facebook')}
                                            disabled={isLoading}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
                                        >
                                            <Facebook className="w-5 h-5" />
                                            Continue with Facebook
                                        </button>
                                        <button
                                            onClick={() => handleSocialSignIn('google')}
                                            disabled={isLoading}
                                            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                            </svg>
                                            Continue with Google
                                        </button>
                                        <button
                                            onClick={() => handleSocialSignIn('apple')}
                                            disabled={isLoading}
                                            className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
                                        >
                                            <Apple className="w-5 h-5" />
                                            Continue with Apple
                                        </button>
                                    </div>

                                    {/* divider */}
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-300"></div>
                                        </div>
                                        <div className="relative flex justify-center">
                                            <span className="bg-white px-4 text-gray-500 font-sarala">or</span>
                                        </div>
                                    </div>

                                    {/* email/password form  */}
                                    <form onSubmit={handleCredentialSignIn}>
                                        <input 
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                            required
                                            disabled={isLoading}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500 font-sarala disabled:opacity-50"
                                        />
                                        <div className="flex gap-3 mb-3">
                                            <input 
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Password"
                                                required
                                                disabled={isLoading}
                                                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 font-sarala disabled:opacity-50"
                                            />
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="px-8 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold rounded-lg transition disabled:opacity-50 font-sarala"
                                            >
                                                {isLoading ? 'Signing in...' : 'Sign in'}
                                            </button>
                                        </div>

                                        <label className="flex items-center gap-2 mb-6">
                                            <input 
                                                type="checkbox"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                className="w-4 h-4"
                                            />
                                            <span className="text-sm text-gray-600 font-sarala">Remember Me</span>
                                        </label>
                                    </form>

                                    {/* bottom links */}
                                    <div className="flex justify-center gap-6 text-sm font-sarala">
                                        <button
                                            onClick={() => {
                                                setView('signup')
                                                setError('')
                                            }}
                                            className="text-gray-600 hover:text-black transition"
                                        >
                                            Sign Up
                                        </button>
                                        <button
                                            onClick={() => {
                                                setView('forgot')
                                                setError('')
                                            }}
                                            className="text-gray-600 hover:text-black transition"
                                        >
                                            Forgot Password
                                        </button>
                                        <button
                                            onClick={() => {
                                                setView('unlock')
                                                setError('')
                                            }}
                                            className="text-gray-600 hover:text-black transition"
                                        >
                                            Unlock Account
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* sign up view */}
                            {view === 'signup' && (
                                <div>
                                    <h2 className="text-4xl font-bold text-green-600 mb-2 font-black-han-sans">Sign up</h2>
                                    <p className="text-gray-600 mb-6 font-sarala">Register and start creating a non-forgettable experience.</p>

                                    {/* social sign up */}
                                    <div className="space-y-3 mb-6">
                                        <button
                                            onClick={() => handleSocialSignIn('facebook')}
                                            disabled={isLoading}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
                                        >
                                            <Facebook className="w-5 h-5" />
                                            Continue with Facebook
                                        </button>
                                        <button
                                            onClick={() => handleSocialSignIn('google')}
                                            disabled={isLoading}
                                            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                            </svg>
                                            Continue with Google
                                        </button>
                                        <button
                                            onClick={() => handleSocialSignIn('apple')}
                                            disabled={isLoading}
                                            className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
                                        >
                                            <Apple className="w-5 h-5" />
                                            Continue with Apple
                                        </button>
                                    </div>

                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-300"></div>
                                        </div>
                                        <div className="relative flex justify-center">
                                            <span className="bg-white px-4 text-gray-500 font-sarala">or</span>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSignUp}>
                                        <input 
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="Full Name"
                                            required
                                            disabled={isLoading}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500 font-sarala"
                                        />
                                        <input 
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                            required
                                            disabled={isLoading}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500 font-sarala"
                                        />
                                        <div className="flex gap-3 mb-6">
                                            <input 
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Password"
                                                required
                                                disabled={isLoading}
                                                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 font-sarala"
                                            />
                                            <input 
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="Confirm Password"
                                                required
                                                disabled={isLoading}
                                                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 font-sarala"
                                            />
                                        </div>
                                        
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 rounded-lg transition mb-6 disabled:opacity-50 font-sarala"
                                        >
                                            {isLoading ? 'Signing up...' : 'Sign up'}
                                        </button>
                                    </form>

                                    <div className="flex justify-center gap-6 text-sm font-sarala">
                                        <button onClick={() => { setView('signin'); setError('') }} className="text-gray-600 hover:text-black transition">
                                            Sign in
                                        </button>
                                        <button onClick={() => { setView('forgot'); setError('') }} className="text-gray-600 hover:text-black transition">
                                            Forgot Password
                                        </button>
                                        <button onClick={() => { setView('unlock'); setError('') }} className="text-gray-600 hover:text-black transition">
                                            Unlock Account
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* forgot password view */}
                            {view === 'forgot' && (
                                <div>
                                    <h2 className="text-4xl font-bold text-green-600 mb-2 font-black-han-sans">Forgot Password</h2>
                                    <p className="text-gray-600 mb-6 font-sarala">Enter your email to begin password reset.</p>

                                    <form onSubmit={handleForgotPassword}>
                                        <input 
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                            required
                                            disabled={isLoading}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 font-sarala disabled:opacity-50"
                                        />

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition mb-6 disabled:opacity-50 font-sarala"
                                        >
                                            {isLoading ? 'Sending...' : 'RESET PASSWORD'}
                                        </button>
                                    </form>

                                    <div className="flex justify-center gap-6 text-sm font-sarala">
                                        <button onClick={() => { setView('signin'); setError('') }} className="text-gray-600 hover:text-black transition">
                                            Sign in
                                        </button>
                                        <button onClick={() => { setView('signup'); setError('') }} className="text-gray-600 hover:text-black transition">
                                            Sign Up
                                        </button>
                                        <button onClick={() => {setView('unlock'); setError('') }} className="text-gray-600 hover:text-black transition">
                                            Unlock Account
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* unlock account view */}
                            {view === 'unlock' && (
                                <div>
                                    <h2 className="text-4xl font-bold text-green-600 mb-2 font-black-han-sans">Unlock Account</h2>
                                    <p className="text-gray-600 mb-6 font-sarala">Request account unlock instructions by specifying your account email below.</p>

                                    <form onSubmit={handleUnlockAccount}>
                                        <input 
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                            required
                                            disabled={isLoading}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 font-sarala"
                                        />

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-green-100 hover:bg-green-200 text-green-700 font-semibold py-3 rounded-lg transition mb-6 disabled:opacity-50 font-sarala"
                                        >
                                            {isLoading ? 'Sending...' : 'REQUEST UNLOCK INSTRUCTIONS'}
                                        </button>
                                    </form>

                                    <div className="flex justify-center gap-6 text-sm font-sarala">
                                        <button onClick={() => { setView('signin'); setError('') }} className="text-gray-600 hover:text-black transition">
                                            Sign in
                                        </button>
                                        <button onClick={() => { setView('forgot'); setError('') }} className="text-gray-600 hover:text-black transition">
                                            Forgot Password
                                        </button>
                                        <button onClick={() => { setView('signup'); setError('') }} className="text-gray-600 hover:text-black transition">
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
