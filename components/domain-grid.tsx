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
  category?: string
}

// Move type definition before TLD_CATEGORIES
type CategoryKey = keyof typeof TLD_CATEGORIES

// Define TLD categories
const TLD_CATEGORIES = {
  popular: {
    title: 'Popular',
    tlds: ['.com', '.net', '.org', '.io', '.co', '.me', '.ai']
  },
  technology: {
    title: 'Technology',
    tlds: ['.dev', '.tech', '.app', '.codes', '.digital', '.network', '.systems']
  },
  business: {
    title: 'Business',
    tlds: ['.inc', '.ltd', '.company', '.business', '.enterprises', '.agency', '.consulting', '.management']
  },
  creative: {
    title: 'Creative & Media',
    tlds: ['.design', '.studio', '.art', '.media', '.photography', '.gallery', '.pictures']
  },
  lifestyle: {
    title: 'Lifestyle',
    tlds: ['.life', '.style', '.fashion', '.fitness', '.cafe', '.food', '.house', '.boutique']
  },
  professional: {
    title: 'Professional',
    tlds: ['.pro', '.expert', '.consulting', '.legal', '.finance', '.tax', '.accountants']
  },
  ecommerce: {
    title: 'E-commerce',
    tlds: ['.shop', '.store', '.market', '.shopping', '.bargains', '.discount', '.deals']
  },
  education: {
    title: 'Education',
    tlds: ['.education', '.academy', '.institute', '.school', '.training', '.university', '.mba']
  },
  other: {
    title: 'Other',
    tlds: ['.world', '.today', '.live', '.guide', '.plus', '.club', '.zone']
  }
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
  // Group results by category
  const groupedResults = results.reduce((acc, result) => {
    const category = (Object.entries(TLD_CATEGORIES).find(([_, cat]) => 
      cat.tlds.includes(result.tld)
    )?.[0] as CategoryKey) || 'other'
    
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(result)
    return acc
  }, {} as Record<CategoryKey, DomainResult[]>)

  return (
    <div className="space-y-8">
      {Object.entries(groupedResults).map(([category, domains]) => (
        <section key={category} className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">
            {TLD_CATEGORIES[category as CategoryKey]?.title || 'Other TLDs'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {domains.map((result) => {
              const domain = `${result.name}${result.tld}`
              const isBookmarked = bookmarkedDomains.has(domain)
              
              return (
                <div 
                  key={domain} 
                  className="relative group p-3 rounded-lg border hover:border-foreground/30 hover:shadow-[0_2px_8px_0_rgba(0,0,0,0.04)] transition-all cursor-pointer"
                  onClick={() => onDomainSelect(result)}
                >
                  <div className="absolute right-2 top-2.5">
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
        </section>
      ))}
    </div>
  )
}

