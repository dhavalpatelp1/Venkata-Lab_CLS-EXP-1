import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Dashboard from './pages/Dashboard'
import CalendarView from './pages/CalendarView'
import Experiment from './pages/Experiment'
import Samples from './pages/Samples'
import Export from './pages/Export'
import Settings from './pages/Settings'

const router = createHashRouter([
  {
    path: '/', element: <App/>,
    children: [
      { index: true, element: <Dashboard/> },
      { path: 'calendar', element: <CalendarView/> },
      { path: 'experiment/:id', element: <Experiment/> },
      { path: 'samples', element: <Samples/> },
      { path: 'export', element: <Export/> },
      { path: 'settings', element: <Settings/> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
