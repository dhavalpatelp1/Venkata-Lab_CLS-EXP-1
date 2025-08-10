
import { useNavigate, useParams } from 'react-router-dom'
import { demo } from '../util/demoStore'
import { ExperimentDoc } from '../types'
import { useMemo, useState } from 'react'

export default function Experiment(){
  const { id } = useParams()
  if (id === 'new') return <ExperimentForm/>
  const exp = demo.getExperiment(id!)!
  return <ExperimentView exp={exp}/>
}

function ExperimentView({exp}:{exp:ExperimentDoc}){
  const navigate = useNavigate()
  return (
    <div className="card grid" style={{gap:16}}>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <h2>{exp.title}</h2>
        <div className="grid" style={{gridTemplateColumns:'auto auto', gap:8}}>
          <span className="badge">{exp.organism}</span>
          <span className="badge">{exp.status}</span>
        </div>
      </div>
      <div className="grid two">
        <div className="card">
          <h3>Metadata</h3>
          <p><b>Strain</b>: {exp.strain}</p>
          <p><b>Mutants</b>: {exp.mutants.join(', ') || '—'}</p>
          <p><b>Compounds</b>: {exp.compounds.map(c=>`${c.name} ${c.conc_mM} mM`).join(', ')||'—'}</p>
          <p><b>Stressors</b>: {exp.stressors.map(c=>`${c.name} ${c.conc_mM} mM`).join(', ')||'—'}</p>
        </div>
        <div className="card">
          <h3>Schedule</h3>
          <ul>{exp.schedule.map(tp => <li key={tp.label}>{tp.label} — {new Date(new Date(exp.startAt).getTime()+tp.offsetMin*60*1000).toLocaleString()}</li>)}</ul>
        </div>
      </div>
      <button className="btn secondary" onClick={()=>navigate('/samples')}>View samples</button>
    </div>
  )
}

function ExperimentForm(){
  const nav = useNavigate()
  const [title, setTitle] = useState('Yeast 16h H2O2 + Butyrate')
  const [organism, setOrganism] = useState<'yeast'|'HEK293'>('yeast')
  const [strain, setStrain] = useState<'S288C'|'BY4741'|'HEK293'>('S288C')
  const [replicates, setReplicates] = useState(3)
  const [startAt, setStartAt] = useState(new Date().toISOString().slice(0,16))
  const [schedule, setSchedule] = useState([{label:'T0', offsetMin:0},{label:'16h', offsetMin:960},{label:'Day6', offsetMin:6*24*60}])
  const [mutants, setMutants] = useState('sir2Δ,set2Δ')
  const [compounds, setCompounds] = useState('Butyrate:5')
  const [stressors, setStressors] = useState('H2O2:0.5')

  function parsePairs(s:string){ return s.split(',').filter(Boolean).map(p=>{
    const [name, conc] = p.split(':'); return {name: name.trim(), conc_mM: Number(conc)}
  })}

  function submit(){
    const doc = {
      title, organism, strain, mutants: mutants? mutants.split(',').map(x=>x.trim()):[],
      compounds: parsePairs(compounds), stressors: parsePairs(stressors),
      startAt: new Date(startAt).toISOString(), replicates, status:'planned' as const,
      schedule
    }
    const exp = demo.createExperimentFromForm(doc)
    nav(`/experiment/${exp.id}`)
  }

  return (
    <div className="card grid">
      <h2>New experiment</h2>
      <div className="grid two">
        <div>
          <label>Title</label>
          <input className="input" value={title} onChange={e=>setTitle(e.target.value)} />
        </div>
        <div>
          <label>Organism</label>
          <select className="input" value={organism} onChange={e=>setOrganism(e.target.value as any)}>
            <option value="yeast">yeast</option>
            <option value="HEK293">HEK293</option>
          </select>
        </div>
        <div>
          <label>Strain</label>
          <select className="input" value={strain} onChange={e=>setStrain(e.target.value as any)}>
            <option value="S288C">S288C</option>
            <option value="BY4741">BY4741</option>
            <option value="HEK293">HEK293</option>
          </select>
        </div>
        <div>
          <label>Replicates</label>
          <input className="input" type="number" min={1} max={12} value={replicates} onChange={e=>setReplicates(Number(e.target.value))}/>
        </div>
        <div>
          <label>Start at</label>
          <input className="input" type="datetime-local" value={startAt} onChange={e=>setStartAt(e.target.value)}/>
        </div>
        <div>
          <label>Mutants (comma)</label>
          <input className="input" value={mutants} onChange={e=>setMutants(e.target.value)}/>
        </div>
        <div>
          <label>Compounds (name:conc_mM, comma)</label>
          <input className="input" value={compounds} onChange={e=>setCompounds(e.target.value)}/>
        </div>
        <div>
          <label>Stressors (name:conc_mM, comma)</label>
          <input className="input" value={stressors} onChange={e=>setStressors(e.target.value)}/>
        </div>
      </div>
      <button className="btn" onClick={submit}>Create</button>
    </div>
  )
}
