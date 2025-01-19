import { cn } from '@/lib/utils'
import { DomainBookmark } from './domain-bookmark'

interface DomainCardProps {
  result: {
    name: string
    tld: string
    available: boolean
    price?: number
    explanation?: string
  }
  bookmarked: boolean
  onBookmark: (domain: string) => void
  onSelect: () => void
  showExplanation?: boolean
}

export function DomainCard({
  result,
  bookmarked,
  onBookmark,
  onSelect,
  showExplanation
}: DomainCardProps) {
  const domain = `${result.name}${result.tld}`
  
  return (
    <div 
      className="relative group p-3 rounded-lg border hover:border-foreground/30 hover:shadow-[0_2px_8px_0_rgba(0,0,0,0.04)] transition-all cursor-pointer"
      onClick={onSelect}
    >
      <div className="absolute right-2 top-2.5">
        <DomainBookmark
          domain={domain}
          onBookmark={onBookmark}
          isBookmarked={bookmarked}
        />
      </div>

      <div className="space-y-2">
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

        {showExplanation && result.explanation && (
          <p className="text-xs text-muted-foreground">
            {result.explanation}
          </p>
        )}
      </div>
    </div>
  )
} 