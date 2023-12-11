import { BannerUI } from '@models/banner';

export const mapBannerUI = (bannerAPI: any): BannerUI => {
  return {
    id: bannerAPI._id,
    title: bannerAPI.title,
    description: bannerAPI.description,
    imageUrl: bannerAPI.imageUrl,
    isActive: bannerAPI.isActive,
  };
};
export const mapBannersUI = (userAPI: any): BannerUI[] => {
  return userAPI?.map((item: any) => mapBannerUI(item));
};
