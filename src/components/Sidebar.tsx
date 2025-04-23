'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSchool, faQuestion, faCog } from '@fortawesome/free-solid-svg-icons'

interface SidebarProps {
  user: {
    name: string
    email: string
  }
}

export default function Sidebar({ user }: SidebarProps) {
  return (
    <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="flex items-center gap-2 px-6 py-4">
            <a href="VITE_API_BASE_URL"><img src="/logo.png" alt="Logo" className="w-30 flex items-center" /></a>
        </div>
      <div className="px-6 py-4 border-b">
        <div className="flex items-center gap-2">
          <img
            src="/image2.png"
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-gray-800">{user.name}</div>
            <div className="text-sm text-gray-500">Admin</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-6">
        <a href="#" className="flex items-center gap-5 text-gray-700 hover:text-purple-600 hover:bg-gray-100 p-2 rounded-md">
          <FontAwesomeIcon icon={faHome} /> Início
        </a>
        <a href="#" className="flex items-center gap-5 text-gray-700 hover:text-purple-600 hover:bg-gray-100 p-2 rounded-md">
          <FontAwesomeIcon icon={faSchool} /> Escolas
        </a>
        <a href="#" className="flex items-center gap-5 text-gray-700 hover:text-purple-600 hover:bg-gray-100 p-2 rounded-md">
          <FontAwesomeIcon icon={faQuestion} /> Perguntas
        </a>
        <a href="#" className="flex items-center gap-5 bg-[#4F46E5] text-white rounded-md p-2 hover:bg-[#4338CA]">
          <FontAwesomeIcon icon={faCog} /> Configuração
        </a>
      </nav>
    </aside>
  )
}

