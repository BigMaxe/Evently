'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface OrganizerVerificationModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
}

export function OrganizerVerificationModal({
    isOpen,
    onClose,
    onSuccess
}: OrganizerVerificationModalProps) {
    const { data: session, update } = useSession()
    const router = useRouter()
    const [step, setStep] = useState<'phone' | 'otp'>('phone')
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/auth/verify-phone', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, action: 'send' }),
            })

            const data = await response.json()

            if (response.ok) {
                setStep('otp')
            } else {
                setError(data.error || 'Failed to send OTP')
            }
        } catch (error) {
            setError('Failed to send OTP. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/auth/verify-phone', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp, action: 'verify' }),
            })

            const data = await response.json()

            if (response.ok) {
                // Update session
                await update()
                
                if (onSuccess) {
                    onSuccess()
                } else {
                    router.push('/create-event')
                }
                onClose()
            } else {
                setError(data.error || 'Invalid OTP')
            }
        } catch (error) {
            setError('Failed to verify OTP. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Left Side - Form */}
                        <div className="w-full lg:w-1/2 p-8">
                            <div className="mb-6">
                                <h2 className="text-3xl font-bold text-green-600 mb-2 font-black-han-sans">
                                    Organizer Verification.
                                </h2>
                                <p className="text-gray-600 font-sarala">
                                    We care about your safety and privacy.
                                </p>
                            </div>

                            <div className="mb-6">
                                <p className="text-gray-700 font-sarala mb-2">
                                    Hello {session?.user?.name || 'there'},
                                </p>
                                <p className="text-gray-600 font-sarala mb-4">
                                    You're almost done with the setup! To create a successful event, you must first verify your identity.
                                </p>
                                <p className="text-gray-600 font-sarala mb-2">
                                    A validated number is an excellent way to ensure that every aspect of your event is ideal for your attendees.
                                </p>
                                <p className="text-gray-600 font-sarala">
                                    To proceed, please confirm your mobile number:
                                </p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-600 font-sarala">{error}</p>
                                </div>
                            )}

                            {/* Phone Input Step */}
                            {step === 'phone' && (
                                <form onSubmit={handleSendOTP} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2 font-sarala">
                                            Mobile Number
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="Enter Phone Number"
                                                required
                                                disabled={isLoading}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 font-sarala disabled:opacity-50"
                                            />
                                            {phone && (
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                                        <span className="text-white text-xs">✓</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1 font-sarala">
                                            Format: +1234567890 or 1234567890
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading || !phone}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 font-sarala flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Sending OTP...
                                            </>
                                        ) : (
                                            'SUBMIT'
                                        )}
                                    </button>
                                </form>
                            )}

                            {/* OTP Input Step */}
                            {step === 'otp' && (
                                <form onSubmit={handleVerifyOTP} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2 font-sarala">
                                            Enter OTP
                                        </label>
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                            placeholder="Enter 6-digit OTP"
                                            required
                                            disabled={isLoading}
                                            maxLength={6}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 font-sarala text-center text-2xl tracking-widest disabled:opacity-50"
                                        />
                                        <p className="text-xs text-gray-500 mt-1 font-sarala">
                                            Please enter the 6-digit code sent to {phone}
                                        </p>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setStep('phone')}
                                            disabled={isLoading}
                                            className="flex-1 border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg transition disabled:opacity-50 font-sarala"
                                        >
                                            Change Number
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading || otp.length !== 6}
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 font-sarala flex items-center justify-center gap-2"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Verifying...
                                                </>
                                            ) : (
                                                'VERIFY'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Right Side - Image (Hidden on mobile) */}
                        <div className="hidden lg:block lg:w-1/2 relative bg-black">
                            <Image
                                src="https://res.cloudinary.com/dg2et5gsi/image/upload/v1763342599/man-2179313_1920_jlrusj.jpg"
                                alt="Musician performing"
                                fill
                                className="object-cover opacity-70"
                            />
                            <div className="absolute bottom-8 right-8 text-right">
                                <p className="text-white text-sm font-sarala opacity-60">
                                    Activate Windows
                                </p>
                                <p className="text-white text-xs font-sarala opacity-60">
                                    Go to Settings to activate Windows.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
