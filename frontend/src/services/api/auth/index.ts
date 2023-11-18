import apiEndPoint from '@constants/apiEndPoint';
import apiService from '../config';
import { UserAPI } from '@services/models/user';

const login = async (user: UserAPI) => {
  return await apiService.post(apiEndPoint.login, { ...user });
};
const register = async () => {
  return await apiService.post(apiEndPoint.register, {});
};
const getProfile = async () => {
  return await apiService.get(apiEndPoint.getProfile, {});
};
export default {
  login,
  register,
  getProfile,
};
