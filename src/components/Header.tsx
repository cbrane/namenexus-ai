// src/components/Header.tsx
import { Sparkles } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 sm:p-8">
      <div className="flex items-center justify-center space-x-2">
        <Sparkles className="w-8 h-8" />
        <h1 className="text-3xl font-bold">AI Startup Name Generator</h1>
      </div>
      <p className="text-center mt-2 text-blue-100">Generate unique startup names with available domains</p>
    </header>
  )
}
