import { createContext } from 'react';
import { DesignInfo } from '@/interface/design';

export interface InfoContext {
  info: DesignInfo;
  inviteeName: string;
  animation: string;
}

export const InfoContext = createContext<InfoContext>({
  info: {} as any,
  inviteeName: '',
  animation: '',
});
export interface InfoAction {
  setAnimation: (animation: string) => void;
}

export const InfoActionContext = createContext<InfoAction>({
  setAnimation: {} as any,
});
