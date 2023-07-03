import { createContext } from 'react';
import { Info } from './interface/info';

export interface InfoContext {
  info: Info;
  inviteeName: string;
  animation: string;
  backgroundImg?: string;
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
