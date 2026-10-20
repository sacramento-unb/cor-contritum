import type { Context, Mode, Question } from './types'

export const references = [
  { label: 'Catecismo da Igreja Católica, §§ 1422–1498', url: 'https://www.vatican.va/archive/cathechism_po/index_new/p2s2cap1_1420-1532_po.html' },
  { label: 'Catecismo, §§ 1852–1864', url: 'https://www.vatican.va/content/dam/wss/archive/cathechism_po/index_new/p3s1cap1_1699-1876_po.html' },
  { label: 'Catecismo, §§ 2041–2043', url: 'https://www.vatican.va/archive/cathechism_po/index_new/p3s1cap3_1949-2051_po.html' },
  { label: 'Código de Direito Canônico, cânones 987–989', url: 'https://www.vatican.va/archive/cod-iuris-canonici/latin/documents/cic_liber_IV_lt.html' },
]

export const contextLabels: Record<Context, string> = {
  solteiro: 'Solteiro', casado: 'Casado', pais: 'Pai ou mãe', cuidador: 'Cuida de familiares', estudante: 'Estudante',
  profissional: 'Profissional empregado', empresario: 'Empresário ou autônomo', gestor: 'Gestor ou líder', educador: 'Professor ou educador',
  tecnologia: 'Tecnologia e dados', religioso: 'Religioso ou seminarista', outros: 'Outras responsabilidades',
}

const commandmentQuestions: Question[] = [
  { id: 'm1-prayer', commandment: '1º Mandamento', title: 'Amar a Deus sobre todas as coisas', prompt: 'Tenho cultivado minha relação com Deus por meio da oração e procurado viver minha fé com sinceridade?', reference: 'CIC §§ 2084–2132', scripture: '“Amarás o Senhor teu Deus de todo o teu coração.” (Mt 22,37)' },
  { id: 'm1-priorities', commandment: '1º Mandamento', title: 'Amar a Deus sobre todas as coisas', prompt: 'Coloquei voluntariamente dinheiro, trabalho, prazeres ou outros interesses acima dos meus deveres para com Deus?', reference: 'CIC §§ 2113–2114' },
  { id: 'm1-superstition', commandment: '1º Mandamento', title: 'Amar a Deus sobre todas as coisas', prompt: 'Consenti em práticas de superstição, adivinhação ou ocultismo contrárias à fé católica?', reference: 'CIC §§ 2115–2117', sensitive: true },
  { id: 'm2-name', commandment: '2º Mandamento', title: 'Não tomar seu santo nome em vão', prompt: 'Utilizei o nome de Deus ou aquilo que é sagrado de modo desrespeitoso, em blasfêmia, juramento falso ou promessa sem intenção de cumprir?', reference: 'CIC §§ 2142–2167' },
  { id: 'm3-sunday', commandment: '3º Mandamento', title: 'Guardar domingos e festas de preceito', prompt: 'Faltei deliberadamente à Missa dominical ou de preceito sem motivo justificável?', reference: 'CIC §§ 2168–2195' },
  { id: 'm3-rest', commandment: '3º Mandamento', title: 'Guardar domingos e festas de preceito', prompt: 'Procurei reservar o domingo para Deus, para a família, para o descanso e para o bem do próximo, considerando minhas obrigações legítimas?', reference: 'CIC §§ 2184–2188' },
  { id: 'm4-family', commandment: '4º Mandamento', title: 'Honrar pai e mãe', prompt: 'Tratei meus pais, familiares e as pessoas sob minha responsabilidade com respeito, paciência e cuidado?', reference: 'CIC §§ 2196–2257', contexts: ['solteiro', 'casado', 'pais', 'cuidador'] },
  { id: 'm4-care', commandment: '4º Mandamento', title: 'Honrar pai e mãe', prompt: 'Negligenciei atenção, carinho, educação ou apoio devidos à minha família?', reference: 'CIC §§ 2214–2231', contexts: ['casado', 'pais', 'cuidador'] },
  { id: 'm5-harm', commandment: '5º Mandamento', title: 'Não matar', prompt: 'Causei dano físico ou emocional injusto a alguém por violência, intimidação, humilhação, imprudência grave ou desejo de vingança?', reference: 'CIC §§ 2258–2301', sensitive: true },
  { id: 'm5-omission', commandment: '5º Mandamento', title: 'Não matar', prompt: 'Deixei de socorrer alguém quando tinha obrigação e possibilidade real de ajudar?', reference: 'CIC §§ 2263–2269' },
  { id: 'm6-chastity', commandment: '6º Mandamento', title: 'Não pecar contra a castidade', prompt: 'Fui fiel à dignidade do meu corpo, da outra pessoa e, quando aplicável, às responsabilidades do matrimônio?', reference: 'CIC §§ 2331–2400', contexts: ['casado', 'solteiro'], sensitive: true },
  { id: 'm6-media', commandment: '6º Mandamento', title: 'Não pecar contra a castidade', prompt: 'Consenti deliberadamente em pornografia, exploração, coerção ou conteúdos que reduzem a pessoa a objeto?', reference: 'CIC §§ 2351–2356', sensitive: true },
  { id: 'm7-honesty', commandment: '7º Mandamento', title: 'Não furtar', prompt: 'Fui honesto com bens, dinheiro, contratos e obrigações legítimas? Causei ou mantive algum prejuízo injusto?', reference: 'CIC §§ 2401–2463' },
  { id: 'm7-work', commandment: '7º Mandamento', title: 'Não furtar', prompt: 'Trabalhei com zelo e justiça, evitando exploração, corrupção, uso indevido de recursos ou negligência grave?', reference: 'CIC §§ 2426–2436', contexts: ['profissional', 'empresario', 'gestor'] },
  { id: 'm7-data', commandment: '7º Mandamento', title: 'Não furtar', prompt: 'Respeitei a privacidade, a confidencialidade e a integridade dos dados e sistemas a que tive acesso?', reference: 'CIC §§ 2407–2414', contexts: ['tecnologia', 'gestor', 'profissional'] },
  { id: 'm8-truth', commandment: '8º Mandamento', title: 'Não levantar falso testemunho', prompt: 'Menti, caluniei, difamei, revelei segredos sem justa razão ou divulguei boatos de modo irresponsável?', reference: 'CIC §§ 2464–2513' },
  { id: 'm8-results', commandment: '8º Mandamento', title: 'Não levantar falso testemunho', prompt: 'Manipulei deliberadamente informações, resultados ou documentos para enganar ou prejudicar alguém?', reference: 'CIC §§ 2482–2487', contexts: ['profissional', 'empresario', 'gestor', 'tecnologia'] },
  { id: 'm9-desire', commandment: '9º Mandamento', title: 'Não desejar a mulher do próximo', prompt: 'Consenti deliberadamente em desejos ou fantasias contrários à castidade e ao respeito pelo matrimônio próprio ou alheio?', reference: 'CIC §§ 2514–2533', sensitive: true },
  { id: 'm10-envy', commandment: '10º Mandamento', title: 'Não cobiçar as coisas alheias', prompt: 'Cultivei inveja, cobiça, ambição desordenada ou ressentimento diante da prosperidade de outra pessoa?', reference: 'CIC §§ 2534–2557' },
]

