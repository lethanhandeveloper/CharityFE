import apiEndPoint from '@constants/apiEndPoint';
import apiService from '../config';

const create = async (data: any) => {
  return await apiService.post(apiEndPoint.map.create, { ...data });
};
const update = async (data: any) => {
  return await apiService.patch(apiEndPoint.map.update, { ...data });
};

export default {
  create,
  update,
};
