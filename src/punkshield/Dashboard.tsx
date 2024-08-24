import { NavLink, Outlet, useLocation } from "react-router-dom"
import { formatEther } from 'viem'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Account from "./Account";
import { useContext, useEffect } from 'react'
import { UserContext } from '../Context';

const Dashboard = () => {
  const location = useLocation();
  const contextData = useContext(UserContext);
  const activeLink = 'bg-blue-100 text-black p-3 rounded-full';
  const normalLink = 'p-3';

  useEffect(() => {
    contextData[0].dispatch({ type: "increase"});
  },[])

  return (
    <div className={contextData[0].chainName == "Mint" ? "bg-mintImg bg-fixed bg-cover overflow-x-hidden text-neutral-50 antialiased selection:bg-cyan-300 selection:text-cyan-900": "overflow-x-hidden text-neutral-50 antialiased selection:bg-cyan-300 selection:text-cyan-900"}>
      <div className="fixed top-0 -z-10 h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      </div>
        <header className='container mx-auto px-8 mb-20 flex items-center justify-between py-4'>
          <div className="flex flex-shrink-0 items-center">
            <h1 className="text-lg md:text-2xl font-bold tracking-wide">Punk<span className="text-[#903AFF]">
        Shield</span></h1>
          </div>
          <div className='flex items-center justify-between gap-10'>
            <ConnectButton />
          </div>
        </header>
        <div className="flex items-center">
          <div className="px-20">
            <h1 className="text-2xl text-cyan-400 font-bold tracking-wide">{contextData[0].safeName + " Wallet: "}<span className="text-2xl text-neutral-400 font-bold tracking-wide">{contextData[0].walletAddress ? formatEther(contextData[0].balance as bigint).slice(0,6) + "ETH" : ""}</span></h1>
            <h1 className="text-lg text-end font-bold tracking-wide">{contextData[0].walletAddress ? contextData[0].walletAddress?.slice(0,7) + "******" + contextData[0].walletAddress?.slice(-5) : ""}</h1 >
          </div>
        </div>
        <div className='py-14 px-4'>
          <nav className='flex justify-center p-4'>
            <NavLink className={location.pathname == "/dashboard" ? activeLink : normalLink} to="/dashboard">
              <p className="text-xs md:text-lg font-bold hover:text-cyan-700">Account</p></NavLink>
            {/* <NavLink className={({ isActive }) => isActive ? activeLink : normalLink} to="new-transaction"><p className="hidden  text-sm md:text-lg font-bold hover:text-cyan-700 hover:bg-white">New Transaction</p></NavLink>  */}
            <NavLink className={({ isActive }) => isActive ? activeLink : normalLink} to="queue" ><p className=" text-xs md:text-lg font-bold hover:text-cyan-700">Queue</p></NavLink>
            {contextData[0].chainName == "Mint" && <NavLink className={({ isActive }) => isActive ? activeLink : normalLink} to="nfts"><p className=" text-sm md:text-lg font-bold hover:text-cyan-700">Collection</p></NavLink>}<br />
            {/* <NavLink className={({ isActive }) => isActive ? activeLink : normalLink} to="history" ><p className=" text-xs md:text-lg font-bold hover:text-cyan-700">History</p></NavLink> */}
            <NavLink className={({ isActive }) => isActive ? activeLink : normalLink} to="settings" ><p className=" text-xs md:text-lg font-bold hover:text-cyan-700">Settings</p></NavLink>
          </nav>
        </div>
        <div>
          {location.pathname == "/dashboard" && <Account />}
        </div>
        <main>
          <Outlet/>
        </main>
    </div>
  )
}

export default Dashboard