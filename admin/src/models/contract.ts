export interface CampaignContractUI {
  id: string;
  currentValue: number;
  donatorCount: number;
  targetValue: number;
}
export interface HistoryContractUI {
  value: number;
  time: Date;
  campaignId: string;
  userId: string;
}
export interface HistoryItemContractUI {
  time: string;
  message: string;
  campaignId: string;
  userId: string;
}
export interface WithDrawUI {
  id: string;
  value: number;
  message: string;
  messageApprove: string;
  time: string;
  status: string;
  timeApprove: string;
}
