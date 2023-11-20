const apiEndPoint = {
  //user
  user: {
    login: '/user/login/',
    register: '/user/register/',
    getProfile: '/user',
  },

  location: {
    getProvince: '/area/province',
    getDistrict: '/area/district',
    getCommune: '/area/commune',
    getCommuneByDistrict: (id: string) => `/area/commune/${id}/district`,
    getDistrictByProvince: (id: string) => `/area/district/${id}/province`,
  },
  campain: {
    category: '/campaign/category',
    itemType: '/campaign/itemtype',
    getCampainList: '/campaign',
    create: '/campaign',
  },
  getInforHome: '',
  getDetails: '',
  updateUserInfor: '',
};
export default apiEndPoint;
