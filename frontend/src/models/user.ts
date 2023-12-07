export interface UserAPI {
  useraccount: string;
  password: string;
}
export type UserRole = 'Normal' | 'Organization';

export interface UserUI {
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
  commune: string;
}
export interface PersonalUI {
  name: string;
  dateOfBirth: Date;
  phoneNumber: string;
  email: string;
  socialNetworkLink: string;
  address: string;
  roleOnClub: number;
  clubName: string;
  logo: string;
  underOrg: string;
  actionDescSociaLink: string;
  achivementDoc: string;
}
export interface OrganizationUI {
  description: string;
  representativeEmail: string;
  representativePhoneNumber: string;
  representativeName: string;
  achivementDoc: string;
  actionDescSocialLink: string;
  address: string;
  operationField: string;
  website: string;
  establishedDate: Date;
  name: string;
}
