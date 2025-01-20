import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DomainResult {
  name: string
  tld: string
  available: boolean
  price?: number
  isPremium?: boolean
  type: 'exact' | 'semantic' | 'creative'
  description?: string
}

interface DomainComparisonProps {
  domains: Array<{
    name: string
    tld: string
    available: boolean
    price?: number
    type: string
  }>
  onClose: () => void
}

export function DomainComparison({ domains, onClose }: DomainComparisonProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-white">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border/60">
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">Domain</th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">Availability</th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">Price</th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">Renewal</th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">SEO Potential</th>
          </tr>
        </thead>
        <tbody>
          {domains.map((domain) => (
            <tr key={domain.name + domain.tld} className="border-b border-border/40 last:border-0">
              <td className="p-4 text-sm font-medium">
                {domain.name}{domain.tld}
              </td>
              <td className="p-4 text-sm">
                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                  domain.available 
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}>
                  {domain.available ? 'Available' : 'Taken'}
                </span>
              </td>
              <td className="p-4 text-sm">
                ${domain.price ? (domain.price / 100).toFixed(2) : '-'}
              </td>
              <td className="p-4 text-sm">
                {domain.price ? `$${((domain.price * 0.8) / 100).toFixed(2)}/year` : '-'}
              </td>
              <td className="p-4 text-sm">
                {domain.tld === '.com' ? 'High' : domain.tld === '.io' ? 'Medium' : 'Low'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

