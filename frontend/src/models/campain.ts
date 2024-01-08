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
  status: string;
  addressWallet: string;
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
  status: string;
  addressWallet: string;
}
