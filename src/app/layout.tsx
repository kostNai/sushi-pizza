import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.scss'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { Providers } from '../components/SessionProvider'

const montserrat = Montserrat({
	weight: ['100', '400', '700'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap'
})

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={montserrat.className}>
				<Providers>
					<Header />
					<main>{children}</main>
					<Footer />
				</Providers>
			</body>
		</html>
	)
}
