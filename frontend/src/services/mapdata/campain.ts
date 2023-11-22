import { Campain, CampainUI } from '@services/models/campain';
export const mapCampain = (data: Campain): CampainUI => ({
  categoryId: data.categoryId,
  countdown: 0,
  creatorId: data.creatorId,
  description: data.description,
  endDate: data.endDate,
  itemTypeId: data.itemTypeId,
  provinceId: data.provinceId,
  targetValue: data.targetValue,
  thumbnail: data.thumbnail,
  title: data.title,
});
export const mapCampainUIs = (list: any): CampainUI[] => {
  return list.map((item: any) => mapCampain(item));
};
