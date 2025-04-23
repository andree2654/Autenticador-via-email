import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import axios from 'axios'

interface AuthResponse {
  success: boolean
  message?: string
  token?: string
  user?: {
    email: string
    name: string
  }
}

const STORAGE_KEY = 'mockAuthCodes'

const config = {
  emailProvider: 'mock',
  tokenExpiry: 7 // dias
}

//  Função que chama a API para solicitar o código de autenticação 
export const requestCode = async (email: string): Promise<AuthResponse> => {
  try {
    // Seta no localStorage o email que sera exibido no Profiles.tsx
    localStorage.setItem('userEmail', email)
    const response = await axios.post('http://localhost:3000/api/auth/request-code', { email }) // A URL do backend
    if (response.data.success) {
      toast.success('Código enviado com sucesso!')
      return { success: true }
    } else {
      throw new Error(response.data.message || 'Erro ao enviar código.')
    }
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Erro ao solicitar código')
    return { success: false, message: error instanceof Error ? error.message : undefined }
  }
}

// Função que chama a API que confirma o código e salva o token nos cookies
export const confirmCode = async (email: string, code: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/confirm-code', { email, code })
    if (response.data.success) {
      Cookies.set('auth_token', response.data.token, {
        expires: config.tokenExpiry,
        secure: import.meta.env.PROD
      })
      return { success: true, token: response.data.token, user: response.data.user }
    } else {
      throw new Error(response.data.message || 'Erro ao confirmar código.')
    }
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Erro ao confirmar código')
    return { success: false, message: error instanceof Error ? error.message : undefined }
  }
}

