import apiEndPoint from '@constants/apiEndPoint';
import apiService from '../config';

const createFeedback = async (data: any) => {
  return await apiService.post(apiEndPoint.feedback.create, data);
};
const updateFeedback = async (id: string, data: any) => {
  return await apiService.put(apiEndPoint.feedback.update(id), data);
};
const setStatusFeedback = async (id: string, status: boolean) => {
  return await apiService.patch(apiEndPoint.feedback.updateStatus(id), {
    isShowInHomePage: status,
  });
};
export default { createFeedback, updateFeedback, setStatusFeedback };
