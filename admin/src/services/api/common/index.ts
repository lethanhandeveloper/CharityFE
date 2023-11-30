import apiService from '../config';
const getAPIList = async (url: string, page: number, noItemPerPage: number, searchText: string) => {
  return await apiService.post(url, {
    page: page,
    noItemPerPage,
    searchText,
  });
};
export default { getAPIList };
