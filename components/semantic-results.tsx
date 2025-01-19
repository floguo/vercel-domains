import { DomainCard } from "./domain-card"

interface DomainSuggestion {
  name: string
  tld: string
  type: 'exact' | 'hack' | 'semantic' | 'creative'
  available: boolean
  price?: number
  explanation?: string
}

interface SemanticResultsProps {
  results: DomainSuggestion[]
  bookmarkedDomains: Set<string>
  onBookmark: (domain: string) => void
  onDomainSelect: (domain: DomainSuggestion) => void
}

export function SemanticResults({
  results,
  bookmarkedDomains,
  onBookmark,
  onDomainSelect
}: SemanticResultsProps) {
  return (
    <div className="space-y-8">
      {/* Domain Hacks */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Domain Hacks</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {results.filter(r => r.type === 'hack').map(result => (
            <DomainCard 
              key={result.name + result.tld}
              result={result}
              bookmarked={bookmarkedDomains.has(`${result.name}${result.tld}`)}
              onBookmark={() => onBookmark(`${result.name}${result.tld}`)}
              onSelect={() => onDomainSelect(result)}
            />
          ))}
        </div>
      </section>

      {/* Semantic Alternatives */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Semantic Alternatives</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {results.filter(r => r.type === 'semantic').map(result => (
            <DomainCard 
              key={result.name + result.tld}
              result={result}
              bookmarked={bookmarkedDomains.has(`${result.name}${result.tld}`)}
              onBookmark={() => onBookmark(`${result.name}${result.tld}`)}
              onSelect={() => onDomainSelect(result)}
              showExplanation
            />
          ))}
        </div>
      </section>
    </div>
  )
} 