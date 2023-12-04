import { Contract, ethers } from 'ethers';
import ExtendedWindow from 'models/ether';
import campaignAPI from '@abi/campaign.json';
const donateCampaign = async () => {
  try {
    const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
    await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    const contract = new Contract(contractAddress, campaignAPI.abi, signer);
    const campaignId = '123';

    const tx = await contract.donate(campaignId, {
      value: valueInWei,
    });
    await tx.wait();
    console.log('Campaign added successfully!');
  } catch (error) {
    const parsedEthersError = parsedEthersError(error as EthersError);
    console.log(parsedEthersError.context, parsedEthersError.errorCode);
  }
};
export default donateCampaign;
