import { useContext, useEffect, useState, useMemo } from "react";
import { UserContext } from "../Context";
import { readContract } from "@wagmi/core";
import { useAccount } from 'wagmi';
import { abi as MintPunksABI } from '../artifacts/contracts/MintPunks.sol/MintPunks.json';
import { config } from "../main";
import axios from "axios";
import PreviewNFT from "./PreviewNFT";

const NFTs = () => {
  const contextData = useContext(UserContext);
  const{ address, isConnected } = useAccount();
  const[tokenUrl, setTokenUrl] = useState<string[]>([])

  const tokenUrlProp = useMemo(() => {
    return tokenUrl && tokenUrl;
    }, [tokenUrl]);

  useEffect(() => {
    contextData[0].dispatch({ type: "increase"});

    (async () => {
      if(isConnected){

        const balance = await readContract(config, {
          abi: MintPunksABI,
          address: '0xF157ef41cD23a896fFeacC3dB694346E94BFCF10',
          functionName: 'balanceOf',
          args: [`${address}`],
        });

        for(let i = 0; i<=Number(balance); i++){
          const tokenOfOwner = await readContract(config, {
            abi: MintPunksABI,
            address: '0xF157ef41cD23a896fFeacC3dB694346E94BFCF10',
            functionName: 'tokenOfOwnerByIndex',
            args: [`${address}`, i],
            });

          await axios.get(`/api/${tokenOfOwner}`)
            .then((res) => {
              setTokenUrl(tokenUrl => [...tokenUrl, res.data['image']])
            })
            .catch(err => console.log(err))
        }
      }

    })()
  }, []);

  return (
    <div>
      <PreviewNFT url={tokenUrlProp} />
    </div>
  )
}

export default NFTs