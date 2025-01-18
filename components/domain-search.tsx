'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { DomainFilters, Filters } from './domain-filters'
import { DomainResults } from './domain-results'
import { DomainComparison } from './domain-comparison'
import { SocialHandleChecker } from './social-handle-checker'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface DomainResult {
  name: string
  tld: string
  available: boolean
  price?: number
  isPremium?: boolean
  type: 'exact' | 'semantic' | 'creative'
  relevanceScore?: number
  description?: string
}

export function DomainSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<DomainResult[]>([])
  const [bookmarkedDomains, setBookmarkedDomains] = useState<Set<string>>(new Set())
  const [isComparing, setIsComparing] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    priceRange: 'all',
    tldCategory: 'all',
    maxLength: 63,
    availability: 'all',
    special: false,
  })

  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }

    const mockResults: DomainResult[] = [
      { name: query, tld: '.com', available: false, price: 1200, type: 'exact' },
      { name: query, tld: '.ai', available: true, price: 17800, type: 'exact', isPremium: true },
      { name: query, tld: '.app', available: true, price: 1800, type: 'exact' },
      { name: query, tld: '.dev', available: true, price: 1400, type: 'exact' },
      { name: query, tld: '.io', available: true, price: 4600, type: 'exact' },
      { name: query, tld: '.xyz', available: true, price: 1300, type: 'exact' },
      { name: query, tld: '.tech', available: true, price: 4900, type: 'exact' },
      { name: query, tld: '.co', available: true, price: 2700, type: 'exact' },
    ]

    setResults(mockResults)
  }, [query])

  const handleBookmark = (domain: string) => {
    setBookmarkedDomains(prev => {
      const newSet = new Set(prev)
      if (newSet.has(domain)) {
        newSet.delete(domain)
      } else {
        newSet.add(domain)
      }
      return newSet
    })
  }

  const toggleCompare = () => {
    setIsComparing(!isComparing)
  }

  return (
    <div className={`flex-1 flex flex-col items-center ${query ? 'justify-start pt-12' : 'justify-center'} min-h-screen px-6`}>
      <div className={`w-full max-w-[800px] space-y-6 ${query ? 'mb-6' : 'mb-12'}`}>
        <h1 className="text-center text-4xl tracking-tight">
          Find Your Perfect Domain
        </h1>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for domains..."
            className="w-full h-12 pl-11 pr-4 text-lg"
          />
        </div>
      </div>

      {query && (
        <div className="w-full max-w-[800px]">
          <Tabs defaultValue="results" className="w-full">
            <TabsList className="w-full justify-start mb-6">
              <TabsTrigger value="results" className="flex-1">Search Results</TabsTrigger>
              <TabsTrigger value="bookmarks" className="flex-1">
                Bookmarked ({bookmarkedDomains.size})
              </TabsTrigger>
              <TabsTrigger value="social" className="flex-1">Social Handles</TabsTrigger>
            </TabsList>
            
            <TabsContent value="results">
              <DomainFilters filters={filters} onFiltersChange={setFilters} />
              <DomainResults 
                results={results}
                bookmarkedDomains={bookmarkedDomains}
                onBookmark={handleBookmark}
                onDomainSelect={() => {}}
              />
            </TabsContent>

            <TabsContent value="bookmarks">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl">Bookmarked Domains</h2>
                <Button onClick={toggleCompare} disabled={bookmarkedDomains.size < 2}>
                  {isComparing ? 'Exit Comparison' : 'Compare Domains'}
                </Button>
              </div>
              {isComparing ? (
                <DomainComparison
                  domains={Array.from(bookmarkedDomains).map(domain => {
                    const [name, tld] = domain.split('.')
                    return { name, tld: `.${tld}`, available: true, type: 'exact' }
                  })}
                  onClose={toggleCompare}
                />
              ) : (
                <DomainResults 
                  results={Array.from(bookmarkedDomains).map(domain => {
                    const [name, tld] = domain.split('.')
                    return { name, tld: `.${tld}`, available: true, type: 'exact' }
                  })}
                  bookmarkedDomains={bookmarkedDomains}
                  onBookmark={handleBookmark}
                  onDomainSelect={() => {}}
                />
              )}
            </TabsContent>

            <TabsContent value="social">
              <SocialHandleChecker />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}

