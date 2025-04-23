interface EmailOptions {
  to: string
  subject: string
  text: string
  html?: string
}

// Função que envia a requisição HTTP para o endpoint(API)
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/request-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: options.to })
    })

    return response.ok
  } catch (error) {
    console.error('Erro ao enviar requisição de email:', error)
    return false
  }
}
