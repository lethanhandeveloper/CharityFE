import { UserUI } from 'models/user';

export const mapUserUI = (userAPI: any): UserUI => {
  return {
    age: userAPI?.age,
    email: userAPI?.email,
    fullname: userAPI?.name,
    gender: userAPI.gender,
    imageUrl: userAPI.image_url,
    phoneNumber: userAPI.phoneNumber,
    communeId: userAPI.communeId,
    userName: userAPI.userName,
    district: userAPI.district,
    province: userAPI.province,
    specificAddress: userAPI.specificAddress,
  };
};
export const mapUsersUI = (userAPI: any): UserUI[] => {
  return userAPI?.map((item: any) => mapUserUI(item));
};
