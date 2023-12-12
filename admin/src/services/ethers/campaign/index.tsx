import { Contract, ethers } from 'ethers';
import ExtendedWindow from 'models/ether';
import campaignContract from '@abi/campaign.json';
import transactionContract from '@abi/transactionHistory.json';
import itemContract from '@abi/item.json';
import { CampainUI } from '@models/campain';
import campaignAddress from './campaignAddress';

const donateCampaign = async (id: string, value: number) => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const valueInWei = ethers.utils.parseEther(value.toString());
    const signer = provider.getSigner();
    const contract = new Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS || '',
      campaignContract.abi,
      signer,
    );

    const tx = await contract.donate(id, {
      value: valueInWei,
    });
    await tx.wait();
    return true;
  } catch (error) {
    return false;
  }
};

const setHistoryAddress = async () => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();

    const contract = new Contract(campaignAddress.contractAddress, campaignContract.abi, signer);
    const tx = await contract.setTransactionHistoryAddress(campaignAddress.historyAddress);

    const contractHis = new Contract(
      campaignAddress.historyAddress,
      transactionContract.abi,
      signer,
    );
    const txHis = await contractHis.setCampaignAddress(campaignAddress.contractAddress);

    await tx.wait();
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
    const endDate = Math.floor(Date.now() / 1000) + 3600;
    const tx = await contract.addNewCampaign(
      id,
      creatorUserName,
      title,
      currentValue,
      targetValue,
      endDate,
    );
    await tx.wait();
    setHistoryAddress();
    return true;
  } catch (err) {
    return false;
  }
};

const addItem = async (campaignId: string, creatorId: string, message: string, time: Date) => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    const contract = new Contract(campaignAddress.itemAdress, itemContract.abi, signer);
    const endDate = Math.floor(new Date(time).getTime() / 1000) + 3600;
    const tx = await contract.addNew(campaignId, creatorId, message, endDate);
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

export default {
  donateCampaign,
  addNew,
  setHistoryAddress,
  addItem,
  getCampainDetail,
  getHistoryByCampaign,
  getHistoryByUser,
};
