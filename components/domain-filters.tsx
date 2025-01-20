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
  sortBy: string
  onSortChange: (value: string) => void
}

export function DomainFilters({ filters, onFiltersChange, sortBy, onSortChange }: DomainFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Select
        value={filters.priceRange}
        onValueChange={(value) => onFiltersChange({ ...filters, priceRange: value })}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="All prices" />
        </SelectTrigger>
        <SelectContent 
          className="w-[200px]"
          position="popper"
          sideOffset={4}
        >
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
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="All TLDs" />
        </SelectTrigger>
        <SelectContent 
          className="w-[200px]"
          position="popper"
          sideOffset={4}
        >
          <SelectItem value="all">All TLDs</SelectItem>
          <SelectItem value="tech">Technology</SelectItem>
          <SelectItem value="business">Business</SelectItem>
          <SelectItem value="creative">Creative</SelectItem>
          <SelectItem value="local">Localized</SelectItem>
        </SelectContent>
      </Select>

      <Select 
        value={sortBy} 
        onValueChange={onSortChange}
      >
        <SelectTrigger className="w-[240px]">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Sort by:</span>
            <SelectValue defaultValue="Most relevant" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevant">Most relevant</SelectItem>
          <SelectItem value="price-asc">Price - Low to High</SelectItem>
          <SelectItem value="price-desc">Price - High to Low</SelectItem>
        </SelectContent>
      </Select>

      <Button 
        variant="outline" 
        size="sm" 
        className="h-10 bg-white text-sm font-normal"
      >
        <SlidersHorizontal className="mr-2 h-4 w-4" />
        More filters
      </Button>
    </div>
  )
}

