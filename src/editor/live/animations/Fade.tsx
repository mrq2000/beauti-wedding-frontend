import { Box } from '@mui/material';
import React, { FC } from 'react';
import { AnimationProps } from './interface';
import RenderPage from './RenderPage';

const DIRECTION = {
  left: {
    left: -100,
  },
  right: {
    left: 100,
  },
  top: {
    top: -100,
  },
  bottom: {
    top: 100,
  },
};

interface FadeToProps extends AnimationProps {
  fadeTo?: keyof typeof DIRECTION;
}
const FadeTo: FC<FadeToProps> = ({ pages, activePage, setActivePage, fadeTo }) => {
  return (
    <Box position="relative">
      {pages.map((page, index) => (
        <Box
          key={index}
          position="absolute"
          sx={{
            top: 0,
            left: 0,
            zIndex: activePage == index ? 2 : -index,
            opacity: index < activePage ? 0 : 1,
            cursor: 'pointer',
            transition: 'all 0.5s ease-in',
            transform: 'translate(-50%, -50%)',
            ...(index < activePage && fadeTo && DIRECTION[fadeTo]),
          }}
          onClick={() => {
            if (activePage >= pages.length - 1) {
              setActivePage(0);
            } else {
              setActivePage(activePage + 1);
            }
          }}
        >
          <RenderPage data={page} />
        </Box>
      ))}
    </Box>
  );
};

export const Fade: FC<AnimationProps> = (props) => <FadeTo {...props} />;
export const FadeToTop: FC<AnimationProps> = (props) => <FadeTo fadeTo="top" {...props} />;
export const FadeToBottom: FC<AnimationProps> = (props) => <FadeTo fadeTo="bottom" {...props} />;
export const FadeToRight: FC<AnimationProps> = (props) => <FadeTo fadeTo="right" {...props} />;
export const FadeToLeft: FC<AnimationProps> = (props) => <FadeTo fadeTo="left" {...props} />;
