'use client'

import { useSession } from "next-auth/react"
import { useState } from "react"
import { AuthModal } from "@/components/auth/AuthModal"

interface ProtectedButtonProps {
    children: React.ReactNode
    onClick?: () => void
    href?: string
    className?: string
    requireAuth?: boolean
}

export function ProtectedButton({
    children,
    onClick,
    href,
    className = '',
    requireAuth = true
}: ProtectedButtonProps) {
    const { data: session, status } = useSession()
    const [showAuthModal, setShowAuthModal] = useState(false)
    const isAuthenticated = status === 'authenticated'

    const handleClick = (e: React.MouseEvent) => {
        if (requireAuth && !isAuthenticated) {
            e.preventDefault()
            setShowAuthModal(true)
            return
        }

        if (onClick) {
            onClick()
        }

        if (href && isAuthenticated) {
            window.location.href = href
        }
    }

    if (href) {
        return (
            <>
                <button onClick={handleClick} className={className}>
                    {children}
                </button>
                <AuthModal 
                    isOpen={showAuthModal}
                    onClose={() => setShowAuthModal(false)}
                />
            </>
        )
    }

    return (
        <>
            <button onClick={handleClick} className={className}>
                {children}
            </button>
            <AuthModal 
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </>
    )
}
