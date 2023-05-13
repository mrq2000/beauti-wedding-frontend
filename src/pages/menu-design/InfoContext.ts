import { Info } from '@/interface/info';
import { createContext } from 'react';

export const DEMO_INFO: Info = {
  groom: {
    name: 'Tên Chú Rể',
    fartherName: '',
    motherName: '',
  },
  bride: {
    name: 'Tên Cô Dâu',
    fartherName: '',
    motherName: '',
  },
  location: {
    name: 'Địa chỉ nơi tổ chức tiệc cưới',
  },
  time: '2023-05-04T17:00:00.000Z',
};

export interface InfoContext {
  info: Info;
  setInfo: (data: Info) => void;
  inviteeName: string;
}

export const InfoContext = createContext<InfoContext>({
  info: DEMO_INFO,
  setInfo: {} as any,
  inviteeName: '',
});
