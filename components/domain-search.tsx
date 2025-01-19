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
      // Popular
      { name: query, tld: '.com', available: false, price: 1200, type: 'exact' },
      { name: query, tld: '.net', available: true, price: 1500, type: 'exact' },
      { name: query, tld: '.org', available: true, price: 1400, type: 'exact' },
      { name: query, tld: '.io', available: true, price: 4600, type: 'exact' },
      { name: query, tld: '.co', available: true, price: 2700, type: 'exact' },
      { name: query, tld: '.me', available: true, price: 1950, type: 'exact' },
      { name: query, tld: '.ai', available: true, price: 17800, type: 'exact', isPremium: true },
      
      // Technology
      { name: query, tld: '.dev', available: true, price: 1400, type: 'exact' },
      { name: query, tld: '.tech', available: true, price: 4900, type: 'exact' },
      { name: query, tld: '.app', available: true, price: 1800, type: 'exact' },
      { name: query, tld: '.codes', available: true, price: 5200, type: 'exact' },
      
      // Business
      { name: query, tld: '.inc', available: true, price: 15800, type: 'exact' },
      { name: query, tld: '.company', available: true, price: 2600, type: 'exact' },
      { name: query, tld: '.agency', available: true, price: 2900, type: 'exact' },
      
      // Creative
      { name: query, tld: '.design', available: true, price: 3500, type: 'exact' },
      { name: query, tld: '.studio', available: true, price: 2900, type: 'exact' },
      { name: query, tld: '.media', available: true, price: 2200, type: 'exact' },
      
      // Others
      { name: query, tld: '.world', available: true, price: 2900, type: 'exact' },
      { name: query, tld: '.live', available: true, price: 2300, type: 'exact' },
      { name: query, tld: '.store', available: true, price: 2100, type: 'exact' },
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

  // Helper function to find the original domain data
  const findDomainData = (domain: string): DomainResult => {
    const [name, tld] = domain.split('.')
    const originalDomain = results.find(r => `${r.name}${r.tld}` === domain)
    return originalDomain || {
      name,
      tld: `.${tld}`,
      available: true,
      type: 'exact',
      price: 1200 // Default price if not found
    }
  }

  // Helper function to check if a price falls within a range
  const isPriceInRange = (price: number | undefined, range: string): boolean => {
    if (!price) return false
    switch (range) {
      case 'under-10':
        return price <= 1000 // Under $10
      case 'under-50':
        return price <= 5000 // Under $50
      case 'under-100':
        return price <= 10000 // Under $100
      case 'premium':
        return price > 10000 // Over $100
      default:
        return true // 'all' or any other value
    }
  }

  // Filter results based on current filters
  const filteredResults = results.filter(result => {
    // Price filter
    if (!isPriceInRange(result.price, filters.priceRange)) {
      return false
    }
    
    // Add other filters here later
    return true
  })

  // Extract handle from query (remove TLD if present)
  const handle = query.split('.')[0]

  return (
    <div className="flex-1 flex flex-col">
      <div className={`flex flex-col ${
        query 
          ? 'pt-16' 
          : 'items-center justify-center min-h-[calc(100vh-64px)] -mt-16'
      }`}>
        <div className={`${query ? 'w-full max-w-[1400px] mx-auto' : 'w-full max-w-[800px]'} px-6 space-y-6`}>
          {!query && (
            <h1 className="text-center text-4xl tracking-tight">
              Find Your Perfect Domain
            </h1>
          )}
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
          <div className="w-full max-w-[1400px] mx-auto px-6 mt-6">
            <Tabs defaultValue="results" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="results" className="flex-1">Search Results</TabsTrigger>
                <TabsTrigger value="bookmarks" className="flex-1">
                  Bookmarked ({bookmarkedDomains.size})
                </TabsTrigger>
                <TabsTrigger value="social" className="flex-1">Social Handles</TabsTrigger>
              </TabsList>
              
              <div className="mt-6 tabs-container">
                <TabsContent value="results">
                  <div className="space-y-6">
                    <DomainFilters filters={filters} onFiltersChange={setFilters} />
                    <DomainResults 
                      results={filteredResults}
                      bookmarkedDomains={bookmarkedDomains}
                      onBookmark={handleBookmark}
                      onDomainSelect={() => {}}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="bookmarks">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl">Bookmarked Domains</h2>
                      <Button onClick={toggleCompare} disabled={bookmarkedDomains.size < 2}>
                        {isComparing ? 'Exit Comparison' : 'Compare Domains'}
                      </Button>
                    </div>
                    {isComparing ? (
                      <DomainComparison
                        domains={Array.from(bookmarkedDomains).map(domain => findDomainData(domain))}
                        onClose={toggleCompare}
                      />
                    ) : (
                      <DomainResults 
                        results={Array.from(bookmarkedDomains).map(domain => findDomainData(domain))}
                        bookmarkedDomains={bookmarkedDomains}
                        onBookmark={handleBookmark}
                        onDomainSelect={() => {}}
                      />
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="social">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl">Social Handle Availability</h2>
                    </div>
                    <SocialHandleChecker handle={handle} />
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}

