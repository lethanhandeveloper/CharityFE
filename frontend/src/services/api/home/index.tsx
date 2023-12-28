import apiEndPoint from '@constants/apiEndPoint';
import apiService from '../config';

const getCountForHome = async () => {
  return await apiService.get(apiEndPoint.home.home);
};
const getFeedBacksForHome = async () => {
  return await apiService.get(apiEndPoint.home.feedback);
};
export default {
  getCountForHome,
  getFeedBacksForHome,
};
