import { ReactTyped } from 'react-typed';
import basepunk from '../assets/basepunk.webp'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom';

const Hero = () => {

  const container = (delay: number) =>({
    hidden: {x: -100, opacity: 0},
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: delay },
    },
  });

  const container1 = (delay: number) =>({
    hidden: {x: 100, opacity: 0},
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, delay: delay },
    },
  });

  return (
    <div className='text-white mb-12'>
        <div className="flex flex-col md:grid grid-cols-2 w-full md:mt-[96px] mx-auto justify-center">
        <div className="flex flex-col items-center justify-center text-center gap-3 p-4">
                <motion.h1 
                 variants={container1(0.5)}
                  initial="hidden"
                 animate="visible"
                className='text-2xl md:text-4xl lg:text-4xl text-center font-bold text-[#fff]'>
                  <ReactTyped strings={["Launching New Age Smart Wallet on Mint & Base"]} typeSpeed={70} backSpeed={100} loop/></motion.h1>
                <motion.p 
                variants={container1(1)}
                initial="hidden"
                animate="visible"
                className='max-w-prose p-4 text-lg font-thin'>
                  Join us in revolutionizing Asset security and protecting your investments with Punkshield. Stay tuned for more updates as we roll out this essential tool for the Base Punk community.
                </motion.p>
                <NavLink to="newwallet/chains?chainid=185">
                <motion.button 
                variants={container1(1.5)}
                initial="hidden"
                animate="visible"                
                className='bg-[#691687] font-bold px-10 py-3 rounded-xl text-[#fff]'>Create Wallet</motion.button>
                </NavLink>
            </div>
            <motion.img 
            variants={container(0)}
            initial="hidden"
            animate="visible"
            src={basepunk} alt="#" className='w-1/2 mx-auto my-4'/>
        </div>
    </div>
  )
}

export default Hero