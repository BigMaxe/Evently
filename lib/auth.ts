import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Facebook from 'next-auth/providers/facebook'
// import Apple from 'next-auth/providers/apple'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// only include providers that have credentials configured
const providers: any[] = [
    // email/passord authentication
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

            const user = await prisma.user.findUnique({
                where: { email: credentials.email },
            })

            if (!user) {
                throw new Error('No account found with this email')
            }

            if (!user.password) {
                throw new Error('Please sign in with the provider you used to register')
            }

            const isPasswordValid = await bcrypt.compare(
                credentials.password,
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
        },
    }),
]

// add google oauth if configured
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push(
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    )
}

// add facebook oauth if configured
if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
    providers.push(
        Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
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

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers,
    pages: {
        signIn: '/', //stay on homepage, show modal
        error: '/',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
                token.image = user.image
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
    debug: process.env.NODE_ENV === 'development',
})
