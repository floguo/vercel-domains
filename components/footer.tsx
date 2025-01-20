export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 py-6 flex items-center justify-between text-[13px] text-muted-foreground/60">
        <div>
          © 2025, Not Vercel Inc.
        </div>
        <nav className="flex items-center gap-4">
          <a href="#" className="hover:text-muted-foreground transition-colors">Home</a>
          <a href="#" className="hover:text-muted-foreground transition-colors">Docs</a>
          <a href="#" className="hover:text-muted-foreground transition-colors">Guides</a>
          <a href="#" className="hover:text-muted-foreground transition-colors">Help</a>
          <a href="#" className="hover:text-muted-foreground transition-colors">Contact</a>
          <a href="#" className="hover:text-muted-foreground transition-colors">Legal</a>
        </nav>
      </div>
    </footer>
  )
} 