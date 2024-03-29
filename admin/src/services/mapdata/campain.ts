import { CampainUI } from '@models/campain';
export const mapCampainUI = (data?: any): CampainUI => ({
  id: data?._id || '',
  categoryId: data?.categoryId?.name || data?.categoryId || '',
  countdown: 0,
  creatorId: data?.creatorId?.email || data?.creatorId || '',
  description: data?.description || '',
  endDate: data?.endDate || '',
  itemTypeId: data?.itemTypeId?.name || data?.itemTypeId || '',
  provinceId: data?.provinceId?.name || data?.provinceId || '',
  targetValue: data?.targetValue || '',
  thumbnail: data?.thumbnail || '',
  title: data?.title || '',
  fileUrl: data?.fileUrl || '',
  status: data?.status || '',
  addressCreator: data?.addressCreator || '',
});
export const mapCampainUIs = (list: any): CampainUI[] => {
  return list.map((item: any) => mapCampainUI(item));
};
