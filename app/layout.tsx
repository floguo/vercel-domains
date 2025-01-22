import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vercel Domains Prototype',
  description: 'A prototype for exploring domain names',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-[#fafafa] min-h-screen flex flex-col">
        <TooltipProvider>
          <Nav />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </TooltipProvider>
      </body>
    </html>
  )
}

