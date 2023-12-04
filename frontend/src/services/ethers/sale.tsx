// Import necessary modules
import { ethers, Contract } from 'ethers';
// import { Contract } from '@ethersproject/contracts';

// Import the ABI of your smart contract
import test from './test.json'; // Replace with your ABI file
import { getParsedEthersError, EthersError } from '@enzoferey/ethers-error-parser';
import history from './history.json';
interface ExtendedWindow extends Window {
  ethereum?: any;
}
const YourComponent: React.FC = () => {
  const contractAddress = '0x8D5e6d611BEa62c3dB5aeE5fBc978cE2523eEdE7';
  const valueInWei = ethers.utils.parseEther('100');
  const donate = async () => {
    try {
      const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
      await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
      const signer = provider.getSigner();
      const contract = new Contract(contractAddress, test.abi, signer);
      const campaignId = '123';

      const tx = await contract.donate(campaignId, {
        value: valueInWei,
      });
      await tx.wait();
      console.log('Campaign added successfully!');
    } catch (error) {
      const parsedEthersError = getParsedEthersError(error as EthersError);
      console.log(parsedEthersError.context, parsedEthersError.errorCode);
    }
  };

  const getdetail = async () => {
    try {
      const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
      await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
      const signer = provider.getSigner();
      const contract = new Contract(contractAddress, test.abi, signer);
      const tx = await contract.getCampaignById('123');
      console.log('Campaign added successfully!', tx);
    } catch (error) {
      console.error('Error adding campaign:', error);
    }
  };

  const addNew = async () => {
    try {
      const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
      await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
      const signer = provider.getSigner();
      const contract = new Contract(contractAddress, test.abi, signer);
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
        {
          value: valueInWei,
        },
      );
      console.log('sucess');
      await tx.wait();
      console.log('sucess');
    } catch (err) {
      console.log(err);
    }
  };
  const getHistory = async () => {
    try {
      const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
      await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
      const signer = provider.getSigner();
      const contract = new Contract(
        '0x0483D28786523e07F36c83D7C24aAfF6AF3bF0Cd',
        history.abi,
        signer,
      );

      const tx = await contract.getAllTransaction();
      console.log('sucess');
      await tx.wait();
      console.log('sucess');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Your Component</h1>
      <button onClick={addNew}>Add New Campaign</button>
      <button onClick={getdetail}>Detail</button>
      <button onClick={donate}>Doante</button>
    </div>
  );
};

export default YourComponent;
