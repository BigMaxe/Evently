import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(email: string, token: string) {
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`

    try {
        await resend.emails.send({
            from: 'Evently <oduyeogbu@gmail.com>',
            to: email,
            subject: 'Verify your email address',
            html: `
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="utf-8">
                        <title>Verify Your Email</title>
                    </head>
                    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f4f6;">
                        <div style="max-width: 600px; margin: 40px auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px; text-align: center;">
                                <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Evently!</h1>
                            </div>

                            <div style="padding: 40px 30px;">
                                <h2 style="color: #1f2937; margin-top: 0;">Verify Your Email</h2>
                                <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                                    Thanks for signing up! Click below to verify your email:
                                </p>

                                <div style="text-align: center; margin: 30px 0;">
                                    <a href="${verificationUrl}" style="display: inline-block; background-color: #10b981; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600;">
                                        Verify Email Address
                                    </a>
                                </div>

                                <p style="color: #6b7280; font-size: 14px;">
                                    or copy this link: <br>
                                    <span style="color: #10b981; word-break: break-all;">${verificationUrl}</span>
                                </p>

                                <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                                    Link expires in 24 hours. If you didn't create this account, ignore this email.
                                </p>
                            </div>

                            <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                                <p style="color: #6b7280; font-size: 12px; margin: 0;">
                                    © ${new Date().getFullYear()} Evently. All rights reserved.
                                </p>
                            </div>
                        </div>
                    </body>
                </html>
            `,
        })

        return { success: true }
    } catch (error) {
        console.error('Failed to send verification email:', error)
        return { success: false, error }
    }
}
