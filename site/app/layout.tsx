import type { Metadata } from 'next'; import './globals.css';
export const metadata: Metadata={title:'Frontend Standards',description:'One agent. One standard. Better frontend.'};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" dir="ltr"><body>{children}</body></html>}
