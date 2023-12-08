import { Contract, ethers } from 'ethers';
import ExtendedWindow from '@models/ether';
import { useEffect } from 'react';
import transactionHistory from '@abi/transactionHistory.json';

interface TableHistoryComponentProps {
  campaignID: string;
}
const TableHistoryComponent = (props: TableHistoryComponentProps) => {
  useEffect(() => {
    const initData = async () => {
      try {
        const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
        await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
        const signer = provider.getSigner();
        const contract = new Contract(
          process.env.REACT_APP_HISTRY_ADDRESS || '',
          transactionHistory.abi,
          signer,
        );

        const tx = await contract.getAllTransaction();
        console.log('sucess', tx);
      } catch (err) {
        console.log(err);
      }
    };
    initData();
  }, [props.campaignID]);
  return <></>;
};
export default TableHistoryComponent;
