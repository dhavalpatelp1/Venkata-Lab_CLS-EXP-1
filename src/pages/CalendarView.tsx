
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'
import { useMemo } from 'react'
import { demo } from '../util/demoStore'
import { Link } from 'react-router-dom'

export default function CalendarView(){
  const exps = useMemo(()=> demo.getExperiments(), [])
  const events = exps.flatMap(e => e.schedule.map(tp => {
    const start = new Date(new Date(e.startAt).getTime() + tp.offsetMin*60*1000)
    return { title: `${e.title} (${tp.label})`, date: start.toISOString().slice(0,10) }
  }))

  return (
    <div className="card">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2>Calendar</h2>
        <Link to="/experiment/new" className="btn">+ New experiment</Link>
      </div>
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={events}/>
    </div>
  )
}
