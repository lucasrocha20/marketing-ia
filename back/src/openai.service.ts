import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateIdea(nicho: string, descricao: string): Promise<string> {
    // const prompt = `Você é um especialista em geração de ideias para conteudos do instagram no feed e no story com objetivo de maior alcance no perfil. Com base no seguinte nicho e descrição, gere uma ideia de publicação, se tiver imagem descreva ela: Nicho: ${nicho} Descrição: ${descricao}. Forneça uma ideia detalhada que inclua: 1. Hook 2. Desenvolvimento 3. CTA Mantenha a resposta concisa mas informativa. Não repetir pergunta e inputs na resposta.`;
    const prompt = `Você é um especialista em marketing de conteúdo para Instagram, focado em alcance orgânico, engajamento e crescimento de perfil. Com base no nicho ${nicho} e descrição ${descricao}, sua tarefa é pesquisar e escolher a estratégia de marketing mais eficaz atualmente para esse nicho no Instagram (ex: Reels curtos, carrossel educativo, storytelling emocional, autoridade, tendências, etc). Criar uma ideia completa de publicação alinhada com essa estratégia, incluindo: Formato ideal (Reels, Carrossel, Stories ou combinação) Objetivo do post (alcance, salvamentos, seguidores ou conversão) Hook (primeiros segundos ou primeiro slide) Desenvolvimento (estrutura clara do conteúdo) CTA estratégico (não genérico) Se houver imagem ou vídeo, descreva detalhadamente como deve ser Adaptar a linguagem ao público do nicho (emocional, técnico, simples ou popular). Regras: O conteúdo deve ser pensado para performance no algoritmo do Instagram. Priorize conteúdos salváveis e compartilháveis. Evite respostas genéricas Seja direto, estratégico e aplicável. Não repetir a pergunta e inputs digitados, ir direto a resposta. Diga em poucas palavras a estrategia escolhida, ideia completa da publicação e objetivo do post, apos isso mostre como a publicação deve ser realizada de forma detalhada, apos isso diga de forma detalhada como devem ser as publicações . Não diga por que funciona. Me diga quantos tokens foram utilizados na resposta`;

    const response = await this.client.responses.create({
      model: 'o4-mini',
      input: prompt,
      max_output_tokens: 1500,
    });

    return response.output_text;
  }
}
