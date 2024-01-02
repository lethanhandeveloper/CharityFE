import { CampainUI } from 'models/campain';
export const mapCampain = (data: any): CampainUI => ({
  id: data._id,
  categoryId: data.categoryId,
  countdown: 0,
  creatorId: data.creatorId?.userName || data.creatorId,
  description: data.description,
  endDate: new Date(data.endDate),
  itemTypeId: data.itemTypeId,
  provinceId: data.provinceId,
  targetValue: data.targetValue,
  thumbnail: data.thumbnail,
  title: data.title,
  status: data.status,
});
export const mapCampainUIs = (list: any): CampainUI[] => {
  return list.map((item: any) => mapCampain(item));
};
