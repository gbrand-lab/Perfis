// Frame vazio do plano de Stories, pronto pra receber o padrão do cliente
// (tipos de story, textos, dias com nota, etc).
export const storyTypes = {
  aviso: { label: 'Aviso', className: 'story-tag--aviso' },
}

const WEEKDAY_LABEL = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export const storiesPlan = WEEKDAY_LABEL.map((day) => ({ day, stories: [] }))
