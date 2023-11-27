import React, { useState } from 'react';
import { ContractInterface, ethers } from 'ethers';
import ProductOrder from './test.json'; // Replace with the actual path to your compiled smart contract ABI
interface ExtendedWindow extends Window {
  ethereum?: any;
}
const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138'; // Replace with the actual address of your deployed smart contract
const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(
  contractAddress,
  ProductOrder as unknown as ContractInterface,
  signer,
);

const ProductSaleComponent: React.FC = () => {
  const [isPaid, setIsPaid] = useState(false);
  const [isShipped, setIsShipped] = useState(false);

  const handlePay = async () => {
    try {
      const transaction = await contract.pay({ value: ethers.utils.parseEther('1') }); // Replace '1' with the actual amount you want to pay
      await transaction.wait();
      setIsPaid(true);
    } catch (error) {
      console.error('Error paying for the product:', error);
    }
  };

  const handleShipProduct = async () => {
    try {
      const transaction = await contract.shipProduct();
      await transaction.wait();
      setIsShipped(true);
    } catch (error) {
      console.error('Error shipping the product:', error);
    }
  };

  return (
    <div>
      <h1>Product Sale</h1>
      <p>Is Paid: {isPaid.toString()}</p>
      <p>Is Shipped: {isShipped.toString()}</p>
      {!isPaid && <button onClick={handlePay}>Pay for Product</button>}
      {isPaid && !isShipped && <button onClick={handleShipProduct}>Ship Product</button>}
    </div>
  );
};

export default ProductSaleComponent;
