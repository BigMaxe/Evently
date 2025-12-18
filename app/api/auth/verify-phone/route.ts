import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { generateOTP, sendOTP, formatPhoneNumber } from "@/lib/sms"

// Send OTP to phone
export async function POST(request: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { phone, action } = await request.json()

        // Action can be 'send' or 'verify'
        if (action === 'send') {
            if (!phone) {
                return NextResponse.json(
                    { error: 'Phone number is required' },
                    { status: 400 }
                )
            }

            // Format phone number
            const formattedPhone = formatPhoneNumber(phone)

            // Check if phone is already used
            const existingUser = await prisma.user.findFirst({
                where: {
                    phone: formattedPhone,
                    phoneVerified: true,
                    NOT: {
                        email: session.user.email
                    }
                }
            })

            if (existingUser) {
                return NextResponse.json(
                    { error: 'This phone number is already verified by another account' },
                    { status: 400 }
                )
            }

            // Generate OTP
            const otp = generateOTP()
            const otpExpiry = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

            // Update user with phone and OTP
            await prisma.user.update({
                where: { email: session.user.email },
                data: {
                    phone: formattedPhone,
                    phoneVerificationToken: otp,
                    phoneVerificationExpiry: otpExpiry,
                }
            })

            // Send OTP via SMS
            const smsResult = await sendOTP(formattedPhone, otp)

            if (!smsResult.success) {
                return NextResponse.json(
                    { error: 'Failed to send OTP. Please try again.' },
                    { status: 500 }
                )
            }

            return NextResponse.json({
                message: 'OTP sent successfully!',
                success: true,
            }, { status: 200 })
        }

        // Verify OTP
        if (action === 'verify') {
            const { otp } = await request.json()

            if (!otp) {
                return NextResponse.json(
                    { error: 'OTP is required' },
                    { status: 400 }
                )
            }

            const user = await prisma.user.findUnique({
                where: { email: session.user.email }
            })

            if (!user) {
                return NextResponse.json(
                    { error: 'User not found' },
                    { status: 404 }
                )
            }

            // Check if OTP matches
            if (user.phoneVerificationToken !== otp) {
                return NextResponse.json(
                    { error: 'Invalid OTP' },
                    { status: 400 }
                )
            }

            // Check if OTP is expired
            if (user.phoneVerificationExpiry && user.phoneVerificationExpiry < new Date()) {
                return NextResponse.json(
                    { error: 'OTP has expired. Please request a new one.' },
                    { status: 400 }
                )
            }

            // Update user - verify phone and upgrade to ORGANIZER
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    phoneVerified: true,
                    phoneVerificationToken: null,
                    phoneVerificationExpiry: null,
                    role: 'ORGANIZER', // Upgrade to organizer role
                }
            })

            return NextResponse.json({
                message: 'Phone verified successfully! You are now an organizer.',
                success: true,
                role: 'ORGANIZER',
            }, { status: 200 })
        }

        return NextResponse.json(
            { error: 'Invalid action' },
            { status: 400 }
        )
    } catch (error) {
        console.error('Phone verification error:', error)
        return NextResponse.json(
            { error: 'Failed to process phone verification' },
            { status: 500 }
        )
    }
}