import './App.css'
import { HomeNavBar } from './layouts/HomeNav'
import HomeBg from './assets/HomeBg.jpg'

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      <img src={HomeBg} alt="Background" className="fixed inset-0 w-full h-full object-cover opacity-100 z-0" />
      <div className="relative z-10">
        <HomeNavBar />
        <div>
          <h1 className="text-6xl font-bold text-center mt-20 text-black">Personal Finances Tracker</h1>
        </div>
      </div>
    </div>
  )
}

export default App
