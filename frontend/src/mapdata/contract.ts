import { CampaignContractUI, HistoryContractUI } from '@models/contract';
import { BigNumber, ethers } from 'ethers';
const convertDate = (inputString: string): Date => {
  // Split the string into date and time parts
  const parts: string[] = inputString.split(', ');

  const dateParts: number[] = parts[0].split('/').map((part) => parseInt(part, 10));
  const [month, day, year] = dateParts.map((value, index) => (index === 0 ? value - 1 : value)); // Months are zero-based

  const timeParts: number[] = parts[1].split(':').map((part) => parseInt(part, 10));
  const [hours, minutes] = timeParts;

  return new Date(year, month, day, hours, minutes);
};
export const mapCampainContract = (data: any): CampaignContractUI => ({
  id: data.id,
  currentValue: parseFloat(ethers.utils.formatEther(BigNumber.from(data.currentValue).toString())),
  donatorCount: parseFloat(ethers.utils.formatEther(BigNumber.from(data.donateCount).toNumber())),
  targetValue: parseFloat(data.targetValue),
});
export const mapHistoryContract = (data: any): HistoryContractUI => ({
  campaignId: data.campaignId,
  userId: data.donatorId,
  time: convertDate(data.time),
  value: parseFloat(ethers.utils.formatEther(BigNumber.from(data.value).toString())),
});

export const mapHistoryContracts = (list: any): HistoryContractUI[] => {
  return list.map((item: any) => mapHistoryContract(item));
};
