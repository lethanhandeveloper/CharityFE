import { BannerUI } from 'models/banner';

export const mapBannerUI = (dataAPI: any): BannerUI => {
  return {
    description: dataAPI.description,
    title: dataAPI.title,
    imgUrl: dataAPI.imageUrl,
  };
};
export const mapBannerUIs = (listAPI: any): BannerUI[] => {
  return listAPI.map((item: any) => mapBannerUI(item));
};
