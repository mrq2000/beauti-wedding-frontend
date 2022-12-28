/* eslint-disable @typescript-eslint/no-empty-function */
import create from 'zustand';
import { getItem, setItem } from '@/helpers/storage';

interface AppContext {
  isLightMode: boolean;
  setTheme: (theme?: string) => void;
}

export interface IUseAppStore extends AppContext {
  setApp: (App: AppContext) => void;
}

const defaultTheme = getItem('theme');

const useAppStore = create<IUseAppStore>((set, get) => ({
  isLightMode: defaultTheme == 'light',
  setTheme: (theme?: string) => {
    const newTheme = theme ? theme : get().isLightMode ? 'dark' : 'light';
    setItem('theme', newTheme);
    set({ isLightMode: newTheme == 'light' });
  },
  setApp: (App) => set(() => App),
}));

export default useAppStore;
