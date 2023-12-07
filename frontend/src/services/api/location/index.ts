import apiEndPoint from '@constants/apiEndPoint';
import apiService from '../config';

const getAllProvince = async () => {
  return await apiService.get(apiEndPoint.location.getProvince, {});
};
const getDistrictByProvince = async (id: string) => {
  return await apiService.get(apiEndPoint.location.getDistrictByProvince(id));
};
const getCommuneByDistrict = async (id: string) => {
  return await apiService.get(apiEndPoint.location.getCommuneByDistrict(id));
};
export default {
  getAllProvince,
  getDistrictByProvince,
  getCommuneByDistrict,
};
