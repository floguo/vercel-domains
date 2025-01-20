import { cn } from '@/lib/utils'
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
  // Group domains by category
  const groupedDomains = results.reduce((acc, domain) => {
    const categories = {
      'Popular': ['.com', '.net', '.org', '.io', '.co', '.me', '.ai'],
      'Technology & Software': ['.dev', '.tech', '.app', '.software', '.computer', '.cloud', '.digital', '.network', '.systems', '.codes', '.tools', '.space'],
      'Business & Professional': ['.inc', '.company', '.business', '.agency', '.consulting', '.management', '.services', '.solutions', '.ventures', '.limited', '.group', '.zone'],
      'Creative & Media': ['.design', '.studio', '.media', '.art', '.photography', '.gallery', '.graphics', '.video', '.film', '.productions', '.live'],
      'E-commerce & Shopping': ['.shop', '.store', '.market', '.shopping', '.sale', '.deals', '.buy', '.discount'],
      'Local/Regional': ['.us', '.uk', '.eu', '.de', '.fr', '.es', '.it', '.au'],
      'Education & Community': ['.academy', '.guide', '.club'],
      'Generic/Other': ['.world', '.plus', '.life']
    }

    // Find which category this domain belongs to
    const category = Object.entries(categories).find(([_, tlds]) => 
      tlds.includes(domain.tld)
    )?.[0] || 'Other'

    return {
      ...acc,
      [category]: [...(acc[category] || []), domain]
    }
  }, {} as Record<string, typeof results>)

  return (
    <div className="space-y-8">
      {Object.entries(groupedDomains).map(([category, domains]) => (
        <section key={category} className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">{category}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {domains.map(result => (
              <DomainCard
                key={result.name + result.tld}
                result={result}
                bookmarked={bookmarkedDomains.has(`${result.name}${result.tld}`)}
                onBookmark={onBookmark}
                onSelect={() => onDomainSelect(result)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

