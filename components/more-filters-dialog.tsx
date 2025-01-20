'use client'

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { SlidersHorizontal } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Filters } from './domain-filters'
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"

interface MoreFiltersDialogProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

export function MoreFiltersDialog({ filters, onFiltersChange }: MoreFiltersDialogProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-10 bg-white text-sm font-normal"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          More filters
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Refine your domain search with additional filters.
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Special characters</Label>
              <div className="text-sm text-muted-foreground">
                Include domains with hyphens and numbers
              </div>
            </div>
            <Switch
              checked={filters.special}
              onCheckedChange={(checked) => 
                onFiltersChange({ ...filters, special: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Available only</Label>
              <div className="text-sm text-muted-foreground">
                Hide domains that are already taken
              </div>
            </div>
            <Switch
              checked={filters.availability === 'available'}
              onCheckedChange={(checked) => 
                onFiltersChange({ ...filters, availability: checked ? 'available' : 'all' })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Taken domains</Label>
              <div className="text-sm text-muted-foreground">
                Include domains with transfer offers
              </div>
            </div>
            <Switch
              checked={filters.showTaken}
              onCheckedChange={(checked) => 
                onFiltersChange({ ...filters, showTaken: checked })
              }
            />
          </div>

          <div className="space-y-3">
            <div className="space-y-0.5">
              <Label>Maximum length</Label>
              <div className="text-sm text-muted-foreground">
                Limit the number of characters
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Slider
                value={[filters.maxLength]}
                min={3}
                max={63}
                step={1}
                onValueChange={([value]) => 
                  onFiltersChange({ ...filters, maxLength: value })
                }
                className="flex-1"
              />
              <span className="text-sm tabular-nums w-12">
                {filters.maxLength} chars
              </span>
            </div>
          </div>
        </div>

        <SheetFooter>
          <Button 
            variant="outline" 
            onClick={() => onFiltersChange({ 
              ...filters, 
              special: false,
              availability: 'all',
              maxLength: 63,
              showTaken: false
            })}
          >
            Reset filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
} 