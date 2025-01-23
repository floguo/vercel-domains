import Link from 'next/link'
import Image from 'next/image'
import { ChevronsUpDownIcon as ChevronUpDown } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Nav() {
  return (
    <header className="flex h-16 items-center px-6 py-3 bg-white border-b border-border/30">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center">
          <svg height="22" viewBox="0 0 76 65" fill="currentColor">
            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z"/>
          </svg>
        </Link>
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 16 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="text-border/70"
        >
          <path 
            fill-rule="evenodd" 
            clip-rule="evenodd" 
            d="M4.01526 15.3939L4.3107 14.7046L10.3107 0.704556L10.6061 0.0151978L11.9849 0.606077L11.6894 1.29544L5.68942 15.2954L5.39398 15.9848L4.01526 15.3939Z" 
            fill="currentColor" 
          />
        </svg>
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
          <div className="flex items-center gap-2">
            <button className="rounded-full bg-neutral-200/60 px-2 py-0.5 text-[0.7rem] text-neutral-600 font-medium">
              Hobby
            </button>
            <ChevronUpDown className="h-3.5 w-3.5 text-muted-foreground" />
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="text-border/70"
            >
              <path 
                fill-rule="evenodd" 
                clip-rule="evenodd" 
                d="M4.01526 15.3939L4.3107 14.7046L10.3107 0.704556L10.6061 0.0151978L11.9849 0.606077L11.6894 1.29544L5.68942 15.2954L5.39398 15.9848L4.01526 15.3939Z" 
                fill="currentColor" 
              />
            </svg>
            <span className="text-sm">New Domain</span>
          </div>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div className="flex items-center gap-4 mr-6">
          <Button
            variant="outline"
            size="sm"
            className="h-8 rounded-md px-3 text-[14px] text-neutral-500 shadow-none border border-neutral-200 font-light bg-white hover:bg-neutral-50"
          >
            Feedback
          </Button>
          <nav className="flex items-center gap-4">
            <Link href="#" className="text-[14px] font-light text-muted-foreground hover:text-foreground">
              Changelog
            </Link>
            <Link href="#" className="text-[14px] font-light text-muted-foreground hover:text-foreground">
              Help
            </Link>
            <Link href="#" className="text-[14px] font-light text-muted-foreground hover:text-foreground">
              Docs
            </Link>
          </nav>
        </div>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/floguo%20pfp-F5sEHfsn1XqOlPZcZwpePSTDhAT0Kc.jpeg"
          alt="User"
          width={28}
          height={28}
          className="rounded-full"
        />
      </div>
    </header>
  )
}