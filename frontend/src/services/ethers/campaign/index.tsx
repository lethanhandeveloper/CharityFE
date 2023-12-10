import { Contract, ethers } from 'ethers';
import ExtendedWindow from 'models/ether';
import campaign from '@abi/campaign.json';
import transitionHistory from '@abi/transactionHistory.json';
import { CampainUI } from '@models/campain';
import campaignAddress from './campaignAddress';

const donateCampaign = async (id: string, value: number) => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const valueInWei = ethers.utils.parseEther(value.toString());
    const signer = provider.getSigner();
    const contract = new Contract(campaignAddress.contractAddress, campaign.abi, signer);
    const tx = await contract.donate(id, '213413241324132', {
      value: valueInWei,
    });
    await tx.wait();
    return true;
  } catch (error) {
    return false;
  }
};

const addNew = async (data: CampainUI) => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    const contract = new Contract(campaignAddress.contractAddress, campaign.abi, signer);
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
    const contract = new Contract(campaignAddress.contractAddress, campaign.abi, signer);
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
    const contract = new Contract(campaignAddress.contractAddress, campaign.abi, signer);
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
    const contract = new Contract(campaignAddress.historyAddress, transitionHistory.abi, signer);
    const tx = await contract.getTransactionHistoryByCampaignId(id);
    return tx;
  } catch (error) {
    return {};
  }
};
export default {
  donateCampaign,
  addNew,
  getCampainDetail,
  getHistoryByUser,
  getHistoryByCampaign,
};
