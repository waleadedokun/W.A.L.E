import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HopeHelps NGO - Empowering Lives Through Hope and Skills',
  description: 'Join HopeHelps in transforming communities across Nigeria through sustainable meal programs and skills development that create lasting impact.',
  keywords: 'NGO, Nigeria, charity, meals, skills development, empowerment, community, donations',
  authors: [{ name: 'HopeHelps NGO' }],
  openGraph: {
    title: 'HopeHelps NGO - Empowering Lives Through Hope and Skills',
    description: 'Join HopeHelps in transforming communities across Nigeria through sustainable meal programs and skills development that create lasting impact.',
    type: 'website',
    url: 'https://hopehelps.ng',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HopeHelps NGO',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HopeHelps NGO - Empowering Lives Through Hope and Skills',
    description: 'Join HopeHelps in transforming communities across Nigeria through sustainable meal programs and skills development that create lasting impact.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://hopehelps.ng" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#5DADE2" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}