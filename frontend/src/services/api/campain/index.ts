import apiEndPoint from '@constants/apiEndPoint';
import apiService from '../config';
import { Campain } from 'models/campain';

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
const getCampainListByUser = async (data: any) => {
  return await apiService.post(apiEndPoint.campain.getCampaignByUser, { ...data });
};
const getCampainListByCurentUser = async (data: any) => {
  return await apiService.post(apiEndPoint.campain.getCampaignByCurentUser, { ...data });
};
const getListForHome = async () => {
  return await apiService.get(apiEndPoint.campain.home);
};
const getCampainDetail = async (id: string) => {
  return await apiService.get(apiEndPoint.campain.getDetail(id));
};
const getCampainTransactionDetail = async (id: string) => {
  return await apiService.get(apiEndPoint.campain.getTransactionHash(id));
};
const addCampainTransactionId = async (id: string, hash: string) => {
  return await apiService.post(apiEndPoint.campain.addTransaction, {
    transactionId: id,
    transactionHash: hash,
  });
};
export default {
  getCategory,
  getCampainDetail,
  getItemType,
  createCampain,
  getCampainPendingByPage,
  getListForHome,
  getCampainListByUser,
  getCampainListByCurentUser,
  addCampainTransactionId,
  getCampainTransactionDetail,
};
