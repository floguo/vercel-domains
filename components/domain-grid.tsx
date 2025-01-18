import { cn } from '@/lib/utils'
import { DomainBookmark } from './domain-bookmark'

interface DomainResult {
  name: string
  tld: string
  available: boolean
  price?: number
  isPremium?: boolean
  type: 'exact' | 'semantic' | 'creative'
  description?: string
}

interface DomainGridProps {
  results: DomainResult[]
  bookmarkedDomains: Set<string>
  onBookmark: (domain: string) => void
  onDomainSelect: (domain: DomainResult) => void
}

export function DomainGrid({
  results,
  bookmarkedDomains,
  onBookmark,
  onDomainSelect
}: DomainGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
      {results.map((result) => {
        const domain = `${result.name}${result.tld}`
        const isBookmarked = bookmarkedDomains.has(domain)
        
        return (
          <div 
            key={domain} 
            className="relative group p-3 rounded-lg border hover:border-foreground cursor-pointer"
            onClick={() => onDomainSelect(result)}
          >
            <div className="absolute right-2 top-2">
              <DomainBookmark
                domain={domain}
                onBookmark={onBookmark}
                isBookmarked={isBookmarked}
              />
            </div>

            <div className="flex items-center justify-between pr-8">
              <span className={cn(
                "text-sm font-medium",
                !result.available && "line-through text-muted-foreground"
              )}>
                {result.name}{result.tld}
              </span>
              {result.available && result.price && (
                <span className="text-xs text-blue-500 tabular-nums">
                  ${(result.price / 100).toFixed(2)}
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

