'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react'
import Link from 'next/link'

export default function VerifyEmailPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [message, setMessage] = useState('')
    const [resendLoading, setResendLoading] = useState(false)
    const [email, setEmail] = useState('')

    useEffect(() => {
        const token = searchParams.get('token')

        if (!token) {
            setStatus('error')
            setMessage('Invalid verification link')
            return
        }

        verifyEmail(token)
    }, [searchParams])

    const verifyEmail = async (token: string) => {
        try {
            const response = await fetch('/api/auth/verify-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
            })

            const data = await response.json()

            if (response.ok) {
                setStatus('success')
                setMessage(data.message)
                setTimeout(() => {
                    router.push('/')
                }, 3000)
            } else {
                setStatus('error')
                setMessage(data.error)
            }
        } catch (error) {
            setStatus('error')
            setMessage('Failed to verify email. Please try again.')
        }
    }

    const handleResendEmail = async () => {
        if (!email) {
            alert('Please enter your email address')
            return
        }

        setResendLoading(true)

        try {
            const response = await fetch(`/api/auth/verify-email?email=${encodeURIComponent(email)}`)
            const data = await response.json()

            if (response.ok) {
                alert('Verification email sent! Please check your inbox.')
            } else {
                alert(data.error || 'Failed to send email')
            }
        } catch (error) {
            alert('Failed to send email. Please try again.')
        } finally {
            setResendLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
            >
                <div className="text-center">
                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className="mb-6 flex justify-center"
                    >
                        {status === 'loading' && (
                            <Loader2 className="w-16 h-16 text-green-500 animate-spin" />
                        )}
                        {status === 'success' && (
                            <CheckCircle className="w-16 h-16 text-green-500" />
                        )}
                        {status === 'error' && (
                            <XCircle className="w-16 h-16 text-red-500" />
                        )}
                    </motion.div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 font-black-han-sans">
                        {status === 'loading' && 'Verifying Email...'}
                        {status === 'success' && 'Email Verified!'}
                        {status === 'error' && 'Verification Failed'}
                    </h1>

                    {/* Message */}
                    <p className="text-gray-600 mb-6 font-sarala">
                        {message}
                    </p>

                    {/* Actions */}
                    {status === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <p className="text-sm text-gray-500 mb-4 font-sarala">
                                Redirecting you to the homepage...
                            </p>
                            <Link
                                href="/"
                                className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition font-sarala"
                            >
                                Go to Homepage
                            </Link>
                        </motion.div>
                    )}

                    {status === 'error' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 font-sarala"
                                />
                                <button
                                    onClick={handleResendEmail}
                                    disabled={resendLoading}
                                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition font-sarala disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {resendLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Mail className="w-4 h-4" />
                                            Resend Verification Email
                                        </>
                                    )}
                                </button>
                            </div>

                            <Link
                                href="/"
                                className="inline-block text-gray-600 hover:text-green-600 transition font-sarala"
                            >
                                Back to Homepage
                            </Link>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    )
}
