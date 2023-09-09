import "@/styles/globals.css";
import { Metadata } from "next";
import { Providers } from "./providers";
import { Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '500', '900'] })

export const metadata: Metadata = {
	title: 'Quiz App'
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>			
			<body className={`${roboto.className}`}>
				<Providers>
					<main>
						{children}
					</main>
				</Providers>
			</body>
		</html>
	);
}
