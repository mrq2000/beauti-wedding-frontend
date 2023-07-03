import { Info } from '@/editor/interface/info';

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
}
