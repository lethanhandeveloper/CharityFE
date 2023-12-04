import { BannerUI } from '@models/banner';

export const mapBannerUI = (bannerAPI: any): BannerUI => {
  return {
    id: bannerAPI.id,
    title: bannerAPI.title,
    description: bannerAPI.description,
    imageUrl: '',
    isActive: bannerAPI.isActive,
  };
};
export const mapBannersUI = (userAPI: any): BannerUI[] => {
  return userAPI?.map((item: any) => ({
    age: item?.age,
    email: userAPI?.email,
    fullname: userAPI,
    gender: '',
    imageUrl: '',
    phoneNumber: '',
    role: 'Normal',
  }));
};
