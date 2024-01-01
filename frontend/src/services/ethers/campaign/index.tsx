import { Contract, ethers } from 'ethers';
import ExtendedWindow from 'models/ether';
import campaign from '@abi/campaign.json';
import transitionHistory from '@abi/transactionHistory.json';

import campaignAddress from '../../../abi/campaignAddress';
import campaignWidth from '@abi/withdraw.json';

const getCurrentDate = (): string => {
  return new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};
const donateCampaign = async (id: string, value: number, userId: string) => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const valueInWei = ethers.utils.parseEther(value.toString());
    const signer = provider.getSigner();
    const contract = new Contract(campaignAddress.contractAddress, campaign.abi, signer);
    const tx = await contract.donate(id, userId, getCurrentDate(), {
      value: valueInWei,
    });
    await tx.wait();
    return true;
  } catch (error) {
    return false;
  }
};

const getCampainDetail = async (id: string) => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    const contract = new Contract(campaignAddress.contractAddress, campaign.abi, signer);
    const tx = await contract.getCampaignById(id);

    return tx;
  } catch (error) {
    return null;
  }
};

const getHistoryByUser = async (id: string) => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    const contract = new Contract(campaignAddress.historyAddress, transitionHistory.abi, signer);
    const tx = await contract.getDonateByUser(id);

    return tx;
  } catch (error) {
    return [];
  }
};

const getHistoryByCampaign = async (id: string) => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    const contract = new Contract(campaignAddress.historyAddress, transitionHistory.abi, signer);
    const tx = await contract.getTransactionHistoryByCampaignId(id);
    return tx;
  } catch (error) {
    return [];
  }
};
const getHistoryByOwner = async (id: string) => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    const contract = new Contract(campaignAddress.historyAddress, transitionHistory.abi, signer);
    const tx = await contract.getDonateByOwner(id);
    return tx;
  } catch (error) {
    return [];
  }
};

const addRequest = async (
  id: string,
  value: number,
  address: string,
  createdId: string,
  message: string,
  fileUrl: string,
) => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    const valueInWei = ethers.utils.parseEther(value.toString());
    const contract = new Contract(campaignAddress.withdrawAddress, campaignWidth.abi, signer);
    const tx = await contract.addNewWithdrawRequest(
      id,
      createdId,
      valueInWei,
      'PENDING',
      getCurrentDate(),
      address,
      message,
      fileUrl,
    );
    await tx.wait();
    return true;
  } catch (error) {
    return false;
  }
};

export default {
  donateCampaign,
  getCampainDetail,
  getHistoryByUser,
  getHistoryByCampaign,
  addRequest,
  getHistoryByOwner,
};
