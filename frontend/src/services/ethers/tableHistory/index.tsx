import { Contract, ethers } from 'ethers';
import ExtendedWindow from 'models/ether';
import { useEffect, useState } from 'react';
import transactionHistory from '@abi/transactionHistory.json';
type TypeHistory = 'user' | 'campaign';
interface TableHistoryComponentProps {
  id: string;
  type: TypeHistory;
}
const TableHistoryComponent = (props: TableHistoryComponentProps) => {
  const [list, setList] = useState([]);
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
        if (props.type === 'user') {
          tx = await contract.getDonateByUser(props.id);
        } else {
          tx = await contract.getTransactionHistoryByCampaignId(props.id);
        }
        setList(tx);
      } catch (err) {
        setList([]);
      }
    };
    initData();
  }, [props.id]);
  console.log(list);
  return <></>;
};
export default TableHistoryComponent;
