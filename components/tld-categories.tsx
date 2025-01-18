interface TLDCategory {
  name: string
  tlds: string[]
  description: string
}

const TLD_CATEGORIES: TLDCategory[] = [
  {
    name: 'Tech',
    tlds: ['.dev', '.ai', '.tech', '.app'],
    description: 'Perfect for technology and developer projects'
  },
  {
    name: 'Business',
    tlds: ['.com', '.co', '.io', '.inc'],
    description: 'Professional domains for businesses'
  },
  {
    name: 'Creative',
    tlds: ['.design', '.studio', '.art', '.media'],
    description: 'Stand out with creative domain endings'
  }
]

export function TLDCategories() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-[800px] mb-8">
      {TLD_CATEGORIES.map((category) => (
        <div
          key={category.name}
          className="group relative overflow-hidden rounded-lg border bg-background p-4 hover:shadow-md transition-shadow"
        >
          <div className="mb-2 text-lg font-medium">{category.name}</div>
          <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
          <div className="flex flex-wrap gap-2">
            {category.tlds.map((tld) => (
              <span
                key={tld}
                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors hover:bg-secondary"
              >
                {tld}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

