import { CampaignContractUI, HistoryContractUI, HistoryItemContractUI } from '@models/contract';
import { BigNumber, ethers } from 'ethers';

export const mapCampainContract = (data: any): CampaignContractUI => ({
  id: data.id,
  currentValue: parseFloat(ethers.utils.formatEther(BigNumber.from(data.currentValue).toString())),
  donatorCount: parseInt(ethers.utils.formatEther(BigNumber.from(data.donatorCount).toString())),
  targetValue: parseFloat(data.targetValue),
});

export const mapHistoryContract = (data: any): HistoryContractUI => ({
  campaignId: data.campaignId,
  userId: data.donatorId,
  time: data.time,
  value: parseFloat(ethers.utils.formatEther(BigNumber.from(data.value).toString())),
});
export const mapHistoryItemContract = (data: any): HistoryItemContractUI => ({
  campaignId: data.campaignId,
  userId: data.creatorId,
  time: data.time,
  message: data.message,
});

export const mapHistoryItemContracts = (list: any): HistoryItemContractUI[] => {
  return list.map((item: any) => mapHistoryItemContract(item));
};
export const mapHistoryContracts = (list: any): HistoryContractUI[] => {
  return list.map((item: any) => mapHistoryContract(item));
};
