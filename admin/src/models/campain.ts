export type CampaignStatus = 'DRAFT' | 'START' | 'END' | 'REJECTED' | 'CANCEL';
export interface Campain {
  _id: string;
  creatorId: string;
  categoryId: string;
  itemTypeId: string;
  provinceId: string;
  title: string;
  targetValue: number;
  endDate: Date;
  description: string;
  thumbnail: string;
  fileUrl: string;
}
export interface CampainUI {
  id: string;
  creatorId: string;
  categoryId: string;
  itemTypeId: string;
  provinceId: string;
  title: string;
  targetValue: number;
  endDate: Date;
  description: string;
  thumbnail: string;
  countdown: number;
  fileUrl: string;
  status: string;
  addressCreator: string;
}
