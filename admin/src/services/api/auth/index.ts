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

const updateRequest = async (id: string) => {
  return await apiService.patch(apiEndPoint.request.update(id), { status: 2 });
};

const setActive = async (id: string, isActive: boolean) => {
  return await apiService.post(apiEndPoint.user.setactive, { id: id, isActive: isActive });
};

const getUserList = async () => {
  return await apiService.post(apiEndPoint.user.getActiveList, {
    page: 1,
    no_item_per_page: 100,
  });
};

const getUserById = async (id: string) => {
  return await apiService.get(apiEndPoint.user.getByID(id));
};

export default {
  login,
  register,
  getProfile,
  updateAvatar,
  updateProfile,
  updateRequest,
  setActive,
  getUserList,
  getUserById,
};
