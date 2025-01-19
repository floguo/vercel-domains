export async function generateSemanticSuggestions(query: string) {
  const response = await fetch('/api/semantic-suggestions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query })
  })

  if (!response.ok) {
    throw new Error('Failed to fetch semantic suggestions')
  }

  return response.json()
}

interface DomainSuggestion {
  name: string
  tld: string
  type: 'hack' | 'semantic' | 'creative'
  available: boolean
  price: number
  explanation: string
}

function generateDomainHacks(word: string): Array<DomainSuggestion> {
  const hacks = [
    { name: word.slice(0, -2), tld: `.${word.slice(-2)}` }, // e.g., "fast" -> "fa.st"
    { name: word.slice(0, -3), tld: `.${word.slice(-3)}` }, // e.g., "deliver" -> "del.iver"
  ]

  return hacks
    .filter(h => h.name.length > 1) // Ensure name is reasonable length
    .map(h => ({
      ...h,
      type: 'hack' as const,
      available: true,
      price: 2900,
      explanation: `Domain hack for "${word}"`
    }))
}

interface DatamuseWord {
  word: string
  score: number
}

function formatSuggestions(words: DatamuseWord[], type: 'semantic' | 'creative'): Array<DomainSuggestion> {
  const tlds = ['.com', '.io', '.dev', '.co', '.app']
  
  return words.map(w => ({
    name: w.word,
    tld: tlds[Math.floor(Math.random() * tlds.length)],
    type,
    available: true,
    price: 1200 + Math.floor(Math.random() * 2000),
    explanation: type === 'semantic' 
      ? `Similar to "${w.word}" in meaning`
      : `Creative variation based on sound`
  }))
} 