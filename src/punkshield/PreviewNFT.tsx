import React, { useState } from 'react'
import { readContract } from "@wagmi/core";
import { abi as MintPunksABI } from '../artifacts/contracts/MintPunks.sol/MintPunks.json';
import { config } from "../main";

interface TokenUrlProps {
    url: string[];
  }

const PreviewNFT: React.FC<TokenUrlProps> = ( { url } ): React.ReactNode =>  {
  const[tokenId, setTokenId] = useState<number>()
  
  const handleNFT = async (key: number) => {
    const tokenOfOwner = await readContract(config, {
      abi: MintPunksABI,
      address: '0xF157ef41cD23a896fFeacC3dB694346E94BFCF10',
      functionName: 'tokenOfOwnerByIndex',
      args: ['0x90f9304415A52D23811539cf8bd5731710D4782d', key],
      });
      setTokenId(Number(tokenOfOwner));
  }
  
  return (
    <div className="grid md:grid-cols-4 justify-items-center ">
      { 
        url.map((val, key) => (
            <div className="p-8 transform relative">
              <img src={`https://ipfs.io/ipfs/${val.slice(7)}`} alt="" width={200} />
                <a href={`https://www.mintswap.finance/nfts/detail/0xf157ef41cd23a896ffeacc3db694346e94bfcf10/${tokenId}`} target="_blank" rel="noopener noreferrer">
                  <div onClick={() => handleNFT(key)} className='bg-blue-400 cursor-pointer text-black text-xs uppercase font-bold rounded-full p-2 absolute top-0 ml-2 mt-2'>
                    <span>View In Market</span>
                  </div>
                </a>
            </div>
        ))
      }
      </div>
  )
}

export default PreviewNFT