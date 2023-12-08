import { MapUI } from '@models/map';
import { mapCampainUI } from './campain';

export const mapUI = (data: any): MapUI => ({
  campaign: mapCampainUI(data.campaignId),
  id: data.id,
  lat: data.lat,
  long: data.long,
  type: data.type,
});
export const mapUIs = (list: any): MapUI[] => {
  return list.map((item: any) => mapUI(item));
};
