import { Spacing } from '@/editor/interface/setting';
import { useNode } from '@craftjs/core';
import { FormControl, Box, Slider } from '@mui/material';
import { DeepPartial } from '@/interface';
import { mergeWithoutArray } from '@/utils/merge';
import SpacingSetting from '../common/SpacingSetting';
import BorderRadiusSetting from '../common/BorderRadiusSetting';
import AddPictureButton from '@/components/common/AddPictureButton';
import CardImageUpload from '@/components/common/CardImgUpload';

export interface PageStyle {
  padding: Spacing;
  borderRadius: number;
}
export interface IPageSetting {
  style: PageStyle;
}
const PageSetting = () => {
  const {
    actions: { setProp },
    pageProps,
  } = useNode((node) => ({
    pageProps: node.data.props as IPageSetting,
  }));

  const onChangeStyle = (data: DeepPartial<PageStyle>) => {
    setProp((props: IPageSetting) => {
      props.style = mergeWithoutArray(props.style, data);
    });
  };

  return (
    <>
      <SpacingSetting
        title="Padding"
        spacing={pageProps.style.padding}
        max={48}
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
        <AddPictureButton labelKey="upload-background-img" handleSetFile={() => console.log('done')}>
          <CardImageUpload url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKzJl6LV6ahrWNO7JpoIhy9aghnyj7BqAXWg&usqp=CAU" />
        </AddPictureButton>
      </Box>
    </>
  );
};

export default PageSetting;
