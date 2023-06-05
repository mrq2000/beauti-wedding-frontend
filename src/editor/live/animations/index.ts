import { Fade, FadeToBottom, FadeToLeft, FadeToRight, FadeToTop } from './Fade';
import { AnimationProps } from './interface';

interface Animation {
  title: string;
  element: React.FC<AnimationProps>;
}

// Please do not change key
export const ANIMATIONS: Record<string, Animation> = {
  fade: {
    title: 'Fade',
    element: Fade,
  },
  fadeToLeft: {
    title: 'Fade to Left',
    element: FadeToLeft,
  },
  fadeToRight: {
    title: 'Fade to Right',
    element: FadeToRight,
  },
  fadeToTop: {
    title: 'Fade to Top',
    element: FadeToTop,
  },
  fadeToBottom: {
    title: 'Fade to Bottom',
    element: FadeToBottom,
  },
};
