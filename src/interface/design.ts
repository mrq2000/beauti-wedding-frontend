import { Info } from '@/editor/interface/info';
import { valueof } from '.';

export const DesignPlan = {
  FREE: 1,
  ADVANCE: 2,
};

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
