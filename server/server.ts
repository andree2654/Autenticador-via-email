import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { v4 as uuidv4 } from 'uuid'
import { sendEmail } from './services/emailService.ts'

const app = express()

// Configuração do CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://seusite.com'
    : 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())
app.use(cookieParser())

const users: Record<string, any> = {}
const codes: Record<string, string> = {}

const authRouter = express.Router()

// Rota para solicitar o código e enviar o email para o user
authRouter.post('/request-code', async (req, res) => {
  const { email } = req.body

  // Valida o email do input
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Email inválido' })
  }

  // Gera o código de acesso
  const code = Math.floor(100000 + Math.random() * 900000).toString()
  codes[email] = code

  console.log(`Código gerado para ${email}: ${code}`)

  // Envia o código por email
  const emailSent = await sendEmail({
    to: email,
    subject: 'Seu Código de Autenticação',
    text: `Seu código de autenticação é: ${code}`,
  })

  if (!emailSent) {
    return res.status(500).json({ error: 'Falha ao enviar o código por e-mail.' })
  }

  return res.json({ success: true })
})

// Rota para confirmar o código
authRouter.post('/confirm-code', (req, res) => {
    const { email, code } = req.body
  
    // Validações de código e email
    if (codes[email] !== code) {
      return res.status(400).json({ error: 'Código inválido ou expirado.' })
    }

    // Armazena dados em cookie
    const token = uuidv4()
    users[email].token = token
    delete codes[email]
  
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
    })
  
    return res.json({
      success: true,
      token,
      user: { email: users[email].email, name: users[email].name }
    })
  })
  

app.use('/api/auth', authRouter)

// Endpoint para enviar email
app.post('/api/send-email', async (req, res) => {
  const { to, subject, text } = req.body

  // Validador dos dados para envio do email
  if (!to || !subject || !text) {
    return res.status(400).json({ success: false, message: 'Dados incompletos' })
  }

  // Envia o email
  try {
    const emailSent = await sendEmail({
      to,
      subject,
      text
    })

    if (!emailSent) {
      return res.status(500).json({ success: false, message: 'Erro ao enviar e-mail' })
    }

    return res.json({ success: true })
  } catch (error) {
    console.error('Erro ao enviar o e-mail', error)
    return res.status(500).json({ success: false, message: 'Erro interno no servidor' })
  }
})

// Retorno se o servidor esta rodando no backend
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`)
})
