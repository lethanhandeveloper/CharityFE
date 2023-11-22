import apiEndPoint from '@constants/apiEndPoint';
import apiService from '../config';
import { Campain } from '@services/models/campain';

const getCategory = async () => {
  return await apiService.get(apiEndPoint.campain.category);
};
const getItemType = async () => {
  return await apiService.get(apiEndPoint.campain.itemType);
};
const createCampain = async (data: Campain) => {
  return await apiService.post(apiEndPoint.campain.create, { ...data });
};
const getCampainPendingByPage = async (data: any) => {
  return await apiService.post(apiEndPoint.campain.getCampainPendingList, { ...data });
};
export default {
  getCategory,
  getItemType,
  createCampain,
  getCampainPendingByPage,
};
