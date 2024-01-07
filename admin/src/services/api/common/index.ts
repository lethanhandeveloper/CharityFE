import apiEndPoint from '@constants/apiEndPoint';
import apiService from '../config';
const getAPIList = async (url: string, page: number, noItemPerPage: number, searchText: string) => {
  return await apiService.post(url, {
    page: page,
    noItemPerPage,
    search_text: searchText,
  });
};
const getDataHome = async () => {
  return await apiService.get(apiEndPoint.home.list);
};
export default { getAPIList, getDataHome };
