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
    getByID: (id: string) => `/user/getbyid/${id}`,
    getRequestId: (id: string) => `/user/verification/${id}`,
    getRequestByUser: '/user/verification/myrequest',
    email: '/user/register/getcode',
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
    getCampaignByUser: '/campaign/byuser',
    getCampaignByCurentUser: '/campaign/user',
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
