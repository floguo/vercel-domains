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
import { useState } from 'react'
import { MoreFiltersDialog } from './more-filters-dialog'

export interface Filters {
  priceRange: string
  tldCategory: string
  maxLength: number
  availability: string
  special: boolean
  showPremium: boolean
  showTaken: boolean
}

interface DomainFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  sortBy: string
  onSortChange: (value: string) => void
  isSemanticMode?: boolean
}

export function DomainFilters({ 
  filters, 
  onFiltersChange, 
  sortBy, 
  onSortChange,
  isSemanticMode = false
}: DomainFiltersProps) {
  const [openFilter, setOpenFilter] = useState<string | null>(null)

  const handleClearFilters = () => {
    onFiltersChange({
      ...filters,
      priceRange: 'all',
      tldCategory: 'all'
    })
    onSortChange('relevant')
  }

  const hasActiveFilters = filters.priceRange !== 'all' || filters.tldCategory !== 'all' || sortBy !== 'relevant'

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-wrap gap-2">
        <Select
          value={filters.priceRange}
          onValueChange={(value) => {
            onFiltersChange({ ...filters, priceRange: value })
            setOpenFilter(null)
          }}
          open={openFilter === 'price'}
          onOpenChange={(open) => setOpenFilter(open ? 'price' : null)}
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

        {!isSemanticMode && (
          <Select
            value={filters.tldCategory}
            onValueChange={(value) => {
              onFiltersChange({ ...filters, tldCategory: value })
              setOpenFilter(null)
            }}
            open={openFilter === 'tld'}
            onOpenChange={(open) => setOpenFilter(open ? 'tld' : null)}
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
        )}

        <Select 
          value={sortBy} 
          onValueChange={(value) => {
            onSortChange(value)
            setOpenFilter(null)
          }}
          open={openFilter === 'sort'}
          onOpenChange={(open) => setOpenFilter(open ? 'sort' : null)}
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

        <MoreFiltersDialog 
          filters={filters}
          onFiltersChange={onFiltersChange}
        />
      </div>

      {hasActiveFilters && (
        <button
          onClick={handleClearFilters}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 underline"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}

