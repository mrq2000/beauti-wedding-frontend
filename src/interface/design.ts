import { Info } from '@/editor/interface/info';

export interface DesignDraft {
  design_id: number;
  data: string;
  template_id: number;
  created_at: string;
  updated_at: string;
}

export interface DesignInfo extends Info {
  id: number;
  animation: string;
  template_id: number;
  created_at: string;
  updated_at: string;
}
