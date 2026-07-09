import './globals.css';
import { LanguageProvider } from '@/lib/language';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'CodeFast',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bg">
      <body>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}