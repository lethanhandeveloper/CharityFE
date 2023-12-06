import { Contract, ethers } from 'ethers';
import ExtendedWindow from 'models/ether';
import { useEffect } from 'react';
import transactionHistory from '@abi/transactionHistory.json';
type TypeHistory = 'user' | 'campaign';
interface TableHistoryComponentProps {
  id: string;
  type: TypeHistory;
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
        let tx;
        // const tx = await contract.getAllTransaction();
        if (props.type === 'user') {
          tx = await contract.getDonateByUser(props.id);
        } else {
          tx = await contract.getTransactionHistoryByCampaignId(props.id);
        }
        console.log(tx);
      } catch (err) {
        console.log(err);
      }
    };
    initData();
  }, [props.id]);
  return <></>;
};
export default TableHistoryComponent;
