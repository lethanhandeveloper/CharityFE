import apiEndPoint from '@constants/apiEndPoint';
import apiService from '../config';

const create = async (data: any) => {
  return await apiService.post(apiEndPoint.commune.create, { ...data });
};

const update = async (data: any) => {
  return await apiService.patch(apiEndPoint.commune.create, { ...data });
};

const getList = async () => {
  return await apiService.get(apiEndPoint.commune.list);
};

const getListByDistrictID = async (id: string) => {
  return await apiService.get(apiEndPoint.commune.getByDistrict(id));
};
export default {
  create,
  update,
  getList,
  getListByDistrictID,
};
