import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { TooltipProvider } from "@/components/ui/tooltip"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-[#fafafa]">
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  )
}

