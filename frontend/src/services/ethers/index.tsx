import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

// Extend the Window interface to include the ethereum property
interface ExtendedWindow extends Window {
  ethereum?: any;
}

const EthereumComponent: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    // Connect to Ethereum
    const connectToEthereum = async () => {
      try {
        // Check if MetaMask is installed
        if ((window as ExtendedWindow).ethereum) {
          // Request account access
          await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });

          // Create an ethers.js provider
          const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);

          // Get the current account
          const signer = provider.getSigner();
          const address = await signer.getAddress();

          const balance = await provider.getBalance('ethers.eth');
          // const tx = signer.sendTransaction({
          //   to: 'ricmoo.firefly.eth',
          //   value: ethers.utils.parseEther('1.0'),
          // });
          // (await tx).wait();

          console.log(ethers.utils.formatEther(balance), 'số dư');
          setAccount(address);
        } else {
          console.error('MetaMask not installed');
        }
      } catch (error) {
        console.error('Error connecting to Ethereum:', error);
      }
    };

    connectToEthereum();
  }, []); // Run once on component mount

  return (
    <Dialog open={true}>
      <DialogTitle>Quyên góp ủng hộ {account}</DialogTitle>
      <DialogContent>
        <TextField
          value={'outlined'}
          size='small'
          type='number'
          fullWidth
        />
        <DialogActions>
          <Button>Ủng hộ</Button>
          <Button>Kết nối ví Meta Mask</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default EthereumComponent;
