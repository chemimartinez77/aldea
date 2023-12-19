// src/pages/_app.tsx
import '../app/globals.css'; // Ajuste la ruta relativa a donde realmente se encuentra globals.css
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
