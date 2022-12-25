/* eslint-disable @typescript-eslint/no-empty-function */
import create from 'zustand';
import { getItem, setItem } from '@/helpers/storage';

interface AppContext {
  theme: string;
  setTheme: (theme?: string) => void;
}

export interface IUseAppStore extends AppContext {
  setApp: (App: AppContext) => void;
}

const defaultTheme = getItem('theme');

const useAppStore = create<IUseAppStore>((set, get) => ({
  theme: defaultTheme,
  setTheme: (theme?: string) => {
    const newTheme = theme ? theme : get().theme == 'light' ? 'dark' : 'light';
    setItem('theme', newTheme);
    set({ theme: newTheme });
  },
  setApp: (App) => set(() => App),
}));

export default useAppStore;
