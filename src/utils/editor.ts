export const genNewPage = (backgroundUrl: string) => {
  return JSON.stringify({
    ROOT: {
      type: { resolvedName: 'Page' },
      isCanvas: true,
      props: {
        style: { padding: { top: 16, bottom: 16, left: 16, right: 16 }, borderRadius: 8 },
        backgroundUrl,
      },
      displayName: 'Page',
      custom: {},
      hidden: false,
      nodes: [],
      linkedNodes: {},
    },
  });
};
