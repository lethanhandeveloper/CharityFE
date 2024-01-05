import apiEndPoint from '@constants/apiEndPoint';
import apiService from '../config';

const sendEmailDonate = async (
  endDate: string,
  campaignName: string,
  valueDonate: string,
  userId: string,
) => {
  await apiService.post(apiEndPoint.email.donate, {
    endDate,
    campaignName,
    valueDonate,
    userId,
  });
  return true;
};

export default {
  sendEmailDonate,
};
