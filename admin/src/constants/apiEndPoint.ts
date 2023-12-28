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
    setactive: (id: string) => `/user/changeactivestatus/${id}`,
    getByID: (id: string) => `/user/getbyid/${id}`,
  },

  location: {
    getProvince: '/area/province/list',
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
    list: '/campaign/paginate',
    updateStatus: '/campaign/updateStatus',
  },
  banner: {
    create: '/banner/create',
    update: '/banner/update',
    list: '/banner/all',
    active: '/banner/active',
  },

  commune: {
    create: '/area/commune/create',
    update: '/area/commune/update',
    list: '/area/commune/paginate',
    getByDistrict: (id: string) => `/commune/${id}/district`,
  },
  province: {
    create: '/area/province/create',
    update: '/area/province/update',
    list: '/area/province/paginate',
  },
  district: {
    create: '/area/district/create',
    update: '/area/district/update',
    list: '/area/district/paginate',
    getByProvince: (id: string) => `/district/${id}/province`,
  },
  map: {
    create: '/map/create',
    update: '/map/update',
    list: '/map/list',
  },
  request: {
    update: (id: string) => `/user/verification/${id}`,
    list: '/user/verification/paginate',
  },
  feedback: {
    list: '/feedback/paginate',
    create: '/feedback',
    update: (id: string) => `/feedback/${id}`,
    updateStatus: (id: string) => `/feedback/setshowinhomepage/${id}`,
  },
};
export default apiEndPoint;
