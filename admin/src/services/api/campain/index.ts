import apiEndPoint from '@constants/apiEndPoint';
import apiService from '../config';
import { Campain } from '@models/campain';

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
const getCampainDetail = async (id: string) => {
  return await apiService.get(apiEndPoint.campain.getDetail(id));
};
const getCampaignList = async () => {
  return await apiService.get(apiEndPoint.campain.getCampainList);
};
export default {
  getCategory,
  getCampainDetail,
  getItemType,
  createCampain,
  getCampainPendingByPage,
  getCampaignList,
};
