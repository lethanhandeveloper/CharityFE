const apiEndPoint = {
  //user
  user: {
    login: '/user/login/',
    register: '/user/register/',
    getProfile: '/user',
    updateProfile: '/user',
    updateAvatar: '/user/avatar',
    getActiveList: '/user/list',
    getInActiveList: '/user/listinactive',
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
    getCampainPendingList: '/campaign/filter',
    create: '/campaign',
    getDetail: (id: string) => `/campaign/${id}`,
  },
  getInforHome: '',
  getDetails: '',
  updateUserInfor: '',
};
export default apiEndPoint;
