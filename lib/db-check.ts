import { prisma } from './prisma'

export async function checkDatabaseConnection() {
    try {
        await prisma.$connect()
        console.log('✅ Database connected successfully')

        const userCount = await prisma.user.count()
        console.log(`📊 Current user count: ${userCount}`)

        return { success: true, userCount }
    } catch (error) {
        console.error('❌ Database connection failed:', error)
        return { success: false, error }
    } finally {
        await prisma.$disconnect()
    }
}

if (require.main === module) {
    checkDatabaseConnection()
        .then(() => process.exit(0))
        .catch(() => process.exit(1))
}
