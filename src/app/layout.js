import './globals.css';
import { CalculatorProvider } from '@/context/CalculatorContext';

export const metadata = {
  title: 'Tattoo Price Calculator',
  description: 'Calcule preços de tatuagens baseado em múltiplos critérios.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <CalculatorProvider>
          {children}
        </CalculatorProvider>
      </body>
    </html>
  );
}
