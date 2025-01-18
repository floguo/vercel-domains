import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Check, X, Loader2 } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SocialPlatformResult {
  platform: string
  available: boolean
  url: string
}

export function SocialHandleChecker() {
  const [handle, setHandle] = useState('')
  const [results, setResults] = useState<SocialPlatformResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkAvailability = async () => {
    if (!handle) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/check-social-handles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ handle }),
      })

      if (!response.ok) {
        throw new Error('Failed to check social handles')
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError('An error occurred while checking social handles. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-normal">Social Handle Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-6">
          <Input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="Enter a username"
            className="flex-grow"
          />
          <Button onClick={checkAvailability} disabled={isLoading || !handle}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Check'}
          </Button>
        </div>

        {error && (
          <div className="text-red-500 mb-4">{error}</div>
        )}

        {results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {results.map((result) => (
              <Card
                key={result.platform}
                className={`flex items-center justify-between p-4 ${
                  result.available ? 'border-green-500/50' : 'border-red-500/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`rounded-full p-1 ${
                    result.available ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {result.available ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <X className="h-4 w-4" />
                    )}
                  </div>
                  <span className="font-medium">{result.platform}</span>
                </div>
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  View
                </a>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

