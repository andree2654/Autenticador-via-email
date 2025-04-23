'use client'

import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { toast } from 'react-toastify'

export default function Profile() {
  // Busca o email armazenado em localStorage
  const [user, setUser] = useState({
    name: 'João',
    email: localStorage.getItem('userEmail'),
  })

  const [formUser, setFormUser] = useState(user)

  function handleSave() {
    setUser(formUser)
    toast.success('Perfil atualizado com sucesso!')
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar user={user} />

      <main className="flex-1 p-10 bg-gray-50 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Configurações</h1>

        <div className="flex flex-col md:flex-row items-center gap-10">
          <img
            src="/image2.png"
            alt="Profile Picture"
            className="w-48 h-48 rounded-full object-cover"
          />

          <div className="space-y-6 w-full max-w-sm">
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-medium">Nome</label>
              <input
                type="text"
                value={formUser.name}
                onChange={(e) => setFormUser({ ...formUser, name: e.target.value })}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-medium">E-mail</label>
              <input
                type="email"
                value={formUser.email}
                disabled
                className="border border-gray-300 rounded-md px-4 py-2 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="w-full flex justify-center items-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium py-2 rounded-md"
            >
              Salvar
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
