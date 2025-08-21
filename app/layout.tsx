import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dr. Yuki Okada - Veterinary Nutrition Specialist',
  description: 'Board Certified Veterinary Nutritionist providing specialized nutritional consultations for pets. AI-powered case analysis and expert guidance.',
  keywords: 'veterinary nutrition, pet nutrition, veterinary specialist, Dr. Yuki Okada, DACVIM, nutrition consultation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}
