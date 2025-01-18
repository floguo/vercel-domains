'use client'

import { useState, useEffect } from 'react'
import { searchDomains } from '../utils/mockDomainApi'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, Search } from 'lucide-react'

interface DomainResult {
  name: string;
  tld: string;
  available: boolean;
  price: number;
}

export function DomainSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<DomainResult[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length > 0) {
        setLoading(true);
        const searchResults = await searchDomains(query);
        setResults(searchResults);
        setLoading(false);
      } else {
        setResults([]);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Vercel Domain Search</h1>
      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Search for a domain..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-lg"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      {loading && (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      )}
      {!loading && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {results.map((domain, index) => (
            <Card key={index} className={domain.available ? 'border-green-500' : 'border-red-500'}>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-2">
                  {domain.name}
                  <span className="text-gray-600">{domain.tld}</span>
                </h2>
                <p className={`text-sm ${domain.available ? 'text-green-600' : 'text-red-600'}`}>
                  {domain.available ? 'Available' : 'Taken'}
                </p>
                {domain.available && (
                  <p className="text-sm font-semibold mt-2">${domain.price}/year</p>
                )}
                <Button
                  className="w-full mt-4"
                  disabled={!domain.available}
                >
                  {domain.available ? 'Add to Cart' : 'Unavailable'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

