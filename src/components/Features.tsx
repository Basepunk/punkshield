import Hero_Img from '../assets/hero-img.png'
import { FaUserShield } from "react-icons/fa";
import { GiPadlockOpen } from "react-icons/gi";
import { FaShield } from "react-icons/fa6";
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const Features = () => {
  return (
    <div className='text-white  py-16 px-4' id='features'>
        <div className="flex flex-col md:grid grid-cols-2 gap-4">
            <div className="grid w-1/2 m-4 mx-auto my-4">
                <motion.img 
                       whileInView={{ opacity: 1, x: 0 }}
                       initial={{ opacity: 0, x: -100}}
                       transition={{ duration: 1}}
                src={Hero_Img} className='' alt="" />
            </div>
            <div className="flex flex-col mx-auto gap-3 p-4">
                <motion.h1 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 100}}
                transition={{ duration: 0.5}}
                className='text-2xl md:text-3xl lg:text-4xl font-bold text-[#fff]'>THE SAFEST SHIELD</motion.h1>
                <motion.p 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
                className='text-xl font-thin'>Experience more with Punk Shield wallet.</motion.p>
                <div className='flex flex-row gap-4 items-center'>
                    <motion.div 
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5 }}                
                    className='bg-[#691687] flex flex-col items-center rounded-md p-2 w-fit'>
                        <FaUserShield size={40}/>
                        <p>IP Security</p>
                    </motion.div>
                    <motion.div 
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 100}}
                    transition={{ duration: 1}}            
                    className='bg-[#691687] flex flex-col items-center rounded-md p-2 w-fit'>
                        <GiPadlockOpen size={40}/>
                        <p>Multi owner</p>
                    </motion.div>
                    <motion.div 
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 100}}
                    transition={{ duration: 1.5}}                
                    className='bg-[#691687] flex flex-col items-center rounded-md p-2 w-fit'>
                        <FaShield size={40}/>
                        <p>Protected</p>
                    </motion.div>
                </div>
                <motion.p 
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 100}}
                    transition={{ duration: 0.5}}            
                className='w-full text-xl font-thin' >
                    By Signing Up, you become less worried <br />
                    about getting scammed or loosing <br />
                    your investments.
                </motion.p>
                <NavLink to="newwallet/chains?chainid=185">
                <motion.button 
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 100}}
                    transition={{ duration: 0.5}}            
                className='bg-white font-bold p-3 rounded-xl text-[#691687] self-start'>Create Wallet</motion.button>
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default Features