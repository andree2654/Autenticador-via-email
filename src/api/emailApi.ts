import axios from 'axios'

// Chama a API que envia o email
export const sendEmail = async ({ to, subject, text }: { to: string; subject: string; text: string }) => {
  try {
    const response = await axios.post('/api/send-email', { to, subject, text })
    return response.data.success
  } catch (error) {
    console.error('Erro ao enviar email', error)
    return false
  }
}