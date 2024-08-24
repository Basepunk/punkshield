import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Settings from './punkshield/Settings.tsx';
import NewTransaction from './punkshield/NewTransaction.tsx'
import Queue from './punkshield/Queue.tsx';
import Newsafe from './CreateSafe/Newsafe.tsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  base 
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import Withdraw from './punkshield/Withdraw.tsx';
import { mintMainnet, mintSepolia } from "./config.ts";
import NFTs from './punkshield/NFTs.tsx';
import Context from './Context.tsx';

export const config = getDefaultConfig({
  appName: 'Punkshield',
  projectId: 'c5a7a120d9c70b23ac4ac155fd70740d',
  chains: [ base, mintMainnet ],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();
// const lazyAccount = React.lazy(() => import("./punkshield/Account.tsx"))

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route>
        <Route path='/' element={<App />} ></Route>
        <Route path='/newwallet/:chainid' element={<Newsafe />} ></Route>
        <Route path='/withdraw' element={<Withdraw/>} ></Route>
        <Route path='/dashboard' element={<Context />}>
          <Route path='/dashboard/settings' element={<Settings />} ></Route>
          <Route path='/dashboard/new-transaction' element={<NewTransaction />} ></Route>
          <Route path='/dashboard/queue' element={<Queue />} />
          <Route path='/dashboard/nfts' element={<NFTs />} />
        </Route>
      </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>,
)
