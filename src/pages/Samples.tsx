
import { useMemo, useState } from 'react'
import { demo } from '../util/demoStore'
import { QRCodeCanvas } from 'qrcode.react'
import { BrowserMultiFormatReader } from '@zxing/browser'

export default function Samples(){
  const samples = useMemo(()=> demo.getAllSamples(), [])
  const [scanning, setScanning] = useState(false)
  const [scanRes, setScanRes] = useState('')

  async function startScan(){
    setScanning(true); setScanRes('')
    const reader = new BrowserMultiFormatReader()
    try {
      const controls = await reader.decodeFromVideoDevice(null, 'video', (result, err)=>{
        if(result){ 
          const text = result.getText()
          const s = demo.findSampleByQr(text)
          if (s){ demo.markSampleCollected(s.id); setScanRes(`Marked collected: ${s.timepointLabel} rep ${s.replicate}`) }
          else { setScanRes('QR not found in demo store.') }
          controls.stop(); setScanning(false)
        }
      })
    } catch(e){
      setScanRes('Camera error. Grant permission.'); setScanning(false)
    }
  }

  return (
    <div className="card">
      <h2>Samples</h2>
      <div style={{display:'flex', gap:16, flexWrap:'wrap'}}>
        {samples.slice(0,12).map(s =>
          <div key={s.id} className="card" style={{width:180}}>
            <div className="small">{s.timepointLabel} • rep {s.replicate}</div>
            <QRCodeCanvas value={s.qrId} size={150}/>
            <div className="small">{s.collectedAt? 'collected' : 'planned'}</div>
          </div>
        )}
      </div>
      <div style={{marginTop:16}}>
        <button className="btn" onClick={startScan}>Scan QR to mark collected</button>
        {scanning && <div><video id="video" width="320" height="240" style={{marginTop:12}}/></div>}
        {scanRes && <p>{scanRes}</p>}
      </div>
    </div>
  )
}
