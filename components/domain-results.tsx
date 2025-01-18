import { DomainGrid } from './domain-grid'

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
  onDomainSelect: (domain: string) => void
}

export function DomainResults({
  results,
  bookmarkedDomains,
  onBookmark,
  onDomainSelect
}: DomainResultsProps) {
  return (
    <div className="space-y-4">
      {results.length > 0 ? (
        <DomainGrid 
          results={results}
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

