import apiEndPoint from '@constants/apiEndPoint';
import apiService from '../config';

const create = async (data: any) => {
  return await apiService.post(apiEndPoint.district.create, { ...data });
};
const update = async (data: any) => {
  return await apiService.patch(apiEndPoint.district.create, { ...data });
};

const getList = async () => {
  return await apiService.get(apiEndPoint.district.list);
};

const getListByProvinceID = async (id: string) => {
  return await apiService.get(apiEndPoint.district.getByProvince(id));
};
export default {
  create,
  update,
  getList,
  getListByProvinceID,
};