export const complementaryQuestions: Question[] = [
  { id: 'omission-good', commandment: 'Omissões', title: 'O bem que deixei de fazer', prompt: 'Que bem eu tinha obrigação e possibilidade de fazer, mas deliberadamente deixei de realizar?', reference: 'CIC §§ 1853, 2093–2094', modes: ['completo', 'aprofundado'] },
  { id: 'virtues-faith', commandment: 'Virtudes', title: 'Fé, esperança e caridade', prompt: 'Como procurei crescer na fé, na esperança, na caridade e na confiança na misericórdia de Deus?', reference: 'CIC §§ 1812–1829', modes: ['aprofundado'] },
  { id: 'virtues-cardinal', commandment: 'Virtudes', title: 'Prudência, justiça, fortaleza e temperança', prompt: 'Onde fui chamado a agir com prudência, justiça, fortaleza ou temperança e não correspondi?', reference: 'CIC §§ 1803–1811', modes: ['aprofundado'] },
  { id: 'capital-habits', commandment: 'Pecados capitais', title: 'Raízes e hábitos', prompt: 'Que tendência — soberba, avareza, luxúria, ira, gula, inveja ou preguiça — percebo como raiz de faltas concretas?', reference: 'CIC §§ 1866, 2534–2557', modes: ['aprofundado'] },
  { id: 'tech-ethics', commandment: 'Responsabilidades profissionais', title: 'Tecnologia e dados', prompt: 'Meu trabalho com tecnologia e dados protegeu pessoas, privacidade e justiça, ou contribuiu para dano, discriminação ou manipulação?', reference: 'CIC §§ 2407–2414', contexts: ['tecnologia'], modes: ['completo', 'aprofundado'] },
  { id: 'manager-justice', commandment: 'Responsabilidades profissionais', title: 'Autoridade e gestão', prompt: 'Usei minha autoridade com justiça, transparência e respeito, sem abuso ou tratamento desigual?', reference: 'CIC §§ 2234–2237, 2411', contexts: ['gestor', 'empresario'], modes: ['completo', 'aprofundado'] },
  { id: 'parents-example', commandment: 'Responsabilidades familiares', title: 'Pais e mães', prompt: 'Ofereci aos filhos presença, afeto, correção proporcional, bom exemplo e formação cristã?', reference: 'CIC §§ 2221–2229', contexts: ['pais'], modes: ['completo', 'aprofundado'] },
]

export const questionsFor = (mode: Mode, contexts: Context[]) => [...commandmentQuestions, ...complementaryQuestions].filter(q => {
  if (q.modes && !q.modes.includes(mode)) return false
  if (q.contexts && !q.contexts.some(context => contexts.includes(context))) return false
  return true
})

export const modeLabels: Record<Mode, string> = { breve: 'Breve', completo: 'Completo', aprofundado: 'Aprofundado' }
