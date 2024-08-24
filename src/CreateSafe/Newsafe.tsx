import { useEffect, useState } from "react";
import { parseEther } from "viem";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { IoMdAddCircle } from "react-icons/io";
import DeployModal from "./DeployModal";
import { abi } from '../artifacts/contracts/Punkshieldwallet.sol/Punkshieldwallet.json';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { config } from "../main";
import { writeContract, readContract, switchChain  } from '@wagmi/core';
import Spinner from '../assets/svg-spinners--180-ring-with-bg.svg';
import { abi as MintPunksABI } from '../artifacts/contracts/MintPunks.sol/MintPunks.json';
import { abi as BasePunksABI } from '../artifacts/contracts/BasePunks.sol/BasePunks.json';
import { mintMainnet } from "../config";
import { base } from "viem/chains";


const Newsafe = () => {
  const navigate = useNavigate()

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  let chainId = query.get("chainid");

  interface SignersType {
    signerName: string | undefined,
    signerAddress: string | undefined
  }

  const[safeName, setSafeName] = useState<string>();
  const[multisigaddr, setMultisigAddr] = useState<boolean>(false);
  const[openModal, setOpenModal] = useState<boolean>(false);
  const[threshold, setThreshold] = useState<number>(1);
  const[loading, setLoading] = useState<boolean>(false);
  const[signerData, setSignerData] = useState<SignersType[]>([{signerName: "Signer 1", signerAddress: ""}]);
  const { address, isConnected } = useAccount();

  const deployMultiSig = async () => {
    const getAddresses = signerData.map(values => values.signerAddress)
    const filteredAddr = getAddresses.filter(val => val != "");

    setLoading(true)
    // check the network
    if(chainId == "185"){
      // Check if address is MinT NFT Holder
      const balance = await readContract(config, {
        abi: MintPunksABI,
        address: '0xF157ef41cD23a896fFeacC3dB694346E94BFCF10',
        functionName: 'balanceOf',
        args: [`${address}`],
      });
      // check if address hold NFT
      if(balance){
        // run deploy function on Punkshield wallet
        const result = await writeContract(config, {
          abi,
          address: '0x98261183021488952b49D58A89898903d93D17c4',
          functionName: 'deployMultisigFree',
          args: [safeName,filteredAddr,BigInt(threshold)],
        });
        setLoading(false);
          // 3), switch to the dashboard page if writing into database was successful
        setTimeout(() => {
          navigate('/dashboard');
              }, 3000)
      } else{
        // deploy to Multisig with fee    
        const result = await writeContract(config, {
          abi,
          address: '0x98261183021488952b49D58A89898903d93D17c4',
          functionName: 'deployMultisig',
          args: [safeName,filteredAddr,BigInt(threshold)],
          value: parseEther('0.0013'), 
        });
        setLoading(false)
            // 3), switch to the dashboard page if writing into database was successful
        setTimeout(() => {
        navigate('/dashboard');
              }, 3000)
          }
    }
    // Deploy to base chain
    if (chainId == "Base"){
      // Check if address is MinT NFT Holder
      const balance = await readContract(config, {
        abi: BasePunksABI,
        address: '0x89290b2FaD76bF4a6Ed9D8066f644d45530FA920',
        functionName: 'balanceOf',
        args: [`${address}`],
      });
      // check if address hold NFT
      if(balance){
        // run deploy function on Punkshield wallet
        const result = await writeContract(config, {
          abi,
          address: '0xd8461a9760d3dce9b87259b7d1fb82c20656de3e',
          functionName: 'deployMultisigFree',
          args: [safeName,filteredAddr,BigInt(threshold)],
        });
        setLoading(false);
          // 3), switch to the dashboard page if writing into database was successful
        setTimeout(() => {
          navigate('/dashboard');
              }, 3000);
      } else {
        // deploy to Multisig with fee    
        const result = await writeContract(config, {
          abi,
          address: '0xd8461a9760d3dce9b87259b7d1fb82c20656de3e',
          functionName: 'deployMultisig',
          args: [safeName,filteredAddr,BigInt(threshold)],
          value: parseEther('0.0013'), 
        });
        setLoading(false);
            // 3), switch to the dashboard page if writing into database was successful
        setTimeout(() => {
          navigate('/dashboard');
              }, 3000)
          }
      }
  }

  useEffect(() => {
    (async () => {
      // check if address is Punkshield mapping then switch to dashboard
    if(chainId == "185"){
      await switchChain(config, { chainId: mintMainnet.id })
    } if (chainId == "8453"){
      await switchChain(config, { chainId: base.id })
    } 

        if(isConnected){
          signerData[0].signerAddress = address;

          const result = await readContract(config, {
            abi,
            address: chainId == "185" ? '0x98261183021488952b49D58A89898903d93D17c4' : "0xD8461A9760D3DCE9b87259b7D1fB82c20656de3E",
            functionName: 'addressToContract',
            args: [address],
            account: address, 
          });
          if(result != 0x0000000000000000000000000000000000000000){
            navigate('/dashboard');
          }
        }
    })()
  }, [isConnected]);

  const handleSignerData = (e: React.FormEvent<HTMLInputElement>, i: number) => {
      const onchangeVal: SignersType[] = [...signerData];
      onchangeVal[i].signerAddress = e.currentTarget.value;
      setSignerData(onchangeVal);
  }

  const addSignerData = () => {
    const i = signerData.length + 1;
    setSignerData([...signerData, {signerName:`Signer ${i}`, signerAddress:""}]);
  }


  return (
    <div className={chainId == "185" ? "bg-mintImg bg-fixed text-white": "text-white"}>
      <div className="fixed top-0 -z-10 h-full w-full">
        <div className="relative h-full w-full bg-slate-950"><div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div><div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div></div>
      </div>
      <header className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-8 text-white">
        <h1 className="text-2xl font-bold">Punk<span className="text-[#903AFF]">
        Shield</span></h1> 
        <div><ConnectButton /></div>
      </header>
      <div className="w-full flex flex-col lg:flex-row lg:justify-between py-12 gap-12">
         <div className="px-4 mx-auto">
            <h1 className="text-xl font-bold py-3">Create New Wallet</h1>
            <div className="grid gap-4 p-4 border border-none rounded-3xl bg-gradient-to-b from-blue-300 to-pink-300 dark:from-blue-800 dark:bg-purple-800">
              <div className="grid grid-col gap-4 ">
                <label htmlFor="walletName" className="font-bold text-xl">Name of Wallet</label>
                <input disabled={multisigaddr} onChange={(e: React.FormEvent<HTMLInputElement>) => setSafeName(e.currentTarget.value)} className="w-full px-10 py-4 border-4-pink-500 text-black rounded-2xl" type="text" name='walletName'/>
              </div>
              <p>By continuing, you agree to our terms of use and privacy policy</p>
              <div className="flex justify-around">
                  <Link to="/">
                    <button hidden={multisigaddr} className='border border-3-pink font-bold py-2 px-8 rounded-xl text-white'>Cancel</button>
                  </Link>
                <button onClick={() => {setMultisigAddr(!multisigaddr)}} hidden={multisigaddr} className='border border-3-pink font-bold py-2 px-8 rounded-xl text-white'>Next</button>
              </div>
              <div>
                <div>
                  <h1 className="text-xl font-bold">Signers and Confirmation</h1>
                  <p>Set the signer wallets of your Safe Account and how many need to confirm to execute a valid transaction. Click on the plus icon to add a more signers</p>
                </div>
              </div>
              { multisigaddr ? signerData.map((val, i) =>
                  <div>
                    <div className="lg:hidden" key={i}>
                      <div className="w-full flex items-center justify-between ">
                        <input className="w-11/12 rounded-2xl px-8 py-4 border-4-pink-500 text-black" type="text" name='walletName' placeholder="Signer 1" disabled value={val.signerName} />
                        <IoMdAddCircle size={50}  className="cursor-pointer" onClick={addSignerData}/>
                      </div>
                      <input className="w-full lg:hidden rounded-2xl px-10 py-4 border-4-pink-500 text-black" type="text" name='walletAddr' value={val.signerAddress} onChange={(e: React.FormEvent<HTMLInputElement>) => handleSignerData(e, i)} />
                    </div>
                    <div className="hidden lg:flex items-center  justify-evenly" key={i}>
                        <input className="rounded-2xl px-8 py-4 border-4-pink-500 text-black" type="text" name='walletName' disabled value={val.signerName} />
                        <input className="rounded-2xl px-10 py-4 border-4-pink-500 text-black" type="text" name='walletAddr' value={val.signerAddress} onChange={(e: React.FormEvent<HTMLInputElement>) => handleSignerData(e, i)} />
                        <IoMdAddCircle size={50} className="cursor-pointer" onClick={addSignerData} />
                    </div>
                  </div>
              ) : ""
            }
            {
              multisigaddr ? 
              <div className="flex flex-col gap-4">
                  <div>
                    <h1 className="text-xl font-bold">Threshold</h1>
                    <p>Select the number of confirmations before transaction execution. The threshold must be less than the number of owners</p>
                    <div className="w-[200px] custom-select text-black">
                    <select className="p-2 rounded-2xl bg-gray-900 text-white font-bold" onChange={e => setThreshold(Number(e.target.value))}>
                      <option value="0">Select number:</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                    </select>
                  </div>
                  </div>
                  <div className="flex justify-around">
                    <button onClick={() => setMultisigAddr(!multisigaddr)} className='border border-3-pink font-bold py-2 px-8 rounded-xl text-white'>Back</button>
                    <button onClick={() => setOpenModal(true)} className='border border-3-pink font-bold py-2 px-8 rounded-xl text-white'>Next</button>
                  </div>
                </div> : ""
            }
            </div>
         </div>
          <div className="px-4 w-content lg:w-[500px] mx-auto">
            <h1 className="text-xl font-bold py-3">Your Wallet Preview</h1>
            <div className="grid gap-4 p-4 rounded-[calc(1.5rem-1px)] bg-gray-800">
              <div className="flex justify-between">
                <h1>Creator: </h1>
                <p className="">{address?.slice(0,6) + "******" + address?.slice(-4)}</p>
              </div>
              <div className="flex justify-between">
                <h1>Network:</h1>
                <p>{chainId}</p>  
              </div>
              <div className="flex justify-between">
                <p>Wallet Name:</p>  
                <p>{safeName}</p>
              </div>
            </div>
          </div>
      </div>
      <DeployModal open={openModal} onClose={() => setOpenModal(false)}>
      <div className="w-full flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Wallet Details</h1>
          <div>
            <div className="flex justify-between">
             <h1 className="font-bold">Network:</h1>
             <p className="font-thin">{chainId == "185" ? "Mint" : "Base"}</p>
            </div>
            <hr className="border-t-solid border-1 border-white" />
            <div className="flex justify-between">
              <h1 className="font-bold">Name:</h1>
              <p className="font-thin">{safeName}</p>
            </div>
            <hr className="border-t-solid border-1 border-white" />
            <div className="flex justify-between gap-4">
              <h1 className="font-bold">Signers:</h1>
              <p className="font-thin">{address?.slice(0,6) + "******" + address?.slice(-4)}</p>
            </div>
            <hr className="border-t-solid border-1 border-white" />
            <div className="flex justify-between">
              <h1 className="font-bold">Threshold:</h1>
              <p>{threshold}</p>
            </div>
          </div>
          <h1 className="font-bold">Note:</h1>
          <p className="font-thin">There will be a one-time network fee of 0.0013ETH to activate your smart account wallet. PunkShield does not profit from this fee</p>
          <div className="flex flex-row justify-center">
              <button
                disabled={loading}
                className="border border-none rounded-lg py-1.5 px-10
                bg-blue-500 hover:bg-blue-600 text-white"
                onClick={deployMultiSig}
              >
                { loading ? 
                  (
                    <div className="flex gap-2">
                      <img src={Spinner} alt="" />
                      <p>Creating Wallet...</p>
                    </div>
                  ) : "Create Wallet"
                }
              </button>
          </div>
        </div>
      </DeployModal>
    </div>
  )
}

export default Newsafe