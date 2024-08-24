import { motion } from 'framer-motion'
import Security_Img from '../assets/security_img.png'
import { NavLink } from 'react-router-dom'

const About = () => {
  return (
    <div className=' text-white py-16 px-4' id='about'>
        <div className='flex flex-col p-4 md:grid grid-cols-2'>
            <motion.img 
               whileInView={{ opacity: 1, x: 0 }}
               initial={{ opacity: 0, x: -100}}
               transition={{ duration: 0.5}}
            src={Security_Img} alt="#" className='w-[300px] md:w-[500px] mx-auto my-4' />
            <div className="flex flex-col gap-4 items-center">
                <motion.h1 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
                className='text-2xl md:text-3xl lg:text-4xl text-center font-bold'>ABOUT PUNK SHIELD</motion.h1>
                <motion.h3 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
                className='text-xl md:text-2xl lg:text-3xl text-center font-medium'>Our aims and Objectives</motion.h3>
                <motion.p 
                 whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: 100 }}
                 transition={{ duration: 0.5 }}
                className='w-full  text-center  text-xl font-thin'>
                    Punkshield is an advanced security solution that allows users to create a multi-stage wallet, adding multiple layers of security to safeguard their valuable assets. This innovative approach ensures that your hard-earned NFTs and cryptocurrencies remain protected against malicious activities.
                </motion.p>
                <NavLink to="newwallet/chains?chainid=185">
                <motion.button 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
                className='bg-white font-bold p-3 rounded-xl text-[#691687]'>Get Started</motion.button>
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default About