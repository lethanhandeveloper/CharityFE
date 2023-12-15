import { CampaignContractUI, HistoryContractUI } from '@models/contract';
import { BigNumber, ethers } from 'ethers';

export const mapCampainContract = (data: any): CampaignContractUI => ({
  id: data.id,
  currentValue: parseFloat(ethers.utils.formatEther(BigNumber.from(data.currentValue).toString())),
  donatorCount: parseFloat(ethers.utils.formatEther(BigNumber.from(data.donateCount).toNumber())),
  targetValue: parseFloat(data.targetValue),
});
export const mapHistoryContract = (data: any): HistoryContractUI => ({
  campaignId: data.campaignId,
  userId: data.donatorId,
  time: data.time,
  value: parseFloat(ethers.utils.formatEther(BigNumber.from(data.value).toString())),
});
export const mapHistoryContracts = (list: any): HistoryContractUI[] => {
  return list.map((item: any) => mapHistoryContract(item));
};
