import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Nav() {
  return (
    <header className="flex h-16 items-center px-4 border-b border-border">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center">
          <svg height="22" viewBox="0 0 76 65" fill="currentColor">
            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z"/>
          </svg>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/floguo%20pfp-F5sEHfsn1XqOlPZcZwpePSTDhAT0Kc.jpeg"
              alt="floguo"
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-sm">floguo</span>
          </Link>
          <button className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-background px-3 py-1 text-sm text-muted-foreground hover:border-border">
            Hobby
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <span className="text-border text-lg">/</span>
          <span className="text-sm">New Domain</span>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          className="h-8 rounded-full bg-white hover:bg-white/90"
        >
          Feedback
        </Button>
        <nav className="flex items-center gap-4">
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Changelog
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Help
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Docs
          </Link>
        </nav>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/floguo%20pfp-F5sEHfsn1XqOlPZcZwpePSTDhAT0Kc.jpeg"
          alt="User"
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>
    </header>
  )
}

