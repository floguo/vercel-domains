interface DomainResult {
  name: string;
  tld: string;
  available: boolean;
  price: number;
}

export async function searchDomains(query: string): Promise<DomainResult[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  const tlds = ['.com', '.io', '.dev', '.app', '.ai'];
  const results: DomainResult[] = [];

  // Direct match
  tlds.forEach(tld => {
    results.push({
      name: query,
      tld,
      available: Math.random() > 0.5,
      price: Math.floor(Math.random() * 50) + 10,
    });
  });

  // Alternative suggestions
  const alternatives = ['quick', 'fast', 'rapid', 'swift', 'speedy'];
  alternatives.forEach(alt => {
    results.push({
      name: `${alt}${query}`,
      tld: tlds[Math.floor(Math.random() * tlds.length)],
      available: Math.random() > 0.3,
      price: Math.floor(Math.random() * 50) + 10,
    });
  });

  return results;
}

