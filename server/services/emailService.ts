import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string
  subject: string
  text: string
  html?: string
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // Cria conta de testes no Ethereal
    const testAccount = await nodemailer.createTestAccount()

    // Transportador SMTP
    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })

    // Envia o email
    const info = await transporter.sendMail({
      from: '"Auth App" <no-reply@auth-app.com>',
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html || options.text,
    })

    console.log('Mensagem enviada: %s', info.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))

    return true
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error)
    return false
  }
}
