// Simula um delay de requisição
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Banco de ideias templates
const ideasTemplates = [
  (nicho: string, descricao: string) => 
    `Plataforma de ${nicho} que ${descricao}. Uma abordagem inovadora seria criar uma comunidade colaborativa onde usuários possam compartilhar experiências e aprender uns com os outros.`,
  
  (nicho: string, descricao: string) => 
    `Aplicativo de ${nicho} focado em ${descricao}. A ideia seria integrar inteligência artificial para personalizar a experiência de cada usuário de forma única.`,
  
  (nicho: string, descricao: string) => 
    `Solução B2B para ${nicho} que ${descricao}. Seria revolucionário implementar um sistema de automação que reduzisse o tempo de processamento em até 80%.`,
  
  (nicho: string, descricao: string) => 
    `Marketplace de ${nicho} com foco em ${descricao}. A diferença competitiva seria criar um sistema de reputação baseado em blockchain para máxima transparência.`,
  
  (nicho: string, descricao: string) => 
    `SaaS de ${nicho} que ${descricao}. Uma estratégia promissora seria oferecer planos de freemium com recursos avançados para profissionais.`,
];

export async function generateIdea(nicho: string, descricao: string): Promise<string> {
  // Simula latência de rede
  await delay(1500);

  // Seleciona uma ideia template aleatória
  const randomIndex = Math.floor(Math.random() * ideasTemplates.length);
  const selectedTemplate = ideasTemplates[randomIndex];

  // Gera a ideia com os inputs do usuário
  return selectedTemplate(nicho, descricao);
}
