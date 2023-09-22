import 'bootstrap/dist/css/bootstrap.css'
import { Noto_Sans_Thai } from 'next/font/google'

const noto_sans_thai = Noto_Sans_Thai({ subsets: ['thai'] })

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body  className={noto_sans_thai.className}>
          {children}
        </body>
      </html>
    )
  }