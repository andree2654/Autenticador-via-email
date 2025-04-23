import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { requestCode } from '../api/auth'
import { toast } from 'react-toastify'
import LeftSide from '../components/LeftSide'

export default function Login() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const [devCode, setDevCode] = useState<string | null>(null)

  // Mutation para chamar a API
  const mutation = useMutation({
    mutationFn: (email: string) => requestCode(email),
    // Se for bem sucedido, envia o código e redireciona para a página de confirmação do codigo
    onSuccess: (_, variables) => {
      setDevCode(getLocalCode(variables))
      navigate(`/confirm?email=${encodeURIComponent(variables)}`)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erro ao enviar código')
    }
  })

  // Não deixa continuar se não há nada dentro do input de email
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      return
    }
    mutation.mutate(email)
  }

  // Verifica se ja tem um código setado para o email
  const getLocalCode = (email: string): string | null => {
    const data = localStorage.getItem('mockAuthCodes')
    if (!data) return null
    const codes = JSON.parse(data)
    return codes[email]?.code || null
  }

  return (
    <div className="grid grid-cols-2 min-h-screen">
      <LeftSide />

      <div className="flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-sm text-center">
          <img src="/logo.png" alt="Logo" className="w-26 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Seja bem vindo!</h1>
          <p className="text-gray-500 mb-6">Por favor insira o seu e-mail</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Digite aqui"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="submit"
              className="bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold py-2 rounded-lg transition"
            >
              Enviar código
            </button>
          </form>

          {/* DEV: Mostrar código gerado localmente */}
          {devCode && (
            <div className="mt-4 text-sm text-gray-500">
              Código gerado: <span className="font-bold">{devCode}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
