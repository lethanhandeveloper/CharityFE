import apiEndPoint from '@constants/apiEndPoint';
import apiService from '../config';

const createFile = async (fileUrl: string) => {
  const responde = await apiService.post(apiEndPoint.file.add, {
    fileUrl: fileUrl,
  });
  return responde.data.result;
};
const getFile = async (fileUrl: string) => {
  const responde = await apiService.get(apiEndPoint.file.getbyId(fileUrl));
  return responde.data.result;
};

export default {
  createFile,
  getFile,
};
