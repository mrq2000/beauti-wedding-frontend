import { DesignInfo } from '@/interface/design';
import { createContext } from 'react';

export interface InfoContext {
  info: DesignInfo;
  inviteeName: string;
  animation: string;
  backgroundImg?: string;
  isPublic?: boolean;
}

export const InfoContext = createContext<InfoContext>({
  info: {} as any,
  inviteeName: '',
  animation: '',
  backgroundImg: '',
});
export interface InfoAction {
  setAnimation: (animation: string) => void;
  setBackgroundImg: (animation: string) => void;
}

export const InfoActionContext = createContext<InfoAction>({
  setAnimation: {} as any,
  setBackgroundImg: {} as any,
});
