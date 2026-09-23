// src/app/layout.tsx
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'

export const metadata = {
  title: 'ArtStore',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* Client boundary: CartProvider */}
        <Providers>
          <Header />
            <main className="flex-grow container mx-auto p-4">{children}</main>
          <Footer />
        </Providers>

      </body>
    </html>
  )
}
