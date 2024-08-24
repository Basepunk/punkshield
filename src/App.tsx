import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Features1 from './components/Features1'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='App'>
      <div className="fixed top-0 -z-10 h-full w-full">
        <div className="relative h-full w-full bg-slate-950"><div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div><div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div></div>
      </div>
      <div>
        <Navbar />
        <Hero />
        <About />
        <Features />
        <Features1 />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}

export default App