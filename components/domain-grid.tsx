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
  const popular = results.filter(r => ['com', 'net', 'org', 'io', 'co', 'me', 'ai'].includes(r.tld.slice(1)))
  const tech = results.filter(r => ['dev', 'tech', 'app', 'codes', 'digital', 'network', 'systems'].includes(r.tld.slice(1)))
  const business = results.filter(r => ['inc', 'company', 'business', 'agency', 'consulting', 'management'].includes(r.tld.slice(1)))
  const creative = results.filter(r => ['design', 'studio', 'media', 'art', 'photography', 'gallery'].includes(r.tld.slice(1)))
  const ecommerce = results.filter(r => ['shop', 'store', 'market', 'shopping'].includes(r.tld.slice(1)))
  const other = results.filter(r => !['com', 'net', 'org', 'io', 'co', 'me', 'ai', 'dev', 'tech', 'app', 'codes', 'digital', 'network', 'systems', 'inc', 'company', 'business', 'agency', 'consulting', 'management', 'design', 'studio', 'media', 'art', 'photography', 'gallery', 'shop', 'store', 'market', 'shopping'].includes(r.tld.slice(1)))

  return (
    <div className="space-y-8">
      {popular.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Popular</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {popular.map(result => (
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
      )}

      {tech.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Technology</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {tech.map(result => (
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
      )}

      {business.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Business</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {business.map(result => (
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
      )}

      {creative.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Creative & Media</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {creative.map(result => (
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
      )}

      {ecommerce.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">E-commerce</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {ecommerce.map(result => (
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
      )}

      {other.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Other</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {other.map(result => (
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
      )}
    </div>
  )
}

