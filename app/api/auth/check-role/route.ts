import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
    try {
        const session = await auth()

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                emailVerified: true,
                phoneVerified: true,
            }
        })

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            role: user.role,
            emailVerified: !!user.emailVerified,
            phoneVerified: user.phoneVerified,
        }, { status: 200 })
    } catch (error) {
        console.error('Check role error:', error)
        return NextResponse.json(
            { error: 'Failed to check user role' },
            { status: 500 }
        )
    }
}
