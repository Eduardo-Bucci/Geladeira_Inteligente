"use client"

import { useMemo, useState } from "react"
import { Search, CalendarDays, } from "lucide-react"
 
type Movimentacao = {
  id: number;
  nome: string;
  quantidade: number;
  unidade: string;
  tipo: "cadastro" | "retirada";
  motivo: string;
  data: string;
};

const teste: Movimentacao[] = [
  {
    id: 1,
    nome: "Arroz",
    quantidade: 2,
    unidade: "kg",
    tipo: "cadastro",
    motivo: "Compra",
    data: "05-03-2067",
  },
  {
    id: 2,
    nome: "Leite",
    quantidade: 1,
    unidade: "L",
    tipo: "retirada",
    motivo: "Consumo",
    data: "06-12-2042",
  },
];

export default function Relatorios() {
  const [movimentacoes, setMovimentacoes] =
    useState<Movimentacao[]>(teste);

  const [pesquisa, setPesquisa] = useState("");
  const [filtro, setFiltro] = useState("todos");

  const cadastrados = movimentacoes.filter(
    (item) => item.tipo === "cadastro"
  ).length;

  const retirados = movimentacoes.filter(
    (item) => item.tipo === "retirada"
  ).length;

  const movimentacoesFiltradas = useMemo(() => {
    return movimentacoes.filter((item) => {
      const correspondeNome = item.nome
        .toLowerCase()
        .includes(pesquisa.toLowerCase());

      const correspondeTipo =
        filtro === "todos" || item.tipo === filtro;

      return correspondeNome && correspondeTipo;
    });
  }, [movimentacoes, pesquisa, filtro]);

  function formatarData(data: string) {
    return new Date(data).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return (
    <main className="min-h-screen w-full bg-green-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">

       
        <div>
          <h1 className="text-3xl font-bold text-green-900">
            Relatórios
          </h1>
        </div>

        {/* parte do historico */}
        <section className="rounded-2xl bg-white p-5 shadow-sm md:p-7">

          <div className="mb-6 flex items-center gap-3">
            
            <h2 className="text-xl font-bold text-green-900">
              Histórico de movimentações
            </h2>
          </div>

          {/* os filtros */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row">

            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type="text"
                placeholder="Pesquisar alimento..."
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 outline-none focus:border-green-600"
              />
            </div>

            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-green-600"
            >
              <option value="todos">Todas as movimentações</option>
              <option value="cadastro">Cadastrados</option>
              <option value="retirada">Retirados</option>
            </select>

          </div>

          {/* parte da lista */}
          <div className="space-y-3">

            {movimentacoesFiltradas.length > 0 ? (
              movimentacoesFiltradas.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between gap-4 rounded-xl border border-gray-100 p-4 transition hover:bg-green-50 md:flex-row md:items-center"
                >
                  <div className="flex items-center gap-4">

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {item.nome}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {item.quantidade} {item.unidade} • {item.motivo}
                      </p>
                    </div>

                  </div>

                  <div className="flex flex-wrap items-center gap-3 md:justify-end">

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <CalendarDays size={16} />
                      {formatarData(item.data)}
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.tipo === "cadastro"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.tipo === "cadastro"
                        ? "Cadastrado"
                        : "Retirado"}
                    </span>

                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-gray-500">
                Nenhuma movimentação encontrada.
              </div>
            )}

          </div>

        </section>

      </div>
    </main>
  );
}
