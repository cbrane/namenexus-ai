import React from 'react'
import { DomainResult } from './StartupNameGenerator'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, ExternalLink } from 'lucide-react'

interface SavedNamesProps {
  savedDomains: DomainResult[]
  onRemove: (name: string) => void
}

export function SavedNames({ savedDomains, onRemove }: SavedNamesProps) {
  if (savedDomains.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Saved Domains</h2>
      <div className="space-y-4">
        {savedDomains.map((domain) => (
          <div key={domain.name} className="bg-gray-50 p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">{domain.name}</h3>
              {domain.available ? (
                <CheckCircle className="text-green-500 w-6 h-6" />
              ) : (
                <XCircle className="text-red-500 w-6 h-6" />
              )}
            </div>
            <p className="text-gray-600">{domain.name}</p>
            <div className="mt-2">
              <span className="font-semibold text-blue-600">
                {domain.price !== null ? `$${domain.price.toFixed(2)}/yr` : 'Price unknown'}
              </span>
            </div>
            <div className="mt-4 flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => onRemove(domain.name)}>
                Remove
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(`https://www.namecheap.com/domains/registration/results/?domain=${domain.name}`, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Namecheap
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}