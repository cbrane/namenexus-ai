import { Textarea } from '@/components/ui/textarea'

interface MainContentProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

export function MainContent({ prompt, setPrompt }: MainContentProps) {
  return (
    <div className="mb-6">
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your startup idea or the kind of names you're looking for..."
        className="w-full h-32 p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}