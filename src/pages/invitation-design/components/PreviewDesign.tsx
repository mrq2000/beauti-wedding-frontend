import RenderDesign from '@/editor/live/RenderDesign';
import { Box, useTheme } from '@mui/material';
import React, { FC, useContext } from 'react';
import { ElementContext } from '../ElementWarp';
import PreviewSidebar from './PreviewSidebar/PreviewSidebar';

interface PreviewDesign {
  isMobileMode: boolean;
}
const PreviewDesign: FC<PreviewDesign> = ({ isMobileMode }) => {
  const { elements } = useContext(ElementContext);
  const theme = useTheme();

  return (
    <>
      <PreviewSidebar />
      <Box display="flex" flex={1} alignItems="center" justifyContent="center" height="100%">
        <Box
          width={isMobileMode ? '400px' : '100%'}
          height="100%"
          display="flex"
          sx={
            isMobileMode
              ? {
                  borderLeft: `1px solid ${theme.palette.primary.main}`,
                  borderRight: `1px solid ${theme.palette.primary.main}`,
                }
              : {}
          }
        >
          <RenderDesign pages={elements} isMobileMode={isMobileMode} />
        </Box>
      </Box>
    </>
  );
};

export default PreviewDesign;
