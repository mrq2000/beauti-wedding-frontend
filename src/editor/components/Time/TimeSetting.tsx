import React, { useContext } from 'react';
import { FontSetting, Spacing } from '@/editor/interface/setting';
import { DeepPartial } from '@/interface';
import { mergeWithoutArray } from '@/utils/merge';
import { useNode } from '@craftjs/core';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import FontSettingComp from '../common/FontSetting';
import SpacingSetting from '../common/SpacingSetting';
import { TimeLayouts } from './TimeLayout';
import dayjs from 'dayjs';
import { InfoContext } from '@/pages/menu-design/InfoContext';

interface TimeStyle {
  font: FontSetting;
  padding: Spacing;
}
export interface ITimeSetting {
  style: TimeStyle;
  timeLayoutId: string;
}
const TimeSetting = () => {
  const {
    actions: { setProp },
    timeProps,
  } = useNode((node) => ({
    timeProps: node.data.props as ITimeSetting,
  }));

  const {
    info: { time },
  } = useContext(InfoContext);

  const onChange = (data: DeepPartial<TimeStyle>) => {
    setProp((props: ITimeSetting) => {
      props.style = mergeWithoutArray(props.style, data);
    });
  };

  return (
    <>
      <FontSettingComp
        font={timeProps.style.font}
        onChange={(value) => {
          onChange({
            font: value,
          });
        }}
      />

      <Box mt={2}>
        <SpacingSetting
          title="Padding"
          spacing={timeProps.style.padding}
          onChange={(value) => {
            onChange({
              padding: value,
            });
          }}
        />
      </Box>

      <FormControl sx={{ mt: 2 }} fullWidth>
        <InputLabel>Layout</InputLabel>
        <Select
          value={timeProps.timeLayoutId}
          label="Layout"
          onChange={(e) => {
            setProp((props: ITimeSetting) => {
              props.timeLayoutId = e.target.value;
            });
          }}
        >
          {Object.keys(TimeLayouts).map((layoutId) => (
            <MenuItem value={layoutId} key={layoutId}>
              {React.createElement(TimeLayouts[layoutId], {
                time: dayjs(time),
              })}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default TimeSetting;
