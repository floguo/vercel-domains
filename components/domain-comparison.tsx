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
  domains: DomainResult[]
  onClose: () => void
}

export function DomainComparison({ domains, onClose }: DomainComparisonProps) {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Domain</TableHead>
            <TableHead>Available</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {domains.map((domain, i) => (
            <TableRow key={i}>
              <TableCell className="">
                {domain.name}{domain.tld}
              </TableCell>
              <TableCell>{domain.available ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                {domain.available && domain.price
                  ? `$${(domain.price / 100).toFixed(2)}`
                  : '-'}
              </TableCell>
              <TableCell>{domain.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

