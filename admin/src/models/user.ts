export interface UserAPI {
  useraccount: string;
  password: string;
}
export type UserRole = 'Normal' | 'Organization';

export interface UserUI {
  id: string;
  fullname: string;
  imageUrl: string;
  email: string;
  phoneNumber: string;
  gender: string;
  age: number;
  communeId: string;
  userName: string;
  specificAddress: string;
  province: string;
  district: string;
  isActive: boolean;
}
export type RegisterValue = {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  gender: string;
  age: number;
  provinceId: string;
  districtId: string;
  communeId: string;
  image_url: string;
  specificAddress: string;
};
