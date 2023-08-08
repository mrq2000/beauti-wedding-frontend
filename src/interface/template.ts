import { valueof } from '.';

export const DesignStatus = {
  ACTIVE: 1,
  EDITING: 2,
  IN_REVIEW: 3,
};
export interface Template {
  id: number;
  previewImgUrl: string;
  data: string;
  animation?: string;
  backgroundImg?: string;
  created_at: string;
  updated_at: string;
  status: valueof<typeof DesignStatus>;
}
