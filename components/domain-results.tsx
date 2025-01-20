import { DomainGrid } from './domain-grid'
import { DomainCard } from './domain-card'

interface DomainResult {
  name: string
  tld: string
  available: boolean
  price?: number
  isPremium?: boolean
  type: 'exact' | 'semantic' | 'creative'
  description?: string
}

interface DomainResultsProps {
  results: DomainResult[]
  bookmarkedDomains: Set<string>
  onBookmark: (domain: string) => void
  onDomainSelect: (domain: DomainResult) => void
  sortBy: string
  filters: {
    tldCategory: 'all' | 'tech' | 'business' | 'creative' | 'local'
  }
}

export function DomainResults({
  results,
  bookmarkedDomains,
  onBookmark,
  onDomainSelect,
  sortBy,
  filters
}: DomainResultsProps) {
  // First filter results
  const filteredResults = results.filter(result => {
    // Filter by TLD category
    if (filters.tldCategory !== 'all') {
      const tld = result.tld.slice(1) // Remove the dot
      switch (filters.tldCategory) {
        case 'tech':
          return ['dev', 'io', 'tech', 'app', 'codes', 'digital', 'network', 'systems'].includes(tld)
        case 'business':
          return ['com', 'co', 'inc', 'company', 'business', 'agency', 'consulting', 'management'].includes(tld)
        case 'creative':
          return ['design', 'studio', 'art', 'media', 'photography', 'gallery'].includes(tld)
        case 'local':
          return ['us', 'uk', 'de', 'fr', 'es', 'it'].includes(tld)
        default:
          return true
      }
    }
    return true
  })

  // Then sort the filtered results
  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return (a.price || 0) - (b.price || 0)
      case 'price-desc':
        return (b.price || 0) - (a.price || 0)
      default:
        return 0
    }
  })

  return (
    <div className="space-y-4">
      {sortedResults.length > 0 ? (
        <DomainGrid 
          results={sortedResults}
          bookmarkedDomains={bookmarkedDomains}
          onBookmark={onBookmark}
          onDomainSelect={onDomainSelect}
        />
      ) : (
        <div className="text-center text-muted-foreground">
          No domains found. Try adjusting your search or filters.
        </div>
      )}
    </div>
  )
}

