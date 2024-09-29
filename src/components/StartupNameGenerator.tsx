// src/components/StartupNameGenerator.tsx
'use client'

import { useState, useEffect } from 'react'
import { Header } from './Header'
import { MainContent } from './MainContent'
import { Settings } from './Settings'
import { GenerateButton } from './GenerateButton'
import { Results } from './Results'
import { SavedNames } from './SavedNames'
import { generateNames } from '../app/actions/generateNames'
import { checkDomains } from '../app/actions/checkDomains'

export interface DomainResult {
  name: string;
  available: boolean;
  price: number | null;
}

export default function StartupNameGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [results, setResults] = useState<DomainResult[]>([])
  const [savedDomains, setSavedDomains] = useState<DomainResult[]>([])
  const [prompt, setPrompt] = useState('')
  const [nameCount, setNameCount] = useState(5)
  const [tlds, setTlds] = useState(['.com'])
  const [maxPrice, setMaxPrice] = useState(50)

  useEffect(() => {
    const storedDomains = localStorage.getItem('savedDomains')
    if (storedDomains) {
      setSavedDomains(JSON.parse(storedDomains))
    }
  }, [])

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      console.log('Generating names with prompt:', prompt)
      const names = await generateNames(prompt, nameCount)
      console.log('Generated names:', names)

      if (names.length === 0) {
        console.error('No names were generated')
        setResults([])
        return
      }

      const domains = names.flatMap(name => tlds.map(tld => `${name}${tld}`))
      console.log('Checking domains:', domains)
      const domainResults = await checkDomains(domains)
      console.log('Domain check results:', domainResults)

      const filteredResults = domainResults.filter(result => result.price === null || result.price <= maxPrice)
      console.log('Filtered results:', filteredResults)
      setResults(filteredResults)
    } catch (error) {
      console.error('Error generating names:', error)
      setResults([])
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSave = (domain: DomainResult) => {
    const updatedSavedDomains = [...savedDomains, domain]
    setSavedDomains(updatedSavedDomains)
    localStorage.setItem('savedDomains', JSON.stringify(updatedSavedDomains))
  }

  const handleRemove = (name: string) => {
    const updatedSavedDomains = savedDomains.filter(d => d.name !== name)
    setSavedDomains(updatedSavedDomains)
    localStorage.setItem('savedDomains', JSON.stringify(updatedSavedDomains))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <Header 
          title="✨ NameNexus"
          subtitle="AI-powered startup naming with instant domain checks"
        />
        <div className="p-6 sm:p-8">
          <MainContent prompt={prompt} setPrompt={setPrompt} />
          <Settings
            nameCount={nameCount}
            setNameCount={setNameCount}
            tlds={tlds}
            setTlds={setTlds}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
          <GenerateButton onGenerate={handleGenerate} isGenerating={isGenerating} />
          <Results results={results} onSave={handleSave} savedDomains={savedDomains} />
          <SavedNames savedDomains={savedDomains} onRemove={handleRemove} />
        </div>
      </div>
    </div>
  )
}
