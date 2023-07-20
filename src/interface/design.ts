import { Info } from '@/editor/interface/info';

export const DesignPlan = {
  FREE: 1,
  ADVANCE: 2,
};

type valueof<T> = T[keyof T];
export interface DesignDraft {
  design_id: number;
  animation: string;
  backgroundImg?: string;
  data: string;
  created_at: string;
  updated_at: string;
}

export interface DesignInfo extends Info {
  id: number;
  domain: string;
  previewImgUrl?: string;
  receivers?: string;
  created_at: string;
  updated_at: string;
  plan: valueof<typeof DesignPlan>;
}
