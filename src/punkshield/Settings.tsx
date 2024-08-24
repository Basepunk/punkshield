import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { useContext, useEffect, useState } from 'react';
import { readContract } from '@wagmi/core';
import { abi } from '../artifacts/contracts/Punkshieldwallet.sol/Multisigwallet.json';
import { config } from "../main";
import { ImCheckmark } from "react-icons/im";
import { writeContract } from '@wagmi/core'
import { Address } from 'viem';
import { UserContext } from "../Context";
import { TiCancel } from "react-icons/ti";

const Settings = () => {
    const contextData = useContext(UserContext)
    const account = contextData[0].account

    const walletAddress = contextData[0].walletAddress;
    const[confirmReq, setConfirmReq] = useState(contextData[0].require);
    const[safeName, setSafeName] = useState(contextData[0].safeName);
    const[ownersArr, setOwners] = useState<string[]>([]);
    const[addOwner, setAddOwner] = useState<Address>();
    const[i, setI] = useState<boolean>(true)
    const[j, setJ] = useState<boolean>(true)
    const[toggleNewOwner, setToggleNewOwner] = useState<boolean>();

    const handleEdit = async () => {
      const result = await writeContract(config, {
        abi,
        address: walletAddress,
        functionName: 'setConfirmation',
        args: [confirmReq],
      })
      result && contextData[0].dispatch({ type: "increase"})
      setI(!i)
    }

    const handleSavings = async () => {
      const result = await writeContract(config, {
        abi,
        address: walletAddress,
        functionName: 'setName',
        args: [safeName],
      })
      result && contextData[0].dispatch({ type: "increase"})
      setJ(!j);
    }

    const handleAddOwner = async () => {
      const result = await writeContract(config, {
        abi,
        address: walletAddress,
        functionName: 'addOwner',
        args: [addOwner],
      });
      result && contextData[0].dispatch({ type: "increase"})
      setToggleNewOwner(false)
    }

    const handleDeleteOwner = async (i: number) => {
      const result = await writeContract(config, {
        abi,
        address: walletAddress,
        functionName: 'removeOwner',
        args: [i],
      });

      result && contextData[0].dispatch({ type: "increase"})
    }

    useEffect(() => {
      (async () => {
        const owners = await readContract(config, {
          abi,
          address: walletAddress,
          functionName: 'getOwners',
          account: account, 
        });
        setOwners(owners as string[])
      })()
      
      contextData[0].dispatch({ type: "increase"})

    },[account])

  return (
    <div>
      <div className="p-8 flex flex-col gap-8">
        <div className="bg-gray-900 p-8 w-full flex flex-col md:flex-row justify-between">
            <h1 className="text-2xl font-bold">Manage wallet Account owners</h1>
            <div>
              <h3 className='text-xl p-4'>All Signers</h3>
              <div className='flex-col items-center'>   
              {
                ownersArr ? ownersArr.map((val, i) => <div className='flex flex-row justify-center items-center gap-2 m-3'>
                  <input value={val} onChange={(e: any) => setAddOwner(e.target.value)} className='w-full text-white bg-black py-8 px-2 font-bold text-lg' type='text'  name='owners'/>
                  <AiOutlineDelete size={30} onClick={() => handleDeleteOwner(i)}/>
                  <IoMdAddCircleOutline size={30} onClick={() => setToggleNewOwner(true)}/>
                </div>):""
              }
              </div>
              {
                toggleNewOwner ? (<div className="flex flex-row justify-center items-center gap-2 m-3">
                  <input value={addOwner} onChange={(e: any) => setAddOwner(e.target.value)} className='w-full text-white bg-black py-8 px-2 font-bold text-lg' type='text'  name='owners'/>
                  <ImCheckmark size={30} onClick={handleAddOwner} />
                  <TiCancel size={30} onClick={() => setToggleNewOwner(false)} />
                </div>):""
              }
            </div>
        </div>
        <div className="bg-gray-900 p-8 w-full flex flex-col md:flex-row justify-between">
          <h1 className="text-2xl font-bold">Rename wallet</h1>
          <div className=''>
          <h3 className='text-xl p-4'>Punkshield wallet</h3>
              <div className='flex gap-3 items-center'>
              <input onChange={e => setSafeName(e.currentTarget.value)} className='w-full text-white bg-black py-8 px-2 font-bold text-lg' type='text' value={safeName} name='wallet_name' disabled={j}/>
              {
                !j ? <ImCheckmark size={30} onClick={handleSavings}/> : <CiEdit size={30} onClick={() => setJ(!j)}/>
              }
              </div>
          </div>
        </div>
        <div className="bg-gray-900 p-8 w-full flex flex-col md:flex-row gap-3 justify-between">
          <h1 className="text-2xl font-bold">Required confirmations</h1>
          <div>
            <h1 className='text-xl mb-2'>Number of required Confirmation</h1>
            <div className="flex gap-3 items-center">
              <input onChange={e => setConfirmReq(e.currentTarget.value)} className='w-full text-white bg-black py-8 px-2 font-bold text-lg' type='text' value={Number(confirmReq)} name='num_req' disabled={i}/>
              {
                !i ? <ImCheckmark size={30} onClick={handleEdit}/> : <CiEdit size={30} onClick={() => setI(!i)}/>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings