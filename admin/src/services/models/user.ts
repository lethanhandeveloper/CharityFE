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
  role: UserRole;
}
