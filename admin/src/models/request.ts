import { UserUI } from './user';

export interface PersonalGeneralInfoUI {
  achivementDoc: string;
  actionDescSociaLink: string;
  underOrg: string;
  logo: string;
  clubName: string;
  roleOnClub: string;
  address: string;
  socialNetworkLink: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  name: string;
  user: UserUI;
}

export interface CommitInfoVerificationUI {
  endDate: Date;
  startDate: Date;
  targetAmount: number;
  goalName: string;
  publicBankAccount: string;
}

export interface SurveyInfoVerificationUI {
  chanel: string;
  lawFiveOption: string;
  lawFourOption: string;
  lawThreeOption: string;
  lawTwoOption: string;
  lawOneOption: string;
  surveyInfoVerification: string;
}
export interface RequestUI {
  id: string;
  type: string;
  status: string;
  personalGeneralInfoUI: PersonalGeneralInfoUI;
  commitInfoVerificationUI: CommitInfoVerificationUI;
  surveyInfoVerificationUI: SurveyInfoVerificationUI;
}
