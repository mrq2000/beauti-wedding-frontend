import { Spacing } from '@/editor/interface/setting';
import { useNode } from '@craftjs/core';
import { Box } from '@mui/material';
import { DeepPartial } from '@/interface';
import { mergeWithoutArray } from '@/utils/merge';
import SpacingSetting from '../common/SpacingSetting';
import BorderRadiusSetting from '../common/BorderRadiusSetting';
import AddPictureButton from '@/components/common/AddPictureButton';
import CardImageUpload from '@/components/common/CardImgUpload';
import { useContext } from 'react';
import { InfoContext } from '@/editor/InfoContext';
import { DesignPlan } from '@/interface/design';
export interface PageStyle {
  padding: Spacing;
  borderRadius: number;
}
export interface IPageSetting {
  style: PageStyle;
  backgroundUrl?: string;
}
const PageSetting = () => {
  const {
    actions: { setProp },
    pageProps,
  } = useNode((node) => ({
    pageProps: node.data.props as IPageSetting,
  }));
  const { info } = useContext(InfoContext);

  const onChangeStyle = (data: DeepPartial<PageStyle>) => {
    setProp((props: IPageSetting) => {
      props.style = mergeWithoutArray(props.style, data);
    }, 1000);
  };

  const onChangeBackground = (url: string) => {
    setProp((props: IPageSetting) => {
      props.backgroundUrl = url;
    });
  };

  return (
    <>
      <SpacingSetting
        title="Padding"
        spacing={pageProps.style.padding}
        max={100}
        onChange={(value) => {
          onChangeStyle({
            padding: value,
          });
        }}
      />

      <Box mt={2}>
        <BorderRadiusSetting
          borderRadius={pageProps.style.borderRadius}
          onChange={(value) => {
            onChangeStyle({
              borderRadius: value,
            });
          }}
        />
      </Box>

      <Box mt={2} width="100%" height={150}>
        {info.plan == DesignPlan.FREE ? (
          <CardImageUpload url={pageProps.backgroundUrl} disabled />
        ) : (
          <AddPictureButton labelKey="upload-background-img" handleSetPicture={onChangeBackground}>
            <CardImageUpload url={pageProps.backgroundUrl} />
          </AddPictureButton>
        )}
      </Box>
    </>
  );
};

export default PageSetting;
