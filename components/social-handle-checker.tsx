import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'

interface SocialHandleCheckerProps {
  handle: string
}

interface SocialResult {
  platform: string
  available: boolean
  url?: string
}

export function SocialHandleChecker({ handle }: SocialHandleCheckerProps) {
  const [results, setResults] = useState<SocialResult[]>([])
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
        Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="flex items-center p-3 rounded-lg border border-border bg-white">
            <div className="flex items-center gap-3 flex-1">
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
            </div>
            <div className="w-16 h-5 bg-muted animate-pulse rounded-full" />
          </div>
        ))
      ) : (
        results.map(({ platform, available, url }) => (
          <div
            key={platform}
            className="flex items-center justify-between p-3 rounded-lg border border-border bg-white"
          >
            <span className="text-sm font-medium">{platform}</span>
            {available ? (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-50 text-green-800">
                Available
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-red-50 text-red-700">
                  Taken
                </span>
                {url && (
                  <a 
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}

