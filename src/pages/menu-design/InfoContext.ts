import { Info } from '@/interface/info';
import { createContext } from 'react';

export const DEMO_INFO: Info = {
  broom: {
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
    name: '',
  },
  time: '',
};

export const InfoContext = createContext<Info>(DEMO_INFO);
