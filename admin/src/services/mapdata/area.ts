import { ProvinceUI, CommuneUI, DistrictUI } from '@models/area';

export const mapProvinceUI = (dataAPI: any): ProvinceUI => {
  return {
    id: dataAPI._id,
    name: dataAPI.name,
  };
};
export const mapProvincesUI = (listAPI: any): ProvinceUI[] => {
  return listAPI?.map((item: any) => mapProvinceUI(item));
};

export const mapCommuneUI = (dataAPI: any): CommuneUI => {
  return {
    id: dataAPI._id,
    districtId: dataAPI.districtId,
    name: dataAPI.name,
  };
};
export const mapCommunesUI = (listAPI: any): CommuneUI[] => {
  return listAPI?.map((item: any) => mapCommuneUI(item));
};

export const mapDistrictUI = (dataAPI: any): DistrictUI => {
  return {
    id: dataAPI._id,
    name: dataAPI.name,
    provinceId: dataAPI?.provinceId?._id || dataAPI?.provinceId,
  };
};
export const mapDistrictsUI = (listAPI: any): DistrictUI[] => {
  return listAPI?.map((item: any) => ({
    id: item.id,
  }));
};
