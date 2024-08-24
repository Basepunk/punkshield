import { useContext, useEffect, useState } from 'react'
import { readContract, writeContract } from '@wagmi/core';
import { abi } from '../artifacts/contracts/Punkshieldwallet.sol/Multisigwallet.json';
import { config } from "../main";
import { formatEther } from 'viem';
import { UserContext } from '../Context';

const Queue = () => {
  const contextData = useContext(UserContext)

  const walletAddress = contextData[0].walletAddress;
  const[transactions, setTransactions] = useState<string[]>();
  // call the txn array to spit out the all the transactions and filter the
  // txn that need confirmation using the boolean executed
  // and store them in an array variable
  // call the submitTxn functions with the
  // txnId from the the array above to confirm the transaction
  const handleApprove = async (i: number) => {
    const result = await writeContract(config, {
      abi,
      address: walletAddress,
      functionName: "confirmTxn",
      args: [i],
    });
    console.log(result)
  }

  useEffect(() => {
    contextData[0].dispatch({ type: "increase"});

    (async () => {
      const transactions = await readContract(config, {
        abi,
        address: walletAddress,
        functionName: 'getTransactions',
      });
      setTransactions(transactions as string[])
    })()
  },[]);


  return (
    <div className='flex flex-col justify-center'>
      <h1 className='text-lg md:text-2xl font-bold tracking-wide text-center'>
        Queue
      </h1>
      {
        transactions?.map((val: any, i: number) => 
          !val.executed? 
        <div className='py-8 flex items-center justify-around '>
            <h3 className='text-md font-bold'>{val.to}</h3>
            <p className='text-md font-bold'>{formatEther(val.value as bigint).slice(0,6)} ETH</p>
            <p>{val.executed}</p>
          <div>
            <button className='bg-[#691687] font-bold px-10 py-3 rounded-xl text-[#fff]' onClick={() => handleApprove(i)}>Approve</button>
          </div>
        </div>: ""
        )
      }
    </div>
  )
}

export default Queue