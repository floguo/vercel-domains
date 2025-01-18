import { Nav } from '../components/nav'
import { DomainSearch } from '../components/domain-search'

export default function Page() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Nav />
      <DomainSearch />
    </div>
  )
}

