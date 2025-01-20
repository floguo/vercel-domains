import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface SocialHandleCheckerProps {
  handle: string
}

export function SocialHandleChecker({ handle }: SocialHandleCheckerProps) {
  const [results, setResults] = useState<Array<{ platform: string; available: boolean }>>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!handle) return

    const checkHandles = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/check-social-handles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ handle })
        })
        const data = await response.json()
        setResults(data)
      } catch (error) {
        console.error('Error checking handles:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkHandles()
  }, [handle])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {isLoading ? (
        Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center p-4 rounded-lg border border-border bg-white">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-5 h-5 rounded-full bg-muted animate-pulse" />
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
            </div>
            <div className="w-16 h-5 bg-muted animate-pulse rounded-full" />
          </div>
        ))
      ) : (
        results.map(({ platform, available }) => (
          <div
            key={platform}
            className="flex items-center justify-between p-3 rounded-lg border border-border bg-white"
          >
            <span className="text-sm font-medium">{platform}</span>
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full font-medium",
              available 
                ? "bg-green-50 text-green-800" 
                : "bg-red-50 text-red-700"
            )}>
              {available ? 'Available' : 'Taken'}
            </span>
          </div>
        ))
      )}
    </div>
  )
}

