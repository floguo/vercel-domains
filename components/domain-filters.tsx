'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SlidersHorizontal } from 'lucide-react'

export interface Filters {
  priceRange: string
  tldCategory: string
  maxLength: number
  availability: string
  special: boolean
}

interface DomainFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

export function DomainFilters({ filters, onFiltersChange }: DomainFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Select
        value={filters.priceRange}
        onValueChange={(value) => onFiltersChange({ ...filters, priceRange: value })}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="All prices" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All prices</SelectItem>
          <SelectItem value="under-10">Under $10</SelectItem>
          <SelectItem value="under-50">Under $50</SelectItem>
          <SelectItem value="under-100">Under $100</SelectItem>
          <SelectItem value="premium">Premium ($100+)</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.tldCategory}
        onValueChange={(value) => onFiltersChange({ ...filters, tldCategory: value })}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="All TLDs" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All TLDs</SelectItem>
          <SelectItem value="tech">.dev, .io, .tech</SelectItem>
          <SelectItem value="business">.com, .co, .inc</SelectItem>
          <SelectItem value="creative">.design, .art</SelectItem>
          <SelectItem value="local">.us, .uk, .de</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.availability}
        onValueChange={(value) => onFiltersChange({ ...filters, availability: value })}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Availability" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Show all</SelectItem>
          <SelectItem value="available">Available only</SelectItem>
          <SelectItem value="premium">Premium only</SelectItem>
          <SelectItem value="taken">Taken (with offers)</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="relevant">
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevant">Most relevant</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="length-asc">Length: Short to Long</SelectItem>
          <SelectItem value="length-desc">Length: Long to Short</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" size="sm" className="h-9 text-sm">
        <SlidersHorizontal className="mr-2 h-4 w-4" />
        More filters
      </Button>
    </div>
  )
}

