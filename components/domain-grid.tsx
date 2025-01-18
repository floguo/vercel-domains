import { DomainBookmark } from './domain-bookmark'
import { cn } from '@/lib/utils'

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
  onDomainSelect: (domain: string) => void
}

export function DomainGrid({
  results,
  bookmarkedDomains,
  onBookmark,
  onDomainSelect
}: DomainGridProps) {
  // Group results into rows of 4 for the grid
  const rows = results.reduce<DomainResult[][]>((acc, result, i) => {
    const rowIndex = Math.floor(i / 4)
    if (!acc[rowIndex]) {
      acc[rowIndex] = []
    }
    acc[rowIndex].push(result)
    return acc
  }, [])

  return (
    <div className="w-full space-y-1">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-4 gap-4">
          {row.map((domain) => {
            const fullDomain = `${domain.name}${domain.tld}`
            return (
              <div
                key={fullDomain}
                className="group flex items-center justify-between py-2 px-1 hover:bg-accent/50 rounded-lg cursor-pointer"
                onClick={() => onDomainSelect(fullDomain)}
              >
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-sm",
                    !domain.available && "line-through text-muted-foreground/60"
                  )}>
                    {domain.name}{domain.tld}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <DomainBookmark
                      domain={fullDomain}
                      onBookmark={onBookmark}
                      isBookmarked={bookmarkedDomains.has(fullDomain)}
                    />
                  </div>
                </div>
                {domain.available && domain.price && (
                  <span className="text-sm text-blue-500 tabular-nums">
                    ${(domain.price / 100).toFixed(2)}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

