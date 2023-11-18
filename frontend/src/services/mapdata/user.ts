import { UserUI } from '@services/models/user';

export const mapUserUI = (userAPI: any): UserUI => {
  return {
    age: userAPI?.age,
    email: userAPI?.email,
    fullname: userAPI?.name,
    gender: '',
    imageUrl: '',
    phoneNumber: '',
    role: 'Normal',
  };
};
export const mapUsersUI = (userAPI: any): UserUI[] => {
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
