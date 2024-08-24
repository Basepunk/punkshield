import React, { useContext } from 'react';
import { writeContract } from '@wagmi/core'
import { abi as MultisigAbi } from '../artifacts/contracts/Punkshieldwallet.sol/Multisigwallet.json';
import { useState } from 'react';
import { parseEther } from 'viem';
import { config } from "../main";
import { UserContext } from '../Context';

const NewTransaction = () => {

  const[toAddress, setToAddress] = useState<string>()
  const[amount, setAmount] = useState<string>()
  const contextData = useContext(UserContext)

  const sendTransaction = async (e: any) => {
    e.preventDefault()
    const result = await writeContract(config, {
      abi: MultisigAbi,
      address: contextData[0].walletAddress,
      functionName: 'submitTxn',
      args: [toAddress],
      value: parseEther(amount as string),
    })

    console.log(result)
  }

  return (
      <div className=''>
        <div className='px-8 flex flex-col gap-4 md:w-[400px] lg:w-[800px]'>
          <h1 className='text-2xl font-bold'>New Transaction</h1>
          <form className='bg-indigo-500 p-4 gap-4 rounded-2xl flex flex-col justify-around'>
            <label className="font-bold text-lg" htmlFor="addressField">Recepeint Address:</label>
            <input className="w-full p-4 bg-black border-4 active:border-pink-600 text-pink-500 font-bold" type="text" name="addressField" id="" onChange={(e: React.FormEvent<HTMLInputElement>) => setToAddress(e.currentTarget.value)}/>
            <label  className="font-bold text-lg" htmlFor="amountField">Amount:</label>
            <input className="w-full p-4 bg-black border-4 active:border-pink-600 text-pink-500 font-bold" name="amountField" id="" onChange={(e: React.FormEvent<HTMLInputElement>) => setAmount(e.currentTarget.value)}/>  
            <button className='border-2 border-white font-bold px-8 py-5 rounded-xl text-[#fff] hover:bg-pink-500 hover:text-black tracking-widest' onClick={sendTransaction}>Send</button>
          </form>
        </div>
      </div>
  )
}

export default NewTransaction