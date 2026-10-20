import { describe, expect, it } from 'vitest'
import { questionsFor } from './data'

describe('catálogo do exame', () => {
  it('adapta perguntas por modalidade e contexto sem remover os mandamentos', () => {
    const brief = questionsFor('breve', [])
    const technology = questionsFor('completo', ['tecnologia'])
    expect(new Set(brief.map(question => question.commandment)).size).toBeGreaterThanOrEqual(8)
    expect(technology.some(question => question.id === 'm7-data')).toBe(true)
    expect(brief.some(question => question.id === 'tech-ethics')).toBe(false)
  })
})
