import { Contract, ethers } from 'ethers';
import ExtendedWindow from 'models/ether';
import campaign from '@abi/campaign.json';
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
      campaign.abi,
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
const setHistoryAddress = async () => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    const contract = new Contract(campaignAddress.contractAddress, campaign.abi, signer);

    const tx = await contract.setTransactionHistoryAddress(campaignAddress.historyAddress);
    await tx.wait();
    return true;
  } catch (err) {
    return false;
  }
};
export default {
  donateCampaign,
  addNew,
  setHistoryAddress,
};
