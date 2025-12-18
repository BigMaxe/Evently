'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { OrganizerVerificationModal } from '@/components/auth/OrganizerVerificationModal'
import { Loader2 } from 'lucide-react'

export default function CreateEventPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [showVerificationModal, setShowVerificationModal] = useState(false)
    const [userRole, setUserRole] = useState<string | null>(null)
    const [isChecking, setIsChecking] = useState(true)

    useEffect(() => {
        if (status === 'loading') return

        if (status === 'unauthenticated') {
            router.push('/')
            return
        }

        if (status === 'authenticated' && session?.user?.email) {
            checkUserRole()
        }
    }, [status, session])

    const checkUserRole = async () => {
        try {
            const response = await fetch('/api/auth/check-role')
            const data = await response.json()

            setUserRole(data.role)

            // If user is not an organizer and hasn't verified phone, show modal
            if (data.role !== 'ORGANIZER' && data.role !== 'ADMIN') {
                setShowVerificationModal(true)
            }
        } catch (error) {
            console.error('Failed to check user role:', error)
        } finally {
            setIsChecking(false)
        }
    }

    const handleVerificationSuccess = () => {
        setUserRole('ORGANIZER')
        setShowVerificationModal(false)
    }

    if (status === 'loading' || isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-green-500" />
            </div>
        )
    }

    // Don't show create event form until verified
    if (userRole !== 'ORGANIZER' && userRole !== 'ADMIN') {
        return (
            <>
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4 font-black-han-sans">
                            Verification Required
                        </h1>
                        <p className="text-gray-600 font-sarala">
                            Please complete verification to create events.
                        </p>
                    </div>
                </div>

                <OrganizerVerificationModal
                    isOpen={showVerificationModal}
                    onClose={() => router.push('/')}
                    onSuccess={handleVerificationSuccess}
                />
            </>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="wrapper">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 font-black-han-sans">
                    Create Event
                </h1>
                
                {/* Your event creation form goes here */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <p className="text-gray-600 font-sarala">
                        Event creation form will go here...
                    </p>
                </div>
            </div>
        </div>
    )
}
