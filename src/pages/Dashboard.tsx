
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { demo } from '../util/demoStore'
import { SampleDoc } from '../types'

export default function Dashboard(){
  const [, setTick] = useState(0)
  useEffect(()=>{ demo.seedIfEmpty(); const i=setInterval(()=>setTick(t=>t+1), 1000*30); return ()=>clearInterval(i)},[])
  const samples = useMemo(()=> demo.getAllSamples(), [])

  const now = new Date()
  const today = samples.filter(s => {
    const d = new Date(s.plannedAt)
    return d.toDateString() === now.toDateString()
  }).sort((a,b)=> a.plannedAt.localeCompare(b.plannedAt))

  const overdue = samples.filter(s => !s.collectedAt && new Date(s.plannedAt) < now)

  return (
    <div className="grid two">
      <div className="card">
        <h2>Today’s sampling queue</h2>
        <table className="table">
          <thead><tr><th>Exp</th><th>TP</th><th>Rep</th><th>Planned</th><th>Action</th></tr></thead>
          <tbody>
            {today.map(s => <Row key={s.id} s={s}/>)}
          </tbody>
        </table>
        <p className="small">Tip: go to <Link to="/samples">Samples</Link> to scan QR and mark collected.</p>
      </div>
      <div className="card">
        <h2>Overdue</h2>
        {overdue.length===0? <p className="success">All good. Nothing overdue 🎉</p> :
          <ul>{overdue.map(s => <li key={s.id}><span className="overdue">{s.timepointLabel}</span> rep {s.replicate} — {new Date(s.plannedAt).toLocaleString()}</li>)}</ul>}
      </div>
    </div>
  )
}

function Row({s}:{s:SampleDoc}){
  const exp = demo.getExperiment(s.expId)!
  return (
    <tr>
      <td><Link to={`/experiment/${exp.id}`}>{exp.title}</Link></td>
      <td>{s.timepointLabel}</td>
      <td>{s.replicate}</td>
      <td>{new Date(s.plannedAt).toLocaleTimeString()}</td>
      <td>
        {s.collectedAt? <span className="badge">collected</span> :
          <button className="btn" onClick={()=>{ demo.markSampleCollected(s.id) }}>Mark collected</button>}
      </td>
    </tr>
  )
}
