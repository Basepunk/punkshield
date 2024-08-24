import {useState} from 'react'
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
    const [nav, setNav] = useState(false)

    const handleNav = () => {
        setNav(!nav)
    }

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-8 text-white'>
        <h1 className='text-3xl font-bold'>Punk<span className="text-[#903AFF]">
        Shield</span></h1>
        <ul className='hidden md:flex'>
            <NavLink to="/">
                <li className="p-4 font-thin text-lg hover:text-pink-400">Home</li>
            </NavLink>
            <HashLink smooth to="#about">
            <li className="p-4 font-thin text-lg hover:text-pink-400">About</li>
            </HashLink>
            <HashLink smooth to="#features">
            <li className="p-4 font-thin text-lg hover:text-pink-400">Features</li>
            </HashLink>
            <li className="p-4 font-thin text-lg hover:text-pink-400"><a href="http://basepunk.xyz" target="_blank" rel="noopener noreferrer">Basepunk</a></li>
        </ul>
        <HashLink to="newwallet/chains?chainid=185">
            <button className='hidden lg:block bg-transperent border-2 border-[#691687] hover:bg-[#691687] hover:text-white rounded-xl font-bold px-8 py-3 text-white'>CREATE WALLET</button>
        </HashLink>
        <div onClick={handleNav} className='block md:hidden'>
            {   
                !nav ? <AiOutlineMenu size={20}/> : <AiOutlineClose size={20}/> 
            }
        </div>
        <div className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-700 bg-black ease-in-out duration-500' : 'fixed left-[-100%]'}>
            <h1 className='w-full text-3xl font-bold m-4'>PunkShield</h1>
            <ul className='pt-20 uppercase'>
                <NavLink to="/">
                    <li className="p-4 border-b border-gray-600">Home</li>
                </NavLink>
                <li className="p-4 border-b border-gray-600">About</li>
                <HashLink to="#features">
                    <li className="p-4 border-b border-gray-600">Features</li>
                </HashLink>
                <a href="http://basepunk.xyz" target="_blank" rel="noopener noreferrer">
                    <li className="p-4 border-b border-gray-600">Basepunk</li>
                </a>
            </ul>
            <NavLink to="newwallet/chains?chainid=185">
                <button className='xm:hidden bg-white font-bold p-3 m-4 rounded-xl text-[#691687]'>Create Wallet</button>
            </NavLink>
        </div>
    </div>
  )
}

export default Navbar