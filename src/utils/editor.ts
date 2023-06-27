import { Info } from '@/editor/interface/info';
import dayjs from 'dayjs';

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

export const getDemoInfo = ({ hasParentInfo }: { hasParentInfo: boolean }) => {
  const DEMO_INFO: Info = {
    groomName: 'Tên Chú Rể',
    groomFatherName: hasParentInfo ? 'Bố chú rể' : '',
    groomMotherName: hasParentInfo ? 'Mẹ chú rể' : '',
    brideName: 'Tên Cô Dâu',
    brideFatherName: hasParentInfo ? 'Bố cô dâu' : '',
    brideMotherName: hasParentInfo ? 'Mẹ cô dâu' : '',
    location: 'Địa chỉ nơi tổ chức tiệc cưới',
    time: dayjs().format('YYYY-MM-DDT17:00:00.000Z'),
  };

  return DEMO_INFO;
};
