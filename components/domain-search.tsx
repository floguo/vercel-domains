'use client'

import { useState, useEffect } from 'react'
import { Search, Bookmark, InfoIcon } from 'lucide-react'
import { DomainFilters, Filters } from './domain-filters'
import { DomainResults } from './domain-results'
import { DomainComparison } from './domain-comparison'
import { SocialHandleChecker } from './social-handle-checker'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { DomainCard } from './domain-card'
import { generateSemanticSuggestions } from '@/lib/semantic-suggestions'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

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

interface DomainSuggestion {
  name: string
  tld: string
  type: 'exact' | 'hack' | 'semantic' | 'creative'
  available: boolean
  price?: number
  explanation?: string // To explain why this suggestion is relevant
}

export function DomainSearch() {
  const [searchMode, setSearchMode] = useState<'tld' | 'semantic'>('tld')
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
    showPremium: true,
    showTaken: true
  })
  const [semanticResults, setSemanticResults] = useState<{
    hacks: DomainSuggestion[]
    synonyms: DomainSuggestion[]
    brandable: DomainSuggestion[]
  }>({
    hacks: [],
    synonyms: [],
    brandable: []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [sortBy, setSortBy] = useState('relevant')

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
      
      // Technology & Software
      { name: query, tld: '.dev', available: true, price: 1400, type: 'exact' },
      { name: query, tld: '.tech', available: true, price: 4900, type: 'exact' },
      { name: query, tld: '.app', available: true, price: 1800, type: 'exact' },
      { name: query, tld: '.software', available: true, price: 2900, type: 'exact' },
      { name: query, tld: '.computer', available: true, price: 3200, type: 'exact' },
      { name: query, tld: '.cloud', available: true, price: 2200, type: 'exact' },
      { name: query, tld: '.digital', available: true, price: 2900, type: 'exact' },
      { name: query, tld: '.network', available: true, price: 1800, type: 'exact' },
      { name: query, tld: '.systems', available: true, price: 1900, type: 'exact' },
      { name: query, tld: '.codes', available: true, price: 5200, type: 'exact' },
      { name: query, tld: '.tools', available: true, price: 2500, type: 'exact' },
      { name: query, tld: '.space', available: true, price: 1900, type: 'exact' },
      
      // Business & Professional
      { name: query, tld: '.inc', available: true, price: 15800, type: 'exact' },
      { name: query, tld: '.company', available: true, price: 2600, type: 'exact' },
      { name: query, tld: '.business', available: true, price: 2200, type: 'exact' },
      { name: query, tld: '.agency', available: true, price: 2900, type: 'exact' },
      { name: query, tld: '.consulting', available: true, price: 3100, type: 'exact' },
      { name: query, tld: '.management', available: true, price: 2400, type: 'exact' },
      { name: query, tld: '.services', available: true, price: 2800, type: 'exact' },
      { name: query, tld: '.solutions', available: true, price: 2300, type: 'exact' },
      { name: query, tld: '.ventures', available: true, price: 4800, type: 'exact' },
      { name: query, tld: '.limited', available: true, price: 2600, type: 'exact' },
      { name: query, tld: '.group', available: true, price: 2200, type: 'exact' },
      { name: query, tld: '.zone', available: true, price: 2400, type: 'exact' },
      
      // Creative & Media
      { name: query, tld: '.design', available: true, price: 3500, type: 'exact' },
      { name: query, tld: '.studio', available: true, price: 2900, type: 'exact' },
      { name: query, tld: '.media', available: true, price: 2200, type: 'exact' },
      { name: query, tld: '.art', available: true, price: 1500, type: 'exact' },
      { name: query, tld: '.photography', available: true, price: 2100, type: 'exact' },
      { name: query, tld: '.gallery', available: true, price: 2000, type: 'exact' },
      { name: query, tld: '.graphics', available: true, price: 2400, type: 'exact' },
      { name: query, tld: '.video', available: true, price: 2700, type: 'exact' },
      { name: query, tld: '.film', available: true, price: 3900, type: 'exact' },
      { name: query, tld: '.productions', available: true, price: 2800, type: 'exact' },
      { name: query, tld: '.live', available: true, price: 2300, type: 'exact' },
      
      // E-commerce & Shopping
      { name: query, tld: '.shop', available: true, price: 2800, type: 'exact' },
      { name: query, tld: '.store', available: true, price: 2100, type: 'exact' },
      { name: query, tld: '.market', available: true, price: 3200, type: 'exact' },
      { name: query, tld: '.shopping', available: true, price: 2900, type: 'exact' },
      { name: query, tld: '.sale', available: true, price: 2600, type: 'exact' },
      { name: query, tld: '.deals', available: true, price: 2400, type: 'exact' },
      { name: query, tld: '.buy', available: true, price: 3100, type: 'exact' },
      { name: query, tld: '.discount', available: true, price: 2300, type: 'exact' },
      
      // Local/Regional
      { name: query, tld: '.us', available: true, price: 1200, type: 'exact' },
      { name: query, tld: '.uk', available: true, price: 900, type: 'exact' },
      { name: query, tld: '.eu', available: true, price: 1100, type: 'exact' },
      { name: query, tld: '.de', available: true, price: 1000, type: 'exact' },
      { name: query, tld: '.fr', available: true, price: 1100, type: 'exact' },
      { name: query, tld: '.es', available: true, price: 1000, type: 'exact' },
      { name: query, tld: '.it', available: true, price: 1100, type: 'exact' },
      { name: query, tld: '.au', available: true, price: 1300, type: 'exact' },
      
      // Education & Community
      { name: query, tld: '.academy', available: true, price: 2600, type: 'exact' },
      { name: query, tld: '.guide', available: true, price: 2500, type: 'exact' },
      { name: query, tld: '.club', available: true, price: 1200, type: 'exact' },
      
      // Generic/Other
      { name: query, tld: '.world', available: true, price: 2900, type: 'exact' },
      { name: query, tld: '.plus', available: true, price: 2700, type: 'exact' },
      { name: query, tld: '.life', available: true, price: 2800, type: 'exact' }
    ]

    setResults(mockResults)
  }, [query])

  // When query changes, generate semantic suggestions
  useEffect(() => {
    if (!query || !searchMode) return
    
    const generateSemanticResults = async () => {
      try {
        setIsLoading(true) // Add loading state if you want
        const suggestions = await generateSemanticSuggestions(query)
        setSemanticResults(suggestions)
      } catch (error) {
        console.error('Failed to get semantic suggestions:', error)
        // Optionally show error to user
      } finally {
        setIsLoading(false)
      }
    }

    if (searchMode === 'semantic') {
      generateSemanticResults()
    }
  }, [query, searchMode])

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

  // Helper function to sort domain results
  const sortDomains = (domains: DomainSuggestion[]) => {
    return [...domains].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return (a.price || 0) - (b.price || 0)
        case 'price-desc':
          return (b.price || 0) - (a.price || 0)
        default:
          return 0 // Keep original order for 'relevant'
      }
    })
  }

  // Helper function to filter domains by price
  const filterByPrice = (domains: DomainSuggestion[]) => {
    return domains.filter(domain => isPriceInRange(domain.price, filters.priceRange))
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className={`flex-1 ${
        query 
          ? 'pt-16 pb-24 min-h-screen'
          : 'flex items-center justify-center -mt-24'
      }`}>
        <div className={`${query ? 'w-full max-w-[1400px] mx-auto' : 'w-full max-w-[800px]'} px-6 space-y-6`}>
          {!query && (
            <h1 className="text-center text-4xl tracking-tighter text-foreground">
              Find Your Perfect Domain
            </h1>
          )}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground/60 h-4 w-4" />
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for domains..."
              className={cn(
                "w-full h-12 pl-11 pr-4 text-lg",
                "border-border placeholder:text-muted-foreground/50",
                "hover:border-muted-foreground/30",
                "focus-visible:ring-[3px] focus-visible:ring-border/80 focus-visible:ring-offset-0 focus-visible:border-muted-foreground focus-visible:border",
                "transition-[border-color] duration-150"
              )}
            />
          </div>
        </div>

        {query && (
          <div className="w-full max-w-[1400px] mx-auto px-6 mt-4">
            <Tabs defaultValue="results" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="results" className="flex-1">Search Results</TabsTrigger>
                <TabsTrigger value="bookmarks" className="flex-1">
                  Bookmarked ({bookmarkedDomains.size})
                </TabsTrigger>
                <TabsTrigger value="social" className="flex-1">Social Handles</TabsTrigger>
              </TabsList>
              
              <div className="mt-6 tabs-container">
                <TabsContent value="results" className="min-h-[600px]">
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-start justify-between w-full gap-y-4">
                      <div className="flex-1 min-w-[280px] mr-4 h-[36px]">
                        <DomainFilters 
                          filters={filters} 
                          onFiltersChange={setFilters}
                          sortBy={sortBy}
                          onSortChange={setSortBy}
                          isSemanticMode={searchMode === 'semantic'}
                        />
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Label htmlFor="search-mode" className="text-sm text-muted-foreground">
                          Semantic search
                        </Label>
                        <Switch
                          id="search-mode"
                          checked={searchMode === 'semantic'}
                          onCheckedChange={(checked) => setSearchMode(checked ? 'semantic' : 'tld')}
                        />
                      </div>
                    </div>

                    {searchMode === 'semantic' ? (
                      <div className="space-y-8">
                        {/* Domain Hacks */}
                        <section className="space-y-3">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-medium text-muted-foreground">Domain Hacks</h3>
                            <Tooltip delayDuration={0}>
                              <TooltipTrigger asChild>
                                <button className="inline-flex">
                                  <InfoIcon className="h-4 w-4 text-muted-foreground/50 hover:text-muted-foreground/80 transition-colors" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent 
                                side="top" 
                                className="max-w-[240px] px-4 py-2 text-xs font-light leading-tight text-white/90"
                                sideOffset={12}
                              >
                                Domains that use the extension to complete the word (youtu.be)
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {isLoading ? (
                              // Show skeleton cards while loading
                              Array.from({ length: 2 }).map((_, i) => (
                                <div 
                                  key={i} 
                                  className="p-3 rounded-lg border border-border hover:border-foreground/20 bg-white"
                                >
                                  <div className="flex items-center justify-between pr-8">
                                    <div className="w-32 h-5 bg-neutral-100 rounded animate-pulse" />
                                    <div className="w-14 h-4 bg-neutral-100 rounded animate-pulse" />
                                  </div>
                                </div>
                              ))
                            ) : filterByPrice(semanticResults.hacks).length > 0 ? (
                              sortDomains(filterByPrice(semanticResults.hacks)).map(result => (
                                <DomainCard 
                                  key={result.name + result.tld}
                                  result={result}
                                  bookmarked={bookmarkedDomains.has(`${result.name}${result.tld}`)}
                                  onBookmark={handleBookmark}
                                  onSelect={() => {}}
                                />
                              ))
                            ) : semanticResults.hacks.length > 0 ? (
                              <div className="col-span-full py-8 text-center text-sm text-muted-foreground">
                                <p>No domains match the selected price range</p>
                                <p className="mt-1">Try adjusting your filters</p>
                              </div>
                            ) : (
                              <div className="col-span-full py-8 text-center text-sm text-muted-foreground">
                                <p>No domain hacks found for "{query}"</p>
                                <p className="mt-1">Try something like "spotify" → "spoti.fy" or "google" → "goo.gl"</p>
                              </div>
                            )}
                          </div>
                        </section>

                        {/* Synonyms */}
                        <section className="space-y-3">
                          <h3 className="text-sm font-medium text-muted-foreground">Similar Words</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {isLoading ? (
                              // Show skeleton cards while loading
                              Array.from({ length: 5 }).map((_, i) => (
                                <div 
                                  key={i} 
                                  className="p-3 rounded-lg border border-border hover:border-foreground/20 bg-white"
                                >
                                  <div className="flex items-center justify-between pr-8">
                                    <div className="w-32 h-4 bg-neutral-100 rounded animate-pulse" />
                                    <div className="w-14 h-3.5 bg-neutral-100 rounded animate-pulse" />
                                  </div>
                                </div>
                              ))
                            ) : filterByPrice(semanticResults.synonyms).length > 0 ? (
                              sortDomains(filterByPrice(semanticResults.synonyms)).map(result => (
                                <DomainCard 
                                  key={result.name + result.tld}
                                  result={result}
                                  bookmarked={bookmarkedDomains.has(`${result.name}${result.tld}`)}
                                  onBookmark={handleBookmark}
                                  onSelect={() => {}}
                                />
                              ))
                            ) : semanticResults.synonyms.length > 0 ? (
                              <div className="col-span-full py-8 text-center text-sm text-muted-foreground">
                                <p>No domains match the selected price range</p>
                                <p className="mt-1">Try adjusting your filters</p>
                              </div>
                            ) : (
                              <div className="col-span-full py-8 text-center text-sm text-muted-foreground">
                                <p>No similar words found for "{query}"</p>
                          
                              </div>
                            )}
                          </div>
                        </section>

                        {/* Brandable Names */}
                        <section className="space-y-3">
                          <h3 className="text-sm font-medium text-muted-foreground">Brandable Names</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {isLoading ? (
                              // Show skeleton cards while loading
                              Array.from({ length: 5 }).map((_, i) => (
                                <div 
                                  key={i} 
                                  className="p-3 rounded-lg border border-border hover:border-foreground/20 bg-white"
                                >
                                  <div className="flex items-center justify-between pr-8">
                                    <div className="w-32 h-4 bg-neutral-100 rounded animate-pulse" />
                                    <div className="w-14 h-3.5 bg-neutral-100 rounded animate-pulse" />
                                  </div>
                                </div>
                              ))
                            ) : filterByPrice(semanticResults.brandable).length > 0 ? (
                              sortDomains(filterByPrice(semanticResults.brandable)).map(result => (
                                <DomainCard 
                                  key={result.name + result.tld}
                                  result={result}
                                  bookmarked={bookmarkedDomains.has(`${result.name}${result.tld}`)}
                                  onBookmark={handleBookmark}
                                  onSelect={() => {}}
                                />
                              ))
                            ) : semanticResults.brandable.length > 0 ? (
                              <div className="col-span-full py-8 text-center text-sm text-muted-foreground">
                                <p>No domains match the selected price range</p>
                                <p className="mt-1">Try adjusting your filters</p>
                              </div>
                            ) : (
                              <div className="col-span-full py-8 text-center text-sm text-muted-foreground">
                                <p>No brandable variations found for "{query}"</p>
                        
                              </div>
                            )}
                          </div>
                        </section>
                      </div>
                    ) : (
                      <DomainResults 
                        results={filteredResults}
                        bookmarkedDomains={bookmarkedDomains}
                        onBookmark={handleBookmark}
                        onDomainSelect={() => {}}
                        sortBy={sortBy}
                        filters={{
                          tldCategory: filters.tldCategory as "local" | "creative" | "tech" | "business" | "all"
                        }}
                      />
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="bookmarks" className="min-h-[600px]">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-medium tracking-tight text-foreground">Bookmarked Domains</h2>
                      <Button onClick={toggleCompare} disabled={bookmarkedDomains.size < 2}>
                        {isComparing ? 'Exit Comparison' : 'Compare Domains'}
                      </Button>
                    </div>
                    {bookmarkedDomains.size === 0 ? (
                      <div className="text-center py-16 px-4 border border-border rounded-lg bg-white">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg border border-border bg-white mb-6">
                          <Bookmark className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-3">No bookmarked domains</h3>
                        <p className="text-base text-muted-foreground">
                          Save domains to easily compare them
                        </p>
                      </div>
                    ) : isComparing ? (
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
                        sortBy={sortBy}
                        filters={{
                          tldCategory: filters.tldCategory as "local" | "creative" | "tech" | "business" | "all"
                        }}
                      />
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="social" className="min-h-[600px]">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center h-[36px]">
                      <h2 className="text-2xl font-medium tracking-tight text-foreground">Social Handle Availability</h2>
                      <div className="w-[140px]"></div>
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

