import { FontSetting } from './../editor/interface/setting';

export type Font = {
  fontFamily: string;
  url: string;
};

export const fontList: Font[] = [
  {
    fontFamily: 'Roboto Slab',
    url: 'Roboto+Slab',
  },
  {
    fontFamily: 'Markazi Text',
    url: 'Markazi+Text',
  },
  {
    fontFamily: 'Rasa',
    url: 'Rasa',
  },
  {
    fontFamily: 'Sofia Sans',
    url: 'Sofia+Sans',
  },
  {
    fontFamily: 'Dancing Script',
    url: 'Dancing+Script',
  },
  {
    fontFamily: 'Press Start 2P',
    url: 'Press+Start+2P',
  },
  {
    fontFamily: 'Bruno Ace SC',
    url: 'Bruno+Ace+SC',
  },
  {
    fontFamily: 'Quicksand',
    url: 'Quicksand',
  },
  {
    fontFamily: 'Pacifico',
    url: 'Pacifico',
  },
  {
    fontFamily: 'Lobster',
    url: 'Lobster',
  },
  {
    fontFamily: 'Comfortaa',
    url: 'Comfortaa',
  },
  {
    fontFamily: 'Caveat',
    url: 'Caveat',
  },

  {
    fontFamily: 'Satisfy',
    url: 'Satisfy',
  },
  {
    fontFamily: 'Shadows Into Light',
    url: 'Shadows+Into+Light',
  },
  {
    fontFamily: 'Courgette',
    url: 'Courgette',
  },
];

const fontFamily = fontList.map((font) => `family=${font.url}&`).join('');
export const fontForWebsite = () => {
  return `https://fonts.googleapis.com/css2?${fontFamily}display=swap`;
};

export const genFont = (font: FontSetting) => ({
  fontSize: `${font.fontSize}px`,
  textAlign: font.textAlign,
  color: font.color,
  fontFamily: font.fontFamily,
  fontStyle: font.fontStyle,
  fontWeight: font.fontWeight,
});
