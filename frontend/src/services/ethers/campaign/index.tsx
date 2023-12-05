import { Contract, ethers } from 'ethers';
import ExtendedWindow from 'models/ether';
import campaign from '@abi/campaign.json';
import { getParsedEthersError, EthersError } from '@enzoferey/ethers-error-parser';

const donateCampaign = async (value: number) => {
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
    const campaignId = '123';

    const tx = await contract.donate(campaignId, {
      value: valueInWei,
    });
    await tx.wait();
  } catch (error) {
    const parsedEthersError = getParsedEthersError(error as EthersError);
    console.log(parsedEthersError.context, parsedEthersError.errorCode);
  }
};

const addNew = async () => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    const contract = new Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS || '',
      campaign.abi,
      signer,
    );
    const id = '123';
    const creatorUserName = 'JohnDoe';
    const title = 'My Campaign';
    const currentValue = 0;
    const targetValue = 100;
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
    console.log('sucess');
  } catch (err) {
    console.log(err);
  }
};

export default {
  donateCampaign,
  addNew,
};
