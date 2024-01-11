import apiEndPoint from '@constants/apiEndPoint';
import apiService from '../config';
import { CampaignStatus, Campain } from '@models/campain';

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
const updateStatus = async (id: string, status: CampaignStatus) => {
  return await apiService.patch(apiEndPoint.campain.updateStatus, { id, status });
};
const file = async (id: string) => {
  return await apiService.get(`/file/${id}`);
};
export default {
  getCategory,
  getCampainDetail,
  getItemType,
  createCampain,
  getCampainPendingByPage,
  getCampaignList,
  updateStatus,
  file,
};
