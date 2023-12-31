import { Contract, ethers } from 'ethers';
import ExtendedWindow from 'models/ether';
import campaignContract from '@abi/campaign.json';
import transactionContract from '@abi/transactionHistory.json';
import itemContract from '@abi/item.json';
import { CampainUI } from '@models/campain';
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

const setHistoryAddress = async () => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();

    const contract = new Contract(campaignAddress.contractAddress, campaignContract.abi, signer);
    const tx = await contract.setTransactionHistoryAddress(campaignAddress.historyAddress);
    const txWith = await contract.setWithdrawRequestAddress(campaignAddress.withdrawAddress);

    const contractHis = new Contract(
      campaignAddress.historyAddress,
      transactionContract.abi,
      signer,
    );
    const txHis = await contractHis.setCampaignAddress(campaignAddress.contractAddress);

    const contractWith = new Contract(campaignAddress.withdrawAddress, campaignWidth.abi, signer);
    const txWithContract = await contractWith.setCampaignAddress(campaignAddress.contractAddress);

    await tx.wait();
    await txWith.wait();
    await txWithContract.await();
    await txHis.wait();

    return true;
  } catch (err) {
    return false;
  }
};

const addNew = async (data: CampainUI) => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    const contract = new Contract(campaignAddress.contractAddress, campaignContract.abi, signer);
    const id = data.id;
    const creatorUserName = data.categoryId;
    const title = data.title;
    const currentValue = 0;
    const targetValue = data.targetValue;
    const tx = await contract.addNewCampaign(
      id,
      creatorUserName,
      title,
      currentValue,
      targetValue,
      getCurrentDate(),
    );
    const test = await tx.wait();
    console.log(test, tx, 'xcvcxv');
    setHistoryAddress();
    return true;
  } catch (err) {
    return false;
  }
};

const addItem = async (campaignId: string, creatorId: string, message: string) => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    const contract = new Contract(campaignAddress.itemAdress, itemContract.abi, signer);

    const tx = await contract.addNew(campaignId, creatorId, message, getCurrentDate());
    await tx.wait();
    return true;
  } catch (err) {
    return false;
  }
};

const getCampainDetail = async (id: string) => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    const contract = new Contract(campaignAddress.contractAddress, campaignContract.abi, signer);
    const tx = await contract.getCampaignById(id);

    return tx;
  } catch (error) {
    return {};
  }
};

const getHistoryByUser = async (id: string) => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    const contract = new Contract(campaignAddress.contractAddress, campaignContract.abi, signer);
    const tx = await contract.getDonateByUser(id);

    return tx;
  } catch (error) {
    return {};
  }
};

const getHistoryByCampaign = async (id: string) => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    const contract = new Contract(campaignAddress.historyAddress, transactionContract.abi, signer);
    const tx = await contract.getTransactionHistoryByCampaignId(id);
    return tx;
  } catch (error) {
    return {};
  }
};

const getItemByCampaign = async (id: string) => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    const contract = new Contract(campaignAddress.itemAdress, itemContract.abi, signer);
    const tx = await contract.getTransactionHistoryByCampaignId(id);
    return tx;
  } catch (error) {
    return {};
  }
};
const getItemByUser = async (id: string) => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();

    const contract = new Contract(campaignAddress.itemAdress, itemContract.abi, signer);
    const tx = await contract.getTransactionHistoryByCampaignId(id);
    return tx;
  } catch (error) {
    return {};
  }
};

const addRequest = async (id: string, value: number, address: string) => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    const valueInWei = ethers.utils.parseEther(value.toString());
    const contract = new Contract(campaignAddress.withdrawAddress, campaignWidth.abi, signer);
    const tx = await contract.addNewWithdrawRequest(id, valueInWei, address);
    await tx.wait();
  } catch (error) {
    return {};
  }
};

const approveRequest = async (id: string) => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();

    const contract = new Contract(campaignAddress.withdrawAddress, campaignWidth.abi, signer);
    const tx = await contract.approveWithdrawRequest(id);
    await tx.wait();
    return true;
  } catch (error) {
    return false;
  }
};

const getRequestByCampaign = async (id: string) => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    const contract = new Contract(campaignAddress.withdrawAddress, campaignWidth.abi, signer);
    const tx = await contract.getWithdrawRequestByCampaignId(id);
    return tx;
  } catch (error) {
    return {};
  }
};
const withDraw = async (id: string) => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    const contract = new Contract(campaignAddress.contractAddress, campaignContract.abi, signer);
    const tx = await contract.withdraw(id);
    return tx;
  } catch (error) {
    return {};
  }
};

export default {
  addNew,
  setHistoryAddress,
  getCampainDetail,
  getHistoryByCampaign,
  getHistoryByUser,
  addItem,
  getItemByCampaign,
  getItemByUser,

  addRequest,
  approveRequest,
  getRequestByCampaign,
  withDraw,
};
