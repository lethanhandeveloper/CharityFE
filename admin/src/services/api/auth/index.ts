import apiEndPoint from '@constants/apiEndPoint';
import apiService from '../config';
import { UserAPI, RegisterValue } from '@models/user';

const login = async (user: UserAPI) => {
  return await apiService.post(apiEndPoint.user.login, { ...user });
};
const register = async (data: RegisterValue) => {
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
export default {
  login,
  register,
  getProfile,
  updateAvatar,
  updateProfile,
};
