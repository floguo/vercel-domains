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
        <div>Checking availability...</div>
      ) : (
        results.map(({ platform, available }) => (
          <div
            key={platform}
            className="p-3 rounded-lg border flex items-center justify-between"
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

