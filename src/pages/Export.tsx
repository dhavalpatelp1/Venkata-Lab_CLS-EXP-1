
import Papa from 'papaparse'
import { demo } from '../util/demoStore'

export default function Export(){
  function download(){
    const rows = demo.getAllSamples().map(s => {
      const exp = demo.getExperiment(s.expId)!
      return {
        expId: exp.id, organism: exp.organism, strain: exp.strain,
        timepoint: s.timepointLabel, replicate: s.replicate,
        plannedAt: s.plannedAt, collectedAt: s.collectedAt||'',
        notes: s.notes||'', location: s.location||''
      }
    })
    const csv = Papa.unparse(rows)
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'samples.csv'; a.click()
    URL.revokeObjectURL(url)
  }
  return (
    <div className="card">
      <h2>Export</h2>
      <p>Download a CSV of samples suitable for R/Python.</p>
      <button className="btn" onClick={download}>Export CSV</button>
    </div>
  )
}
