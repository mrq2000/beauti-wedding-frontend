import { Info } from '@/editor/interface/info';
import { createContext } from 'react';

export interface DesignSetting {
  domain: string;
}

interface CreateDesignInfo {
  info: Info;
  setInfo: (data: Info) => void;
  templateId?: number;
  setTemplateId: (templateId?: number) => void;
  setting: DesignSetting;
  setSetting: (setting: DesignSetting) => void;
}

export const CreateDesignContext = createContext<CreateDesignInfo>({
  info: {} as Info,
  setInfo: {} as any,
  templateId: 1,
  setTemplateId: {} as any,
  setting: {} as DesignSetting,
  setSetting: {} as any,
});
