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
  const updateFilter = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  return (
    <div className="flex items-center justify-between w-full mb-6 space-x-2">
      <Select
        value={filters.priceRange}
        onValueChange={(value) => updateFilter('priceRange', value)}
      >
        <SelectTrigger className="h-9 text-sm">
          <SelectValue placeholder="Price range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All prices</SelectItem>
          <SelectItem value="0-50">Under $50</SelectItem>
          <SelectItem value="50-100">$50 - $100</SelectItem>
          <SelectItem value="100-500">$100 - $500</SelectItem>
          <SelectItem value="500+">$500+</SelectItem>
          <SelectItem value="premium">Premium domains</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.tldCategory}
        onValueChange={(value) => updateFilter('tldCategory', value)}
      >
        <SelectTrigger className="h-9 text-sm">
          <SelectValue placeholder="TLD Category" />
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
        onValueChange={(value) => updateFilter('availability', value)}
      >
        <SelectTrigger className="h-9 text-sm">
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
        <SelectTrigger className="h-9 text-sm">
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

