import { Nav } from '../components/nav'
import { DomainSearch } from '../components/domain-search'

export default function Page() {
  return (
    <div className="h-screen bg-background flex flex-col">
      <Nav />
      <div className="flex-1">
        <DomainSearch />
      </div>
    </div>
  )
}

