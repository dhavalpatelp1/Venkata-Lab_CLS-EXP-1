
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function App(){
  const loc = useLocation()
  return (
    <div>
      <nav>
        <div className="inner container">
          <strong>🧪 Experimental Workflow Tracker</strong>
          <Link to="/">Dashboard</Link>
          <Link to="/calendar">Calendar</Link>
          <Link to="/samples">Samples</Link>
          <Link to="/export">Export</Link>
          <span className="spacer"/>
          <Link to="/settings">Settings</Link>
        </div>
      </nav>
      <div className="container" key={loc.key}>
        <Outlet/>
      </div>
    </div>
  )
}
