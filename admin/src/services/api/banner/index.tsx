import apiEndPoint from '@constants/apiEndPoint';
import apiService from '../config';

const createBanner = async (data: any) => {
  return await apiService.post(apiEndPoint.banner.create, { ...data });
};
const updateBanner = async (data: any) => {
  return await apiService.patch(apiEndPoint.banner.create, { ...data });
};

const getBannerList = async () => {
  return await apiService.get(apiEndPoint.banner.list);
};
export default {
  createBanner,
  updateBanner,
  getBannerList,
};
