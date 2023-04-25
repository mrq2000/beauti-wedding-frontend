import { useEffect } from 'react';
import { fontList } from './font';

export const GlobalStyle = () => {
  useEffect(() => {
    const loadFonts = () => {
      fontList.forEach((font) => {
        const link = document.createElement('link');
        link.href = font.url;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      });
    };

    loadFonts();
  }, []);
  return <></>;
};
