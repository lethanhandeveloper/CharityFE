export interface CampaignContractUI {
  id: string;
  currentValue: number;
  donateValue: number;
  targetValue: number;
}
export interface HistoryContractUI {
  value: number;
  time: Date;
  campaignId: string;
  userId: string;
  timeString: string;
  isAnonymous: boolean;
  isRefund: boolean;
}
