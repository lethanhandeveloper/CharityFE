import {
  CommitInfoVerificationUI,
  PersonalGeneralInfoUI,
  RequestUI,
  SurveyInfoVerificationUI,
} from '@models/request';

const mapComitInfoVerificationUI = (data: any): CommitInfoVerificationUI => ({
  endDate: data.endDate,
  goalName: data.goalName,
  publicBankAccount: data.publicBankAccount,
  startDate: data.startDate,
  targetAmount: data.targetAmount,
});

const mapPersonalGeneralInfoUI = (data: any): PersonalGeneralInfoUI => ({
  achivementDoc: data.achivementDoc,
  actionDescSociaLink: data.actionDescSociaLink,
  address: data.address,
  clubName: data.clubName,
  dateOfBirth: data.dateOfBirth,
  email: data.email,
  logo: data.logo,
  name: data.name,
  phoneNumber: data.phoneNumber,
  roleOnClub: data.roleOnClub,
  socialNetworkLink: data.socialNetworkLink,
  underOrg: data.underOrg,
  user: data.user,
});

const mapSurvayInfoVerificationUI = (data: any): SurveyInfoVerificationUI => ({
  chanel: data.chanel,
  lawFiveOption: data.lawFiveOption,
  lawFourOption: data.lawFourOption,
  lawOneOption: data.lawOneOption,
  lawThreeOption: data.lawThreeOption,
  lawTwoOption: data.lawTwoOption,
  surveyInfoVerification: data.surveyInfoVerification,
});

export const mapRequestUI = (data: any): RequestUI => ({
  commitInfoVerificationUI: mapComitInfoVerificationUI(data.commitInfoVerification),
  id: data.id,
  status: data.status,
  personalGeneralInfoUI: mapPersonalGeneralInfoUI(data.personalGeneralInfo),
  surveyInfoVerificationUI: mapSurvayInfoVerificationUI(data.surveyInfoVerification),
  type: data.type,
});
