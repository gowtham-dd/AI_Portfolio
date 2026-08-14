import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';

export const metadata = {
  title: 'Gowtham D — AI Engineer',
  description: 'AI Engineer building Agentic AI systems, MLOps pipelines, and production-grade intelligent experiences.',
  keywords: ['AI Engineer', 'Agentic AI', 'LangGraph', 'MLOps', 'Gowtham D', 'FastAPI', 'Next.js'],
  authors: [{ name: 'Gowtham D' }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
                if (savedTheme === 'light') document.documentElement.setAttribute('data-theme', 'light');
              })();
            `,
          }}
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap" />
      </head>
      <body>
        <Nav />
        <Cursor />
        <div className="grid-bg"></div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
