import { Spacing } from '@/editor/interface/setting';

export const genPaddingSpacing = (padding: Spacing) => ({
  paddingTop: `${padding.top}px`,
  paddingBottom: `${padding.bottom}px`,
  paddingRight: `${padding.right}px`,
  paddingLeft: `${padding.left}px`,
});

export const genMarginSpacing = (margin: Spacing) => ({
  marginTop: `${margin.top}px`,
  marginBottom: `${margin.bottom}px`,
  marginRight: `${margin.right}px`,
  marginLeft: `${margin.left}px`,
});
