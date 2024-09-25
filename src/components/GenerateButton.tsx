// src/components/GenerateButton.tsx
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface GenerateButtonProps {
  onGenerate: () => void;
  isGenerating: boolean;
}

export function GenerateButton({ onGenerate, isGenerating }: GenerateButtonProps) {
  return (
    <div className="mb-6">
      <Button
        onClick={onGenerate}
        disabled={isGenerating}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-md hover:from-blue-700 hover:to-purple-700 transition-colors"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Names'
        )}
      </Button>
    </div>
  )
}
