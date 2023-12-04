import apiEndPoint from '@constants/apiEndPoint';
import apiService from '../config';

const create = async (data: any) => {
  return await apiService.post(apiEndPoint.province.create, { ...data });
};
const update = async (data: any) => {
  return await apiService.patch(apiEndPoint.province.create, { ...data });
};

const getList = async () => {
  return await apiService.get(apiEndPoint.province.list);
};
export default {
  create,
  update,
  getList,
};
