import apiEndPoint from '@constants/apiEndPoint';
import apiService from '../config';

const getBannerList = async () => {
  const response = await apiService.get(apiEndPoint.banner.getList);
  return response.data.result;
};

export default {
  getBannerList,
};
