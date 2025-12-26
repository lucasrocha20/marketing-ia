 
**Marketingia — Documentação do Projeto**

**Visão Geral**
- **Descrição:** Projeto que gera ideias estratégicas de conteúdo para Instagram com base em nicho e descrição informados. O backend usa NestJS e integra com a API da OpenAI para construir a sugestão; o frontend é uma aplicação React (Vite + TypeScript).
- **Objetivo:** Ajudar criadores e profissionais de marketing a obter ideias concretas e aplicáveis de publicações (Reels, Carrossel, Stories) otimizadas para engajamento e performance.

**Arquitetura**
- **Back-end:** NestJS com TypeScript.
- **Front-end:** React (Vite) com TypeScript.
- **Orquestração / Dev:** `docker-compose.yml` no root para executar front + back em containers.

**Back-end**
- **Stack:** NestJS, OpenAI SDK (`openai`) — a integração está em [back/src/routes/idea/ideia.service.ts](back/src/routes/idea/ideia.service.ts).
- **Variáveis de ambiente:**
	- **OPENAI_API_KEY:** Chave de API da OpenAI necessária no ambiente do back.
    - **API_URL:** Url de API.
- **Rota principal:**
	- **POST /gerar-ideia** — recebe JSON com `nicho` e `descricao` e retorna uma ideia gerada.
	- **Payload de exemplo:**

```json
{
	"nicho": "fitness",
	"descricao": "treinos rápidos para mães ocupadas"
}
```

**Exemplo de chamada via curl:**

```bash
curl -X POST http://localhost:3333/gerar-ideia \
	-H "Content-Type: application/json" \
	-d '{"nicho":"fitness","descricao":"treinos rápidos para mães ocupadas"}'
```

**Formato de resposta esperado:**

```json
{
	"success": true,
	"data": {
		"nicho": "fitness",
		"descricao": "treinos rápidos para mães ocupadas",
		"ideia": "...texto gerado pela OpenAI com formato, hook, desenvolvimento e CTA..."
	}
}
```

- **Como funciona internamente:** O serviço constrói um prompt detalhado com regras e instruções específicas (priorizando formatos viralizáveis) e chama o método `responses.create` do cliente OpenAI. Veja a construção do prompt em [back/src/routes/idea/ideia.service.ts](back/src/routes/idea/ideia.service.ts).

**Executando o Back (local / dev)**
- Com Node/npm:

```bash
cd back
npm install
npm run start:dev
```

- Com Docker (dev):

```bash
docker build -f back/Dockerfile.dev -t marketingia-back:dev back
docker run --env OPENAI_API_KEY=$OPENAI_API_KEY -p 3000:3000 marketingia-back:dev
```

**Front-end**
- **Stack:** React + Vite + TypeScript. O front consome a rota `POST /gerar-ideia` do backend para mostrar ideias geradas ao usuário.
- **Pontos-chave:**
	- Componente principal: [front/src/App.tsx](front/src/App.tsx)
	- Chamadas à API: implementadas em [front/src/api/fakeApi.ts](front/src/api/fakeApi.ts) (ou adaptável para chamada real ao backend).

**Executando o Front (local / dev)**

```bash
cd front
npm install
npm run dev
```

- Para produção (build):

```bash
cd front
npm run build
```

- Com Docker (dev):

```bash
docker build -f front/Dockerfile.dev -t marketingia-front:dev front
docker run -p 5173:5173 marketingia-front:dev
```

**Executando tudo com Docker Compose**
- Subir ambos (front + back) via compose:

```bash
docker-compose up -d
```

**Exemplos de uso e fluxos**
- **Fluxo básico:**
	1. Usuário preenche `nicho` e `descricao` no formulário do front.
	2. Front envia `POST /gerar-ideia` com JSON.
	3. Back monta prompt e chama OpenAI, recebendo texto com a ideia.
	4. Back retorna estrutura `{ success: true, data: { ... } }` e front exibe ao usuário.

- **Exemplo completo (fetch no browser):**

```javascript
const payload = { nicho: 'culinaria', descricao: 'receitas rápidas e saudaveis' };

fetch('http://localhost:3000/gerar-ideia', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify(payload),
})
.then(r => r.json())
.then(data => console.log(data));
```

**Testes e verificação**
- Não há testes automatizados incluídos por padrão — para testar manualmente, use as rotas e exemplos acima.

**Boas práticas e ajustes**
- Validação: adicione validação de DTO no backend (por exemplo, `class-validator`) para garantir `nicho` e `descricao` válidos.
- Rate limits / cache: considere cachear respostas por `nicho`+`descricao` para reduzir custo com OpenAI e melhorar latência.

**Arquivos úteis**
- `docker-compose.yml`: orquestra front e back.
- [back/Dockerfile](back/Dockerfile) e [back/Dockerfile.dev](back/Dockerfile.dev)
- [front/Dockerfile](front/Dockerfile) e [front/Dockerfile.dev](front/Dockerfile.dev)

**Próximos passos sugeridos**
- Adicionar autenticação e limites por usuário para proteção contra uso indevido.
- Implementar interface de histórico de ideias (persistência em DB).
- Adicionar testes de integração para o endpoint `/gerar-ideia`.
- Logs e monitoramento: registre chamadas e erros do cliente OpenAI para auditar falhas.
- Adicionar cache
