import { Contract, ethers } from 'ethers';
import ExtendedWindow from 'models/ether';
import campaignContract from '@abi/campaign.json';
import transactionContract from '@abi/transactionHistory.json';
import itemContract from '@abi/item.json';
import { CampainUI } from '@models/campain';
import campaignAddress from '../../../abi/campaignAddress';
import campaignWidth from '@abi/withdraw.json';
import adminContract from '@abi/admin.json';
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

const setAddress = async (address: string) => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    const contract = new Contract(campaignAddress.adminAddress, adminContract.abi, signer);
    const tx = await contract.setAdminAddress(address);
    await tx.wait();
    return true;
  } catch (e) {
    return false;
  }
};
const setHistoryAddress = async () => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();

    //campaign
    const contract = new Contract(campaignAddress.contractAddress, campaignContract.abi, signer);
    let tx = await contract.settransactionHistoryContractAddress(campaignAddress.historyAddress);
    await tx.wait();
    tx = await contract.setAdminContractAddress(campaignAddress.adminAddress);
    await tx.wait();
    tx = await contract.setwithdrawRequestContractAddress(campaignAddress.withdrawAddress);
    await tx.wait();

    //history
    const contractHistory = new Contract(
      campaignAddress.historyAddress,
      transactionContract.abi,
      signer,
    );
    tx = await contractHistory.setCampaignAddress(campaignAddress.contractAddress);
    await tx.wait();
    //item
    const contractItem = new Contract(campaignAddress.itemAdress, itemContract.abi, signer);
    tx = await contractItem.setAdminContractAddress(campaignAddress.adminAddress);
    await tx.wait();
    //withDraw
    const contractWith = new Contract(campaignAddress.withdrawAddress, campaignWidth.abi, signer);
    tx = await contractWith.setAdminContractAddress(campaignAddress.adminAddress);
    await tx.wait();
    tx = await contractWith.setContractAddress(campaignAddress.contractAddress);
    await tx.wait();
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
    const tx = await contract.addNewCampaign(
      data.id,
      data.creatorId,
      data.title,
      0,
      data.targetValue,
      getCurrentDate(),
      data.addressCreator,
    );
    await tx.wait();
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
    const tx = await contract.addNewItem(campaignId, message, creatorId, getCurrentDate());
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
    return [];
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
    return [];
  }
};
const refund = async (id: string) => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    const contract = new Contract(campaignAddress.contractAddress, campaignContract.abi, signer);
    const tx = await contract.refundAllByCampaignId(id, getCurrentDate());
    await tx.wait();
    return true;
  } catch (err) {
    return false;
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
    return [];
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
    return [];
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
    return true;
  } catch (error) {
    return false;
  }
};

const approveRequest = async (id: string, status: string, message: string) => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    const contract = new Contract(campaignAddress.withdrawAddress, campaignWidth.abi, signer);
    const tx = await contract.approveWithdrawRequest(id, status, message, getCurrentDate());
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
    return [];
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
  setAddress,
  addRequest,
  approveRequest,
  getRequestByCampaign,
  withDraw,
  refund,
};
