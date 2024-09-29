// src/components/Header.tsx
import { Sparkles } from 'lucide-react'

interface HeaderProps {
  title: string;
  subtitle: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 text-center">
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="text-xl">{subtitle}</p>
    </header>
  )
}
