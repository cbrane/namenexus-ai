// src/components/Settings.tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'

interface SettingsProps {
  nameCount: number;
  setNameCount: (count: number) => void;
  tlds: string[];
  setTlds: (newTlds: string[]) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
}

export function Settings({ nameCount, setNameCount, tlds, setTlds, maxPrice, setMaxPrice }: SettingsProps) {
  const handleTldChange = (tld: string) => {
    const newTlds = tlds.includes(tld)
      ? tlds.filter((t: string) => t !== tld)
      : [...tlds, tld];
    setTlds(newTlds);
  }

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="w-full sm:w-auto">
          <label htmlFor="nameCount" className="block text-sm font-medium text-gray-700 mb-1">
            Number of names
          </label>
          <Select value={nameCount.toString()} onValueChange={(value) => setNameCount(parseInt(value))}>
            <SelectTrigger id="nameCount">
              <SelectValue placeholder="Select count" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-auto flex-grow">
          <label className="block text-sm font-medium text-gray-700 mb-1">TLD options</label>
          <div className="flex flex-wrap gap-2">
            {['.com', '.io', '.ai', '.tech', '.co'].map((tld) => (
              <div key={tld} className="flex items-center">
                <Checkbox
                  id={`tld-${tld}`}
                  checked={tlds.includes(tld)}
                  onCheckedChange={() => handleTldChange(tld)}
                />
                <label htmlFor={`tld-${tld}`} className="ml-2 text-sm text-gray-600">
                  {tld}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="priceFilter" className="block text-sm font-medium text-gray-700 mb-1">
          Max price: ${maxPrice}
        </label>
        <Slider
          id="priceFilter"
          max={200}
          step={1}
          value={[maxPrice]}
          onValueChange={(value) => setMaxPrice(value[0])}
          className="w-full"
        />
      </div>
    </div>
  )
}