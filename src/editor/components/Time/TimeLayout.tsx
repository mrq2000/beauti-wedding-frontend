import { FontSetting } from '@/editor/interface/setting';
import { Box, Divider } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/vi';

dayjs.locale('vi');

interface TimeLayout {
  time: Dayjs;
  font?: FontSetting;
}
const BasicLayout = ({ time }: TimeLayout) => {
  return <>{time.format('DD . MM . YYYY')}</>;
};

const BasicLayout2 = ({ time }: TimeLayout) => {
  return <>{time.format('DD - MM - YYYY')}</>;
};

const BasicLayout3 = ({ time }: TimeLayout) => {
  return <>{time.format('DD/MM/YYYY')}</>;
};

const CustomLayout1 = ({ time }: TimeLayout) => {
  return (
    <Box sx={{ textTransform: 'capitalize', display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      {time.format(`dddd`)}, Ngày&nbsp;
      <b style={{ fontSize: '1.75em' }}>{time.format(`DD`)}</b>
      &nbsp;Tháng {time.format(`MM`)} Năm {time.format(`YYYY`)}
    </Box>
  );
};

const CustomLayout2 = ({ time, font }: TimeLayout) => {
  return (
    <Box sx={{ textTransform: 'capitalize', display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      {time.format(`dddd`)}
      <Divider
        orientation="vertical"
        sx={{ mx: 1, borderWidth: '1px', borderColor: font?.color || 'inherit' }}
        flexItem
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <b style={{ fontSize: '1.75em' }}>{time.format(`DD`)}</b>

        {time.format(`MM`)}
      </Box>
      <Divider
        orientation="vertical"
        sx={{ mx: 1, borderWidth: '1px', borderColor: font?.color || 'inherit' }}
        flexItem
      />
      &nbsp;{time.format(`YYYY`)}
    </Box>
  );
};

export const TimeLayouts: Record<string, ({ time }: TimeLayout) => JSX.Element> = {
  basic: BasicLayout,
  basic2: BasicLayout2,
  basic3: BasicLayout3,
  customLayout1: CustomLayout1,
  customLayout2: CustomLayout2,
};
