import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json()

        if (!token) {
            return NextResponse.json(
                { error: 'Verification token is required' },
                { status: 400 }
            )
        }

        // Find user with this token
        const user = await prisma.user.findUnique({
            where: { emailVerificationToken: token }
        })

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid verification token' },
                { status: 400 }
            )
        }

        // Check if token is expired
        if (user.emailVerificationExpiry && user.emailVerificationExpiry < new Date()) {
            return NextResponse.json(
                { error: 'Verification token has expired. Please request a new one.' },
                { status: 400 }
            )
        }

        // Update user - mark email as verified
        await prisma.user.update({
            where: { id: user.id },
            data: {
                emailVerified: new Date(),
                emailVerificationToken: null,
                emailVerificationExpiry: null,
            }
        })

        return NextResponse.json({
            message: 'Email verified successfully!',
            success: true,
        }, { status: 200 })
    } catch (error) {
        console.error('Email verification error:', error)
        return NextResponse.json(
            { error: 'Failed to verify email' },
            { status: 500 }
        )
    }
}

// Resend verification email
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const email = searchParams.get('email')

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            )
        }

        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        if (user.emailVerified) {
            return NextResponse.json(
                { error: 'Email is already verified' },
                { status: 400 }
            )
        }

        // Generate new token
        const { randomBytes } = await import('crypto')
        const newToken = randomBytes(32).toString('hex')
        const newExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000)

        await prisma.user.update({
            where: { id: user.id },
            data: {
                emailVerificationToken: newToken,
                emailVerificationExpiry: newExpiry,
            }
        })

        // Send email
        const { sendVerificationEmail } = await import('@/lib/email')
        await sendVerificationEmail(email, newToken)

        return NextResponse.json({
            message: 'Verification email sent!',
            success: true,
        }, { status: 200 })
    } catch (error) {
        console.error('Resend verification error:', error)
        return NextResponse.json(
            { error: 'Failed to resend verification email' },
            { status: 500 }
        )
    }
}