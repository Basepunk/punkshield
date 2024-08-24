import { HiArrowLongRight } from "react-icons/hi2";
import Telegram_Logo from '../assets/telegram_logo.jpg'
import X_Logo from '../assets/x_logo.png'
import Discord_Logo from '../assets/discord_logo.jpg'
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Contact = () => {
  return (
            <div className='flex flex-col md:grid grid-cols-2 py-16 px-4 items-center md:justify-items-center gap-3 text-white'>
                <div className='flex flex-col gap-3'>
                    <motion.h1 
                       whileInView={{ opacity: 1, x: 0 }}
                       initial={{ opacity: 0, x: -100 }}
                       transition={{ duration: 0.5 }}             
                    className='text-lg md:text-xl lg:text-2xl font-medium'>ARE YOU READY TO GET</motion.h1>
                    <motion.div 
                        whileInView={{ opacity: 1, x: 0 }}
                        initial={{ opacity: 0, x: -100}}
                        transition={{ duration: 1}}
                        className="flex gap-3 items-center">
                        <h1 className='text-[#fff] flex justify-self-center font-bold'>SECURED</h1>
                        <HiArrowLongRight size={40} className='text-white'/>
                        <NavLink to="newwallet/chains?chainid=185">
                        <button className='bg-white font-bold px-4 py-1 rounded-xl text-[#691687]'>Sign up</button>
                        </NavLink>
                    </motion.div>
                </div>       
                <div className='flex flex-col'>
                    <motion.h1 
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 100}}
                    transition={{ duration: 0.5}}
                    className='text-lg md:text-xl lg:text-2xl font-medium '>Join our Community</motion.h1>
                    <motion.div 
                     whileInView={{ opacity: 1, x: 0 }}
                     initial={{ opacity: 0, x: 100}}
                     transition={{ duration: 1}}               
                    className="flex items-center justify-center mx-auto">
                        <a href="https://twitter.com/Punkonbase" target="_blank">
                            <img src={X_Logo} className='h-[80px] p-4' alt="#" />
                        </a>
                        <a href="https://discord.com/invite/punkecosystem" target="_blank">
                            <img src={Discord_Logo} className='h-[80px] p-4' alt="#" />
                        </a>
                        <a href="http://" target="_blank">
                            <img src={Telegram_Logo} className='h-[80px] p-4' alt="#" />
                        </a>
                    </motion.div>
                </div>                  
            </div>
  )
}

export default Contact