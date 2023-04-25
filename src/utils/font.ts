export type Font = {
  fontFamily: string;
  url: string;
};

export const fontList: Font[] = [
  {
    fontFamily: 'Sofia Sans',
    url: 'https://fonts.googleapis.com/css2?family=Sofia+Sans&display=swap',
  },
  {
    fontFamily: 'Dancing Script',
    url: 'https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap',
  },
];

export const fontForWebsite = () => {
  return fontList.map((font) => `@import url('${font.url}')`).join(' ');
};
