import { useNode } from '@craftjs/core';
import { FormControl, FormLabel, Slider } from '@mui/material';

export interface IPageSetting {

}
const PageSetting = () => {
  const {
    actions: { setProp },
  } = useNode((node) => ({
    textProps: node.data.props as IPageSetting,
  }));

  return (
    <>
      <FormControl size="small" component="fieldset">
        hahahaha
      </FormControl>
    </>
  );
};

export default PageSetting;
