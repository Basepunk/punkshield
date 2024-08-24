import { NavLink } from 'react-router-dom'
import DeployModal from '../CreateSafe/DeployModal'
import { useContext, useEffect, useState } from 'react'
import { FaCopy } from "react-icons/fa6";
import { GiCheckMark } from "react-icons/gi";
import { Address, parseEther } from 'viem';
import { writeContract } from '@wagmi/core'
import { abi } from '../artifacts/contracts/Punkshieldwallet.sol/Multisigwallet.json';
import { config } from "../main";
import { UserContext } from '../Context';

const Account = (props: any) => {
  const[openModal, setOpenModal] = useState<boolean>(false);
  const[isClicked, setIsClicked] = useState<boolean>(false);
  const[withdrawModal, setWithdrawModal] = useState<boolean>(false)
  const[toAddress, setToAddress] = useState<string>()
  const[amount, setAmount] = useState<string>()
  const[result, setResult] = useState<string>()

  const contextData = useContext(UserContext)

  const handleWithdraw = async () => {
    
    const result = await writeContract(config, {
      abi,
      address: contextData[0].walletAddress,
      functionName: 'submitTxn',
      args: [toAddress],
      value: parseEther(amount as string),
    });
    setResult(result)
  }

  useEffect(() => {
    contextData[0].dispatch({ type: "increase"});
  },[])

  return (
    <div className=''>
      <div className='flex items-center justify-around flex-col gap-4 md:flex-row my-8 p-4'>
        <div className={`${contextData[0].chainName == "Mint" ? "bg-[#002d06a3] p-4  rounded-2xl" : "bg-indigo-500 p-4  rounded-2xl"}`}>
          <h1 className='text-xl md:text-2xl font-bold mb-2 mt-8'>Add native assets</h1>
          <p className='mb-2'>Receive ETH to start interacting with your account.</p>
          <div className='flex items-center  justify-between gap-4'>
            <button onClick={() => setOpenModal(true) } className='bg-white font-bold p-3 rounded-xl text-[#31446D]'>Add funds</button>
            <button onClick={() => setWithdrawModal(true) } className='bg-white font-bold p-3 rounded-xl text-[#31446D]'>Withdraw Fund</button>
          </div>
        </div>
        <div   className={`${contextData[0].chainName == "Mint" ? "bg-[#002d06a3] p-4  rounded-2xl" : "bg-indigo-500 p-4  rounded-2xl"}`}>
          <h1 className='text-xl md:text-2xl font-bold mb-2 mt-8'>Create your first transaction</h1>
          <p className='mb-2'>Simply send funds, add a new signer or swap tokens through a wallet app.</p>
          <NavLink to="new-transaction">
            <button className='bg-white font-bold p-3 rounded-xl text-[#31446D]'>Create Transaction</button>
          </NavLink>
        </div>
      </div>
      <DeployModal open={openModal} onClose={() => setOpenModal(false)}>
          <div className='flex flex-col gap-4'>
              <div>
                <h1 className='text-2xl font-bold fixed top-0 mt-4'>Add funds to your {props.safeName} Wallet</h1>
                <p className='pt-12 font-thin text-lg'>Send funds from your ethereum wallet on the Base mainnet to the address below and wait for your balance to reflect</p>
              </div>
              <div className='flex justify-center'>
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${contextData[0].walletAddress}`} width="200px" alt="" />
              </div>
              <div className="flex items-center justify-between p-4">
                <input className='w-11/12 bg-black inputy-8 px-2 rounded-lg font-thin text-lg' disabled value={contextData[0].walletAddress}/>
                {
                  isClicked ? 
                  <div className='flex items-center gap-1'>
                    <p>Copied</p>
                    <GiCheckMark size={13}/>
                  </div> : 
                  <div>
                    <FaCopy size={20} className='hover:bg-grey/50 hover:backdrop-brightness-xl' 
                    onClick={() => {
                      navigator.clipboard.writeText(contextData[0].walletAddress as Address);
                      setTimeout(()  => {
                        setIsClicked(false);
                      },500)
                      setIsClicked(true);
                      }}
                      />
                  </div>
                }
              </div>
          </div>
      </DeployModal>
      <DeployModal open={withdrawModal} onClose={() => setWithdrawModal(false)}>
            {
              !result ? 
              <div className='flex flex-col gap-4'>
                <h1 className='text-2xl font-bold fixed top-0 mt-4'>Withdraw funds from your {props.safeName} Wallet</h1>
              <p className='pt-12 font-thin text-lg'>Withdraw funds from your punkshield wallet. Note that funds will be sent to the wallet you used to create punkshield</p>
                <div>
                  <label htmlFor="address">Address:</label>
                  <input onChange={e => setToAddress(e.target.value)} placeholder='Enter address' type="text" name="address" id="" className='w-11/12 bg-black py-2 px-2 font-thin text-lg'/>
                </div>
                <div>
                  <label htmlFor="amount">Amount:</label>
                  <input onChange={e => setAmount(e.target.value)} placeholder='Enter Amount' type="number" name="amount" id="" className='w-11/12 bg-black py-2 px-2 font-thin text-lg'/>
                </div>
              <button onClick={handleWithdraw} className='bg-white font-bold p-3 rounded-xl text-[#31446D]'>Send</button>
              </div>:
              <div>
                <h1>Sent</h1>
                <h3>Transaction hash: {result}</h3>
              </div>
            }
      </DeployModal>
    </div>
  )
}

export default Account