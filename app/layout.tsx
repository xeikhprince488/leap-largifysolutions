import type React from "react"
import { Toaster } from "sonner"
import Script from "next/script"
import { Inter } from "next/font/google"
import { Noto_Nastaliq_Urdu } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const urduFont = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: "400",
  variable: "--font-urdu",
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  // In your layout component:
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${inter.className} ${urduFont.variable}`}>
        <div className="min-h-screen bg-background">{children}</div>
        <Toaster />
      </body>
    </html>
  )
}

