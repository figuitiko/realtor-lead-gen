import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import { SessionProvider } from "next-auth/react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Miami Premier Realty | Find Your Dream Property",
  description:
    "Discover premier real estate investment opportunities in Miami. Whether you're buying, selling, or investing, our licensed professionals guide you every step of the way.",
  keywords: ["Miami real estate", "Miami homes", "luxury properties", "real estate investment", "Miami Realtor"],
  openGraph: {
    title: "Miami Premier Realty | Find Your Dream Property",
    description:
      "Discover premier real estate investment opportunities in Miami. Trusted by buyers and investors alike.",
    type: "website",
    locale: "en_US",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>
          {children}
          <Toaster position="top-right" richColors />
        </SessionProvider>
      </body>
    </html>
  )
}
