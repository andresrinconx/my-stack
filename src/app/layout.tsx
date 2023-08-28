import './globals.css'
import { Metadata } from 'next'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'My-Stack',
  description: 'Todo lo que he ido aprendiendo para saber lo que se ahora. Todas las tecnologias, lenguajes de programacion y frameworks que he usado y domino actualmente.',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className='mx-24'>
        <header>
          <Header />
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}