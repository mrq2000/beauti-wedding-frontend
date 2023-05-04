import { useEffect } from 'react';
import { fontForWebsite } from './font';

export const GlobalStyle = () => {
  useEffect(() => {
    const loadFonts = () => {
      const link = document.createElement('link');
      link.href = fontForWebsite();
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    };

    loadFonts();
  }, []);
  return <></>;
};
