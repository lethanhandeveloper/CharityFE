import apiEndPoint from '@constants/apiEndPoint';
import apiService from '../config';
import { UserAPI } from 'models/user';
import { RegisterValue } from '@pages/auth/register';

const login = async (user: UserAPI) => {
  return await apiService.post(apiEndPoint.user.login, { ...user });
};

const register = async (data: any) => {
  return await apiService.post(apiEndPoint.user.register, { ...data });
};

const getProfile = async () => {
  return await apiService.get(apiEndPoint.user.getProfile, {});
};

const updateProfile = async (data: RegisterValue) => {
  return await apiService.patch(apiEndPoint.user.getProfile, { ...data });
};

const updateAvatar = async (image_url: string) => {
  return await apiService.patch(apiEndPoint.user.updateAvatar, { image_url: image_url });
};
const getListForHome = async () => {
  return await apiService.get(apiEndPoint.user.home);
};

const submitRequest = async (data: any) => {
  return await apiService.post(apiEndPoint.user.request(data.type), { ...data });
};
const updateRequest = async (data: any, id: string) => {
  return await apiService.patch(apiEndPoint.user.updateByID(id), { ...data });
};

const getUserById = async (id: string) => {
  return await apiService.get(apiEndPoint.user.getByID(id));
};

const getRequest = async (id: string) => {
  return await apiService.get(apiEndPoint.user.getRequestId(id));
};
const getRequestByUser = async () => {
  return await apiService.get(apiEndPoint.user.getRequestByUser);
};
const sendEmail = async (email: string) => {
  return await apiService.post(apiEndPoint.user.email, { toEmail: email });
};
const getRequestByUserId = async (id: string) => {
  return await apiService.get(apiEndPoint.user.getRequestByUserId(id));
};
export default {
  getRequestByUser,
  login,
  register,
  getProfile,
  updateAvatar,
  updateProfile,
  getListForHome,
  submitRequest,
  getUserById,
  getRequest,
  sendEmail,
  updateRequest,
  getRequestByUserId,
};
