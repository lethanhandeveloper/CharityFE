const apiEndPoint = {
  //user
  user: {
    login: '/user/login/',
    register: '/user/register/',
    getProfile: '/user',
    updateProfile: '/user',
    updateAvatar: '/user/avatar',
    home: '/user/home',
    request: (type: string) => `/user/verification/${type}`,
  },

  location: {
    getProvince: '/area/province/list',
    getDistrict: '/area/district/list',
    getCommune: '/area/commune/list',
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
    home: '/campaign/home',
  },

  banner: {
    getList: '/banner/list',
  },
  getInforHome: '',
  getDetails: '',
  updateUserInfor: '',
};
export default apiEndPoint;
