const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function test() {
  try {
    console.log('Testing database connection...')
    
    const hashedPassword = await bcrypt.hash('test123', 10)
    console.log('✅ Password hashed successfully')
    
    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
      }
    })
    
    console.log('✅ User created:', user.email)
    
    // Clean up
    await prisma.user.delete({ where: { id: user.id } })
    console.log('✅ Test user deleted')
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

test()