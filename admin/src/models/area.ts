export interface ProvinceAPI {
  id: string;
  name: string;
}
export interface ProvinceUI {
  id: string;
  name: string;
}

export interface CommuneAPI {
  id: string;
  name: string;
  districtId: string;
}
export interface CommuneUI {
  id: string;
  name: string;
  districtId: string;
}

export interface DistrictAPI {
  id: string;
  name: string;
  provinceId: string;
}
export interface DistrictUI {
  id: string;
  name: string;
  provinceId: string;
}
