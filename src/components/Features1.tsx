import { NavLink } from 'react-router-dom';
import PunkBase_img1 from '../assets/punkbase1.png'
import PunkBase_img2 from '../assets/punkbase2.png'
import PunkBase_img3 from '../assets/punkbase3.png'
import PunkBase_img4 from '../assets/punkbase4.png'
import { motion } from 'framer-motion';

const Features = () => {
  return (
    <div className='text-white  py-16 px-4' id='features'>
        <div className="flex flex-col md:grid grid-cols-2 gap-4 px-8">
            <div className="flex flex-col mx-auto gap-3 ">
                <motion.h1 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -100}}
                transition={{ duration: 0.5}}
                className='text-2xl md:text-3xl lg:text-4xl font-bold text-[#fff]'>NFT SECURITY</motion.h1>
                <motion.p 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -100}}
                transition={{ duration: 0.5}}
                className='w-[300px]  text-base font-thin'>Secure your NFT with Punk Shield wallet</motion.p>
                <div className='flex flex-col w-[300px] gap-4 font-thin'>
                    <motion.h4
                      whileInView={{ opacity: 1, x: 0 }}
                   initial={{ opacity: 0, x: -100}}
                    transition={{ duration: 0.5}}
                    >
                    <span className='font-bold text-xl'>Multi-Sig Wallet Creation: <br /> </span> Build a wallet with several security stages to enhance protection.
                    </motion.h4>
                    <motion.h4
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -100}}
                    transition={{ duration: 1}}                
                    >
                    <span className='font-bold  text-xl'>Multi-Layer Security: <br /> </span> Incorporate various security measures such as two-factor authentication, biometric verification, and more.
                    </motion.h4>
                    <motion.h4
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -100}}
                    transition={{ duration: 1.5}}                
                    >
                    <span className='font-bold  text-xl'>Scam Prevention:<br /> </span> Advanced mechanisms to detect and prevent scam attempts, ensuring your assets remain safe.
                    </motion.h4>
                </div>
                <NavLink to="newwallet/chains?chainid=185">
                <motion.button 
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -100}}
                    transition={{ duration: 0.5}}            
                className='bg-white font-bold p-3 rounded-xl text-[#691687] self-start'>Create Wallet</motion.button>
                </NavLink>
            </div>
            <div className="grid grid-cols-2 m-4 w-[300px] md:w-[500px] mx-auto my-4">
                <img src={PunkBase_img1} alt="" />
                <img src={PunkBase_img2} alt="" />
                <img src={PunkBase_img3} alt="" />
                <img src={PunkBase_img4} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Features