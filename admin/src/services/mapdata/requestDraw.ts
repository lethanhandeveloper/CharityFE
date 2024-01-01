import { WithDrawUI } from '@models/contract';
import { BigNumber, ethers } from 'ethers';

const mapWithDaw = (data: any): WithDrawUI => ({
  id: data.id._hex,
  message: data.message,
  messageApprove: data.messageAprrove,
  status: data.isApproved,
  time: data.time,
  timeApprove: data.timeApprove,
  value: parseInt(ethers.utils.formatEther(BigNumber.from(data.value).toString())),
});
export const mapWithDaws = (list: any) => list.map((item: any) => mapWithDaw(item));
