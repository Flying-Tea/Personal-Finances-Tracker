import './App.css'
import { HomeNavBar } from './components/ui/HomeNav'
import HomeBg from './assets/HomeBg.jpg'
import FeatureSection1 from './components/layouts/FeatureSection'
import CustomFooter from './components/layouts/Footer'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'

export interface AppContextType {
  jwt: string | null;
  setJwt: React.Dispatch<React.SetStateAction<string | null>>;
}

function App() {
  const [jwt, setJwt] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-gray-900 text-white select-none">
      {/* Background top image THIS TOOK SO LONG ;( */}
      <div className="relative h-[700px] bg-fixed bg-cover bg-center" style={{ backgroundImage: `url(${HomeBg})` }}>
      
        <div className="relative z-10">
          <HomeNavBar />
          <div className="bg-blue-200 p-10 rounded-lg shadow-md max-w-6xl border place-items-start mx-auto">
            <h1 className="text-4xl font-bold mt-10 text-black">
              Manage your spending anywhere with OsmondSolution's Financial Manager.
            </h1>
            <h2 className="text-2xl font-bold mt-5 text-black">
              Check your spending and manage your expenditures on the go with our web application!
            </h2>
          </div>
        </div>
      </div>

      {/* Rest of the page content */}
      <div className="p-5 relative z-10">
        <FeatureSection1 />
      </div>
      <div>
        <CustomFooter/>
      </div>
      <Outlet context={{jwt, setJwt}}/>
    </div>
  )
}

export default App
