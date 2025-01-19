import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Bookmark } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Checkbox } from '@/components/ui/checkbox'

interface BookmarksViewProps {
  bookmarkedDomains: Set<string>
  onRemoveBookmark: (domain: string) => void
  onSelectDomain: (domain: string) => void
  selectedDomains: Set<string>
  onToggleSelect: (domain: string) => void
}

export function BookmarksView({
  bookmarkedDomains,
  onRemoveBookmark,
  onSelectDomain,
  selectedDomains,
  onToggleSelect
}: BookmarksViewProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-9"
        >
          <Bookmark className="h-4 w-4 mr-2" />
          Bookmarks ({bookmarkedDomains.size})
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Bookmarked Domains</SheetTitle>
          <SheetDescription>
            Manage your bookmarked domains
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-2">
          {Array.from(bookmarkedDomains).map((domain) => (
            <Card
              key={domain}
              className="p-4 flex items-center justify-between cursor-pointer hover:border-blue-500"
              onClick={() => onSelectDomain(domain)}
            >
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={selectedDomains.has(domain)}
                  onCheckedChange={() => onToggleSelect(domain)}
                />
                <span className="font-mono">{domain}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-6 w-6 rounded-full text-blue-500"
                onClick={(e) => {
                  e.stopPropagation()
                  onRemoveBookmark(domain)
                }}
              >
                <Bookmark className="h-4 w-4" fill="currentColor" />
              </Button>
            </Card>
          ))}
          {bookmarkedDomains.size === 0 && (
            <div className="text-center text-muted-foreground py-8">
              No bookmarked domains yet
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

