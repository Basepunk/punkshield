import { useEffect, useState, createContext, useReducer } from 'react'
import Dashboard from './punkshield/Dashboard';
import { abi } from '../src/artifacts/contracts/Punkshieldwallet.sol/Punkshieldwallet.json';
import { abi as MultisigAbi } from '../src/artifacts/contracts/Punkshieldwallet.sol/Multisigwallet.json';
import { readContract } from "@wagmi/core";
import { config } from './main'; 
import { Address } from 'viem';
import { useAccount, useConnections } from 'wagmi';

export const UserContext = createContext<any>(undefined)

interface Items {
    balance?: any,
    walletAddress?: any,
    safeName?: any,
    require?: any,
    chainName?: string,
    dispatch?: Function
}

interface State {
  refresh: number
}

interface Action {
  type: "increase"
}

const reducer = (state: State, action: Action) => {
  const { type } = action;
  switch (type){
    case "increase": 
    return { ...state, refresh: state.refresh + 1}
  }
}

const Context = () => {
    const connections = useConnections()
    const[chainName, setChainName] = useState<string>()
    const[walletAddress, setWalletAddress] = useState<Address>()
    const[safeName, setSafeName] = useState<string>()
    const[balance, setBalance] = useState<number>()
    const[require, setRequire] = useState<number>()
    const{ address, isConnected } = useAccount();
    const contextObject: Items[] = []

    const [state, dispatch] = useReducer(reducer, { refresh: 1 })
    // console.log(state)

    useEffect(() => {
        (async () => {
          let network = connections.map(val => val.chainId);
          network[0] == 185 ? setChainName("Mint") : setChainName("Base") 
          if(isConnected){
            const walletAddr = await readContract(config, {
              abi,
              address: network[0] == 185 ? '0x98261183021488952b49D58A89898903d93D17c4' : "0xD8461A9760D3DCE9b87259b7D1fB82c20656de3E",
              functionName: 'addressToContract',
              args: [address],
              account: address, 
            });
            if(walletAddr != 0x0000000000000000000000000000000000000000){
              const safeName = await readContract(config, {
                abi: MultisigAbi,
                address: walletAddr as Address,
                functionName: 'safeName',
                account: address, 
              });
              const num_confirm = await readContract(config, {
                abi: MultisigAbi,
                address: walletAddr as Address,
                functionName: 'numConfirmationsRequired',
                account: address, 
              });
              const walletBalance = await readContract(config, {
                abi: MultisigAbi,
                address: walletAddr as Address,
                functionName: 'getBalance',
                account: address, 
              });
              setBalance(walletBalance as number);
              setSafeName(safeName as string);
              setWalletAddress(walletAddr as Address);
              setRequire(num_confirm as number)
            }
          }
        })()
      },[state.refresh]);

   // push into contex object array
   contextObject.push({
    balance: balance,
    walletAddress: walletAddress,
    safeName: safeName,
    require: require,
    chainName: chainName,
    dispatch: dispatch,
  })
      
  return (
    <UserContext.Provider value={contextObject}>
        <Dashboard />
    </UserContext.Provider>
  )
}

export default Context
