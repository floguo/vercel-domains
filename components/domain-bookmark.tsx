import { Bookmark } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DomainBookmarkProps {
  domain: string
  onBookmark: (domain: string) => void
  isBookmarked: boolean
}

export function DomainBookmark({ domain, onBookmark, isBookmarked }: DomainBookmarkProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`p-0 h-6 w-6 rounded-full ${isBookmarked ? 'text-blue-500' : 'text-gray-400'}`}
            onClick={(e) => {
              e.stopPropagation()
              onBookmark(domain)
            }}
          >
            <Bookmark 
              className="h-4 w-4" 
              fill={isBookmarked ? "currentColor" : "none"}
              strokeWidth={isBookmarked ? 0 : 2}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isBookmarked ? 'Remove bookmark' : 'Bookmark domain'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

