import process from 'process';
import { useState } from 'react';

// type IdeaResult = {
//   nome?: string;
//   descricaoCurta?: string;
//   publico?: string;
//   diferencial?: string;
//   primeiraAcao?: string;
//   raw?: string;
// };

// function parseOpenAIStyle(text: string): IdeaResult {
//   const getSection = (n: number) => {
//     const next = n + 1;
//     const re = new RegExp(`${n}\\.\\s*([\\s\\S]*?)(?=\\n\\s*${next}\\.|$)`, 'm');
//     const m = text.match(re);
//     return m ? m[1].trim() : undefined;
//   };

//   const result: IdeaResult = {
//     nome: getSection(1),
//     descricaoCurta: getSection(2),
//     publico: getSection(3),
//     diferencial: getSection(4),
//     primeiraAcao: getSection(5),
//     raw: text,
//   };

//   const anyParsed = result.nome || result.descricaoCurta || result.publico || result.diferencial || result.primeiraAcao;
//   if (!anyParsed) return { raw: text };
//   return result;
// }

export function Home() {
  const [nicho, setNicho] = useState('');
  const [descricao, setDescricao] = useState('');
  // const [resultado, setResultado] = useState<IdeaResult | null>(null);
  const [resultado, setResultado] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGerarIdeia = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.API_URL}/v1/gerar-ideia`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nicho, descricao }),
      });

      const json = await res.json();

      // const raw = json?.data?.ideia || (typeof json === 'string' ? json : JSON.stringify(json));
      // const parsed = parseOpenAIStyle(raw);
      setResultado(json.data.ideia);
    } catch {
      // setResultado({ raw: 'Erro ao gerar ideia. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  console.log('resultado', resultado);

  // useEffect(()=> {
  //     const response = {
  //       "success": true,
  //       "data": {
  //           "nicho": "Psicologia",
  //           "descricao": "Depressão atipica",
  //           "ideia": "Estratégia escolhida: Carrossel educativo + storytelling emocional  \nIdeia completa: Explicar sintomas peculiaridades da depressão atípica de forma clara e acolhedora, com narrativa que conecta emocionalmente ao leitor, visando que salvem e compartilhem o conteúdo para ajudar outras pessoas.  \nObjetivo do post: Salvamentos e compartilhamentos para alcance orgânico.\n\nPublicação detalhada:\n\nFormato ideal: Carrossel de 7 slides.\n\nHook (Slide 1):  \nImagem ilustrativa acolhedora (ex: pessoa com expressão pensativa, cores suaves e impactantes) + texto grande e direto:  \n“Sente que sua tristeza é diferente? Isso pode ser Depressão Atípica.”\n\nDesenvolvimento (Slides 2 a 6):  \n2. O que é Depressão Atípica?  \nExplicação simples, linguagem acessível: “Um tipo de depressão que muitos não conhecem, mas afeta a vida de muita gente.”  \nDesign clean, com ícones que simbolizam dúvidas e descobertas.  \n\n3. Sintomas principais (lista visual, com checklists):  \n- Melhora temporária ao receber boas notícias  \n- Aumento do apetite e ganho de peso  \n- Sono excessivo  \n- Sensibilidade extrema à rejeição  \nCada sintoma em destaque com ilustração minimalista.\n\n4. Por que é diferente da depressão “comum”?  \nTexto em tom acolhedor, explicando a confusão comum e necessidade de diagnóstico correto.\n\n5. Como lidar e buscar ajuda?  \nDicas práticas direcionando para psicólogos e profissionais.  \nUse ícones de apoio, telefone ou símbolo de terapia.\n\n6. História curta (storytelling):  \nDepoimento fictício resumido ou real (com autorização) sobre alguém que descobriu ter depressão atípica e mudou a vida ao buscar ajuda.\n\nCTA estratégico (Slide 7):  \n“Salve este post para quando precisar lembrar dos sinais e compartilhe com quem pode estar passando por isso. Conhecimento pode transformar vidas.”  \nBotão/ícone visual de “salvar” e “compartilhar”.\n\nLinguagem: Emocional, simples e acolhedora, evitando termos técnicos complexos, para facilitar identificação e engajamento de leigos e pessoas com dúvidas.\n\nDetalhes visuais:  \n- Paleta de cores suaves (tons pastel, azuis e verdes calmantes)  \n- Ilustrações minimalistas e humanas, estilo flat design  \n- Fontes legíveis, títulos em destaque e textos curtos para fácil leitura  \n- Espaço branco para facilitar o foco no conteúdo  \n- No storytelling, imagem do perfil (desenho ou foto leve, dependendo do uso real ou fictício)\n\nEssa estrutura maximiza salvamentos e compartilhamentos, engajando emocionalmente e educando simultaneamente.\n\nTokens usados: 353 tokens."
  //       }
  //   }
  //   setResultado(response.data.ideia);
  // })

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 w-screen">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">Gerador de Ideias</h1>
          <p className="text-gray-600 text-center mb-8">Descreva seu nicho e descrição para receber uma ideia de publicação</p>

          <div className="space-y-6">
            <div>
              <label htmlFor="nicho" className="block text-sm font-medium text-gray-700 mb-2">Nicho</label>
              <input
                id="nicho"
                type="text"
                value={nicho}
                onChange={(e) => setNicho(e.target.value)}
                placeholder="Ex: Tecnologia, Saúde, Educação..."
                className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label htmlFor="descricao" className=" block text-sm font-medium text-gray-700 mb-2">Descrição</label>
              <textarea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descreva a ideia principal..."
                rows={4}
                className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              />
            </div>

            <button
              onClick={handleGerarIdeia}
              disabled={loading || !nicho.trim() || !descricao.trim()}
              className="cursor-pointer w-full bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 active:scale-95"
            >
              {loading ? 'Gerando...' : 'Gerar Ideia'}
            </button>

            {resultado && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Ideia Gerada:</h2>
                <p className="whitespace-pre-line">{resultado}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
