// src/components/Results.tsx
import { useState } from 'react'
import { CheckCircle, XCircle, Heart, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DomainResult } from './StartupNameGenerator'

interface ResultsProps {
  results: DomainResult[];
  onSave: (domain: DomainResult) => void;
  savedDomains: DomainResult[];
}

export function Results({ results, onSave, savedDomains }: ResultsProps) {
  const [showUnavailable, setShowUnavailable] = useState(true)
  const [sortBy, setSortBy] = useState('default')

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === 'priceAsc') return (a.price || Infinity) - (b.price || Infinity)
    if (sortBy === 'priceDesc') return (b.price || -Infinity) - (a.price || -Infinity)
    if (sortBy === 'alpha') return a.name.localeCompare(b.name)
    return 0
  })

  const filteredResults = showUnavailable ? sortedResults : sortedResults.filter(r => r.available)

  if (results.length === 0) {
    return <p className="text-center text-gray-600 mt-4">No results found. Try adjusting your settings or generating new names.</p>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="priceAsc">Price: Low to High</SelectItem>
            <SelectItem value="priceDesc">Price: High to Low</SelectItem>
            <SelectItem value="alpha">Alphabetical</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Switch
            id="show-unavailable"
            checked={showUnavailable}
            onCheckedChange={setShowUnavailable}
          />
          <label htmlFor="show-unavailable" className="text-sm text-gray-600">
            Show unavailable
          </label>
        </div>
      </div>
      <div className="space-y-4">
        {filteredResults.map((result) => {
          const isSaved = savedDomains.some(saved => saved.name === result.name);
          return (
            <div key={result.name} className="bg-gray-50 p-4 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{result.name}</h3>
                {result.available !== undefined ? (
                  result.available ? (
                    <CheckCircle className="text-green-500 w-6 h-6" />
                  ) : (
                    <XCircle className="text-red-500 w-6 h-6" />
                  )
                ) : (
                  <span className="text-yellow-500">Unknown</span>
                )}
              </div>
              <p className="text-gray-600">{result.name}</p>
              <div className="mt-2">
                <span className="font-semibold text-blue-600">
                  {result.price !== null ? `$${result.price.toFixed(2)}/yr` : 'Price unknown'}
                </span>
              </div>
              <div className="mt-4 flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onSave(result)}
                  disabled={isSaved}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                  {isSaved ? 'Saved' : 'Save'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`https://www.namecheap.com/domains/registration/results/?domain=${result.name}`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Namecheap
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}
