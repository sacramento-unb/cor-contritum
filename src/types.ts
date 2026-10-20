export type Mode = 'breve' | 'completo' | 'aprofundado'
export type Context = 'solteiro' | 'casado' | 'pais' | 'cuidador' | 'estudante' | 'profissional' | 'empresario' | 'gestor' | 'educador' | 'tecnologia' | 'religioso' | 'outros'
export type AnswerChoice = 'clear' | 'reflect' | 'priest' | 'skip' | 'na'
export type StorageMode = 'temporary' | 'encrypted'
export type Screen = 'home' | 'context' | 'prayer' | 'exam' | 'complementary' | 'discernment' | 'review' | 'contrition' | 'guide' | 'summary' | 'privacy' | 'catechesis' | 'daily'

export interface Question {
  id: string
  commandment: string
  title: string
  prompt: string
  explanation?: string
  reference: string
  scripture?: string
  contexts?: Context[]
  sensitive?: boolean
  modes?: Mode[]
}

export interface Answer {
  choice: AnswerChoice
  note?: string
  frequency?: string
  include?: boolean
}

export interface Session {
  id: string
  createdAt: string
  updatedAt: string
  firstConfession: boolean
  lastConfession: string
  period: string
  mode: Mode
  contexts: Context[]
  storageMode: StorageMode
  answers: Record<string, Answer>
  priestQuestions: string[]
  resolutions: string[]
  personalPrayer: string
}
