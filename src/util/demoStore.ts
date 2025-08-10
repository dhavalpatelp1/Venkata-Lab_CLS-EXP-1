
import { ExperimentDoc, SampleDoc, SchedulePoint } from '../types'

const LS_KEY = 'ewt-demo-store-v1'

type DB = {
  experiments: Record<string, ExperimentDoc>
  samples: Record<string, SampleDoc>
}

function load(): DB {
  const raw = localStorage.getItem(LS_KEY)
  if (!raw) return { experiments: {}, samples: {} }
  try { return JSON.parse(raw) as DB } catch { return { experiments: {}, samples: {} } }
}

function save(db: DB){ localStorage.setItem(LS_KEY, JSON.stringify(db)) }

function uid(){ return crypto.randomUUID() }

export const demo = {
  getExperiments(): ExperimentDoc[] { return Object.values(load().experiments) },
  getSamplesByExp(expId: string): SampleDoc[] {
    return Object.values(load().samples).filter(s => s.expId === expId)
  },
  getAllSamples(): SampleDoc[] { return Object.values(load().samples) },
  getExperiment(id: string){ return load().experiments[id] || null },
  upsertExperiment(e: ExperimentDoc){
    const db = load(); db.experiments[e.id] = e; save(db); return e
  },
  createExperimentFromForm(f: Omit<ExperimentDoc,'id'|'createdAt'|'updatedAt'>){
    const id = uid()
    const now = new Date().toISOString()
    const exp: ExperimentDoc = { ...f, id, createdAt: now, updatedAt: now }
    const db = load(); db.experiments[id] = exp
    // generate samples
    const samples = generateSamples(exp)
    for (const s of samples){ db.samples[s.id] = s }
    save(db)
    return exp
  },
  updateExperimentStatus(id: string, status: ExperimentDoc['status']){
    const db = load(); if (!db.experiments[id]) return
    db.experiments[id].status = status; db.experiments[id].updatedAt = new Date().toISOString(); save(db)
  },
  markSampleCollected(sampleId: string){
    const db = load(); if (!db.samples[sampleId]) return
    db.samples[sampleId].collectedAt = new Date().toISOString()
    db.samples[sampleId].status = 'collected'; save(db)
  },
  upsertSample(s: SampleDoc){
    const db = load(); db.samples[s.id] = s; save(db)
  },
  findSampleByQr(qrId: string){ return Object.values(load().samples).find(s => s.qrId === qrId) || null },
  seedIfEmpty(){
    const db = load(); if (Object.keys(db.experiments).length) return
    const start = new Date()
    const exp = {
      title: 'Yeast 16h H2O2 + Butyrate',
      organism: 'yeast' as const, strain: 'S288C' as const,
      mutants: ['sir2Δ','set2Δ'],
      compounds: [{name:'Butyrate', conc_mM:5}], stressors:[{name:'H2O2', conc_mM:0.5}],
      startAt: start.toISOString(), replicates: 3, status:'planned' as const,
      schedule: [
        {label:'T0', offsetMin:0},
        {label:'16h', offsetMin:16*60},
        {label:'Day6', offsetMin:6*24*60},
      ],
    }
    demo.createExperimentFromForm(exp)
  }
}

function generateSamples(exp: ExperimentDoc){
  const out: SampleDoc[] = []
  const start = new Date(exp.startAt).getTime()
  for (const tp of exp.schedule){
    const planned = new Date(start + tp.offsetMin*60*1000).toISOString()
    for (let r=1; r<=exp.replicates; r++){
      const id = uid()
      out.push({
        id, expId: exp.id, replicate: r,
        timepointLabel: tp.label, plannedAt: planned, collectedAt: null,
        qrId: id.slice(0,26), status:'planned'
      })
    }
  }
  return out
}
