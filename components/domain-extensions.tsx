'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface TLD {
  extension: string
  available: boolean
  premium?: boolean
  price?: number
}

const POPULAR_TLDS: TLD[] = [
  { extension: 'com', available: false },
  { extension: 'net', available: true, price: 1200 },
  { extension: 'org', available: true, price: 900 },
  { extension: 'ai', available: true, price: 6900 },
  { extension: 'io', available: true, price: 4900 },
  { extension: 'xyz', available: true, price: 1200 },
  { extension: 'app', available: true, price: 2900 },
  { extension: 'shop', available: true, price: 2500 },
  { extension: 'info', available: true, price: 1800 },
  { extension: 'co', available: true, price: 2500 },
  { extension: 'store', available: true, price: 2900 },
  { extension: 'site', available: true, price: 2400 },
  { extension: 'online', available: true, price: 3900 },
  { extension: 'dev', available: true, price: 1500 },
  { extension: 'tech', available: true, price: 3900 },
]

const FEATURED_TLDS: TLD[] = [
  { extension: 'agency', available: true, price: 2900 },
  { extension: 'biz', available: true, price: 1900 },
  { extension: 'blog', available: true, price: 2900 },
  { extension: 'cloud', available: true, price: 1900 },
  { extension: 'design', available: true, price: 2900 },
  { extension: 'digital', available: true, price: 3500 },
  { extension: 'email', available: true, price: 2500 },
  { extension: 'global', available: true, price: 7900 },
  { extension: 'host', available: true, price: 2900 },
  { extension: 'link', available: true, price: 1900 },
  { extension: 'ltd', available: true, price: 2500 },
  { extension: 'me', available: true, price: 1900 },
  { extension: 'media', available: true, price: 2900 },
  { extension: 'page', available: true, price: 1200 },
  { extension: 'plus', available: true, price: 2900 },
  { extension: 'space', available: true, price: 1900 },
  { extension: 'studio', available: true, price: 2500 },
  { extension: 'world', available: true, price: 2900 },
  { extension: 'zone', available: true, price: 3200 },
]

export function DomainExtensions() {
  const [query] = useState('floguo')

  const renderTldButton = (tld: TLD) => (
    <Button
      key={tld.extension}
      variant="outline"
      className={`relative w-full justify-between group ${
        !tld.available ? 'bg-background/5' : 'hover:border-blue-500'
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-xs opacity-50">...</span>
        <span className={`${!tld.available ? 'text-muted-foreground/60 line-through' : ''}`}>
          .{tld.extension}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {tld.available && tld.price && (
          <span className="text-sm text-blue-500">${(tld.price / 100).toFixed(2)}</span>
        )}
        <ChevronDown className="h-4 w-4 text-muted-foreground/50" />
      </div>
    </Button>
  )

  return (
    <div className="w-full max-w-[1200px] mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-medium">Domain Extensions</h2>
          <p className="text-sm text-muted-foreground">
            Browse available TLDs for {query}
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Popular</h3>
            <span className="text-sm text-muted-foreground">
              {POPULAR_TLDS.length} extensions
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {POPULAR_TLDS.map(renderTldButton)}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Featured</h3>
            <span className="text-sm text-muted-foreground">
              {FEATURED_TLDS.length} extensions
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {FEATURED_TLDS.map(renderTldButton)}
          </div>
        </section>
      </div>
    </div>
  )
}

