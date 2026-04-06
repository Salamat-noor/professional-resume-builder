import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico, Inter, Poppins, Merriweather, Roboto } from "next/font/google";
import "./globals.css";
import { ShadcnProviders } from "@/lib/providers/ShadcnProvider";

const pacifico = Pacifico({ 
  weight: '400', 
  subsets: ['latin'], 
  display: 'swap', 
  variable: '--font-pacifico',
  fallback: ['cursive']
});
const geistSans = Geist({ 
  variable: "--font-geist-sans", 
  subsets: ["latin"],
  fallback: ['system-ui', 'arial']
});
const geistMono = Geist_Mono({ 
  variable: "--font-geist-mono", 
  subsets: ["latin"],
  fallback: ['monospace']
});
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  fallback: ['system-ui', 'arial']
});
const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'], 
  subsets: ["latin"], 
  variable: "--font-poppins",
  fallback: ['system-ui', 'arial']
});
const merriweather = Merriweather({ 
  weight: ['400', '700'], 
  subsets: ["latin"], 
  variable: "--font-merriweather",
  fallback: ['Georgia', 'serif']
});
const roboto = Roboto({ 
  weight: ['400', '500', '700'], 
  subsets: ["latin"], 
  variable: "--font-roboto",
  fallback: ['system-ui', 'arial']
});

export const metadata: Metadata = {
  title: "ClarityCV — Build Resumes That Get You Hired",
  description: "AI-powered resume builder with ATS optimization, job tailoring, and cover letter generation.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} ${inter.variable} ${poppins.variable} ${merriweather.variable} ${roboto.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ShadcnProviders>{children}</ShadcnProviders>
      </body>
    </html>
  );
}
