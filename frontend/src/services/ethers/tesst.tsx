import React from 'react';
import { ethers } from 'ethers';
import ProductOrder from './test.json'; // Replace with the actual path to your compiled smart contract ABI
import { Button } from '@mui/material';
interface ExtendedWindow extends Window {
  ethereum?: any;
}
const contractAddress = '0xBCb65f807bC01A7f5FedFCF48aE9E05a13A6EDe5'; // Replace with the actual address of your deployed smart contract
const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, ProductOrder.abi, signer);
interface ProductSaleComponentProps {
  id: string;
  createUser: string;
  title: string;
  currentValue: number;
  targetValue: number;
  endDate: Date;
}
const ProductSaleComponent = (props: ProductSaleComponentProps) => {
  const createContract = async () => {
    try {
      console.log('zxcxz');
      const transaction = await contract.addNewCampaign(
        props.id,
        props.createUser,
        props.title,
        props.currentValue,
        props.targetValue,
        props.endDate,
      );
      await transaction.wait(props);
    } catch (e) {
      console.error('Error creating the contract');
    }
  };
  return (
    <div>
      <h1>Product Sale</h1>
      <Button onClick={createContract}>tọa</Button>
    </div>
  );
};

export default ProductSaleComponent;
