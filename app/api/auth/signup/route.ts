import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json()

        console.log('Sign up attempt for:', email)

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and Password are required' },
                { status: 400 }
            )
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters' },
                { status: 400 }
            )
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                name: name || email.split('@')[0],
                email,
                password: hashedPassword,
                role: 'USER',
            }
        })

        console.log('User created successfully:', user.email)

        return NextResponse.json({
            message: 'User created successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        }, { status: 201 })
    } catch (error) {
        console.error('Sign up error details:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack: undefined,
            error
        })

        if (error instanceof Error) {
            if (error.message.includes('Unique constraint')) {
                return NextResponse.json(
                    { error: 'User with this email already exists' },
                    { status: 400 }
                )
            }
            if (error.message.includes('connection')) {
                return NextResponse.json(
                    { error: 'Database connection error. Please try again.' },
                    { status: 503 }
                )
            }
        }

        return NextResponse.json(
            {
                error: 'Failed to create user',
                details: process.env.NODE_ENV === 'development'
                    ? error instanceof Error ? error.message : 'Unknown error'
                    : undefined
            },
            { status: 500 }
        )
    }
}
