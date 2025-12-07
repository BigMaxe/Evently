import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Facebook from 'next-auth/providers/facebook'
// import Apple from 'next-auth/providers/apple'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import type { Adapter } from 'next-auth/adapters'

// only include providers that have credentials configured
const providers: any[] = []

// add google oauth if configured
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push(
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
        })
    )
}

// add facebook oauth if configured
if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
    providers.push(
        Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
        })
    )
}

// add apple oauth if configured
// if (process.env.APPLE_CLIENT_ID && process.env.APPLE_CLIENT_SECRET) {
//     providers.push(
//         Apple({
//             clientId: process.env.APPLE_CLIENT_ID,
//             clientSecret: process.env.APPLE_CLIENT_SECRET,
//         })
//     )
// }

// Add credentials provider (email/password)
providers.push(
    Credentials({
        name: 'Credentials',
        credentials: {
            email: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
            password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
                throw new Error('Please enter your email and password')
            }

            try {
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                })

                if (!user) {
                    throw new Error('No account found with this email')
                }

                if (!user.password) {
                    throw new Error('Please sign in with the provider you used to register')
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                )

                if (!isPasswordValid) {
                    throw new Error('Invalid email or password')
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                }
            } catch (error) {
                console.error('Auth error:', error)
                throw error
            }
        },
    })
)

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: providers.some(p => p.id === 'google' || p.id === 'facebook')
        ? PrismaAdapter(prisma) as Adapter
        : undefined,
    providers,
    pages: {
        signIn: '/', //stay on homepage, show modal
        error: '/',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === 'credentials') {
                return true
            }
            return true
        },
        async jwt({ token, user, account, trigger, session }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
                token.image = user.image
            }

            // handle session updates
            if (trigger === 'update' && session) {
                token = { ...token, ...session }
            }

            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.email = token.email as string
                session.user.name = token.name as string
                session.user.image = token.image as string
            }
            return session
        },
    },
    events: {
        async signIn({ user, account, profile, isNewUser }) {
            console.log('User signed in:', user.email, 'Provider:', account?.provider)
        },
        async createUser({ user }) {
            console.log('New user created:', user.email)
        },
    },
    debug: process.env.NODE_ENV === 'development',
})
