import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { confirmCode } from '../api/auth'
import { toast } from 'react-toastify'
import LeftSide from '../components/LeftSide'

export default function ConfirmCode() {
  const [params] = useSearchParams()
  const email = params.get('email') || ''
  const [code, setCode] = useState('')
  const navigate = useNavigate()

  // Chama a API que confirma o código
  const mutation = useMutation({
    mutationFn: (data: { email: string, code: string }) => confirmCode(data.email, data.code),
    onSuccess: (data) => {
      if (data.success) {
        navigate('/profile')
      } else {}
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erro na confirmação')
    }
  })

  // Valida o input do código
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!code) {
      toast.error('Digite o código enviado!')
      return
    }
    mutation.mutate({ email, code })
  }

  return (
    <div className="grid grid-cols-2 min-h-screen">
      <LeftSide />

      <div className="flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-sm text-center">
          <img src="/logo.png" alt="Logo" className="w-26 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Digite seu código</h1>
          <p className="text-gray-500 mb-6">Por favor insira seu código que enviamos para o seu e-mail</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Digite aqui"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="submit"
              disabled={mutation.isPending}
              className="bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold py-2 rounded-lg transition disabled:opacity-50"
            >
              {mutation.isPending ? 'Confirmando...' : 'Enviar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
