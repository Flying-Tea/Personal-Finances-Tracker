import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import About from './pages/About.tsx'
import UserHome from './pages/appui/UserHome.tsx'
import AccountHistory from './pages/appui/AccountHistory.tsx'
import Budgets from './pages/appui/Budget.tsx'

// Create a router object
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/userHome',
    element: <UserHome />, 
  },
  {
    path: '/accountHistory',
    element: <AccountHistory/>,
  },
  {
    path: '/budgets',
    element: <Budgets />,
  },
  // Add more routes as needed
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
