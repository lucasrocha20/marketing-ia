import { useState } from 'react';
import logo from '../assets/logo.png';

export function Home() {
  const [nicho, setNicho] = useState('');
  const [descricao, setDescricao] = useState('');
  const [resultado, setResultado] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGerarIdeia = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.API_URL}/v1/gerar-ideia`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nicho, descricao }),
      });

      const json = await res.json();

      setResultado(json.data.ideia);
    } catch {
      setResultado('Erro ao gerar ideia. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4 w-screen">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <div className="flex items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">Gerador de Ideias</h1>
            <img src={logo} alt="Logo" className="w-24 h-24 rotate-12" />
          </div>
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
      <footer className="w-full max-w-2xl mx-auto mt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Insta Marketing IA — Todos os direitos reservados.
      </footer>
    </div>
  );
}
