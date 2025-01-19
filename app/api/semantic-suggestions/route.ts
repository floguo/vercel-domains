import { NextResponse } from 'next/server'

const DATAMUSE_BASE = 'https://api.datamuse.com'

interface DatamuseWord {
  word: string
  score: number
  tags?: string[]
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

export async function POST(request: Request) {
  try {
    const { query } = await request.json()
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }

    const [meaningLike, triggers, soundsLike] = await Promise.all([
      fetch(`${DATAMUSE_BASE}/words?ml=${query}&max=5`).then(r => r.json()),
      fetch(`${DATAMUSE_BASE}/words?rel_trg=${query}&max=5`).then(r => r.json()),
      fetch(`${DATAMUSE_BASE}/words?sl=${query}&max=5`).then(r => r.json()),
    ])

    return NextResponse.json({
      hacks: generateDomainHacks(query),
      synonyms: formatSuggestions(meaningLike, 'semantic'),
      related: formatSuggestions(triggers, 'semantic'),
      brandable: formatSuggestions(soundsLike, 'creative')
    })
  } catch (error) {
    console.error('Semantic suggestions error:', error)
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    )
  }
} 