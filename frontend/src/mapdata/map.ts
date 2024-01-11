import { MapUI } from '@models/map';
import { mapCampain } from './campain';

export const mapUI = (data: any): MapUI => ({
  campaign: mapCampain(data),
  id: data?.id || data._id,
  lat: data.lat,
  long: data.long,
  type: data.type,
});
export const mapUIs = (list: any): MapUI[] => {
  return list.map((item: any) => mapUI(item));
};
