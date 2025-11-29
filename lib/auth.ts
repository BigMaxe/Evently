import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Facebook from 'next-auth/providers/facebook'
import Apple from 'next-auth/providers/apple'
import Credentials from 'next-auth/providers/credentials'

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
                throw new Error('Email and password are required')
            }

            // TODO: Implement MongoDB user lookup
            // For now, return null to show "Invalid credentials" error
            // When you implement MongoDB:
            // 1. Find user by email
            // 2. Verify password hash
            // 3. Return user object if valid
            
            // Example:
            // const user = await db.user.findUnique({ where: { email: credentials.email } })
            // if (!user || !await bcrypt.compare(credentials.password, user.password)) {
            //     throw new Error('Invalid email or password')
            // }
            // return { id: user.id, email: user.email, name: user.name }

            throw new Error('Authentication not yet implemented. Pleaseset up your database.')
        },
    }),
]

// add google oauth if configured
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push(
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                }
            }
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
if (process.env.APPLE_CLIENT_ID && process.env.APPLE_CLIENT_SECRET) {
    providers.push(
        Apple({
            clientId: process.env.APPLE_CLIENT_ID,
            clientSecret: process.env.APPLE_CLIENT_SECRET,
        })
    )
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers,
    pages: {
        signIn: '/', //stay on homepage, show modal
        error: '/',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
            }
            if (account) {
                token.provider = account.provider
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.email = token.email as string
                session.user.name = token.name as string
            }
            return session
        },
        async signIn({ user, account, profile }) {
            // TODO: Save user to database if they don't exist
            // This is called when user signs in with OAuth or credentials
            
            // Example with MongoDB:
            // const existingUser = await db.user.findUnique({ where: { email: user.email } })
            // if (!existingUser) {
            //     await db.user.create({
            //         data: {
            //             email: user.email,
            //             name: user.name,
            //             image: user.image,
            //             provider: account.provider
            //         }
            //     })
            // }

            return true
        }
    },

    debug: process.env.NODE_ENV === 'development',
})
