import { CampainUI } from './campain';

export type MapType = 'NORMAL' | 'EMERGENCY' | 'ITEM';
export interface MapRecord {
  id: string;
  lat: string;
  long: string;
  idRecord: string;
}
export interface MapUI {
  id: string;
  lat: number;
  long: number;
  campaign: CampainUI;
  type: MapType;
}
