import { ProvinceUI, CommuneUI, DistrictUI } from '@models/area';

export const mapProvinceUI = (dataAPI: any): ProvinceUI => {
  return {
    id: dataAPI.id,
    name: dataAPI.name,
  };
};
export const mapProvincesUI = (listAPI: any): ProvinceUI[] => {
  return listAPI?.map((item: any) => ({
    id: item.id,
  }));
};

export const mapCommuneUI = (dataAPI: any): CommuneUI => {
  return {
    id: dataAPI.id,
    districtId: dataAPI.districtId,
    name: dataAPI.name,
  };
};
export const mapCommunesUI = (listAPI: any): CommuneUI[] => {
  return listAPI?.map((item: any) => ({
    id: item.id,
  }));
};

export const mapDistrictUI = (dataAPI: any): DistrictUI => {
  return {
    id: dataAPI.id,
    name: dataAPI.name,
    provinceId: dataAPI.provinceId._id,
  };
};
export const mapDistrictsUI = (listAPI: any): DistrictUI[] => {
  return listAPI?.map((item: any) => ({
    id: item.id,
  }));
};
