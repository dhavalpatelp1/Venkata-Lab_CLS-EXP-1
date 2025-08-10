
export type Compound = { name: string; conc_mM: number }
export type Stressor = { name: string; conc_mM: number }
export type SchedulePoint = { label: string; offsetMin: number; plannedAt?: string }

export type ExperimentDoc = {
  id: string
  title: string
  organism: 'yeast' | 'HEK293'
  strain: 'S288C' | 'BY4741' | 'HEK293'
  mutants: string[]
  compounds: Compound[]
  stressors: Stressor[]
  startAt: string
  replicates: number
  ownerUid?: string
  status: 'planned' | 'running' | 'done' | 'paused'
  schedule: SchedulePoint[]
  createdAt?: string
  updatedAt?: string
}

export type SampleDoc = {
  id: string
  expId: string
  replicate: number
  timepointLabel: string
  plannedAt: string
  collectedAt?: string | null
  qrId: string
  location?: string
  notes?: string
  status?: 'planned'|'collected'|'frozen'|'extracted'|'sequenced'
}
