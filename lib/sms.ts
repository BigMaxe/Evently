import twilio from 'twilio'

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
)

export function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function sendOTP(phoneNumber: string, otp: string) {
    try {
        const message = await client.messages.create({
        body: `Your Evently verification code is: ${otp}. Valid for 10 minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
        })

        console.log('OTP sent successfully:', message.sid)
        return { success: true, messageSid: message.sid }
    } catch (error) {
        console.error('Failed to send OTP:', error)
        return { success: false, error }
    }
}

export function formatPhoneNumber(phone: string): string {
    const digits = phone.replace(/\D/g, '')
    
    if (!phone.startsWith('+')) {
        if (digits.length === 10) {
        return `+1${digits}` // Assume US/Canada
        }
        return `+${digits}`
    }
    
    return phone
}