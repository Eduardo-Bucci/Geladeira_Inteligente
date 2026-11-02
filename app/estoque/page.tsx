
"use client";


import { useMemo, useState, useEffect } from "react";
import { Leaf, Bell, Trash, CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";

type Alimento = {
  id: number;
  nome: string;
  quantidade: number;
  unidade: string;
  local: string;
  validade: string;
};

{/*tropa, falta sincronizar com a pagina do dashboard, nao sei fazer isso ainda*/}
const alimentosIniciais: Alimento[] = [
  { id: 1, nome: "Leite", quantidade: 2, unidade: "unidades", local: "Geladeira", validade: "2026-11-04" },
  { id: 2, nome: "Maçã", quantidade: 6, unidade: "unidades", local: "Geladeira", validade: "2026-11-08" },
  { id: 3, nome: "Frango", quantidade: 1, unidade: "kg", local: "Freezer", validade: "2026-11-20" },
  { id: 4, nome: "Arroz", quantidade: 2, unidade: "kg", local: "Despensa", validade: "2027-03-15" },
];

export default function Estoque() {
  const [alimentos, setAlimentos] = useState(alimentosIniciais);
  const [pesquisa, setPesquisa] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("1");
  const [unidade, setUnidade] = useState("unidades");
  const [local, setLocal] = useState("Geladeira");
  const [validade, setValidade] = useState("");

  const [data, setData] = useState('');

  const Router = useRouter();

  useEffect(() => {
    // Essa é a parte de atualizar a data atual, para mostrar na tela
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    setData(dataAtual);
  }, []);

  {/*tentando fazer uma parte para começar a contar os dias, mas ta dificil */}
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const diasAteVencer = (data: string) => {
    const vencimento = new Date(data + "T00:00:00");
    return Math.ceil(
      (vencimento.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  const alimentosFiltrados = useMemo(() => {
    return alimentos.filter((alimento) => {
      const correspondeNome = alimento.nome
        .toLowerCase()
        .includes(pesquisa.toLowerCase());

      const correspondeLocal =
        filtro === "Todos" || alimento.local === filtro;

      return correspondeNome && correspondeLocal;
    });
  }, [alimentos, pesquisa, filtro]);

  const proximosVencimento = alimentos.filter(
    (a) => diasAteVencer(a.validade) >= 0 &&
           diasAteVencer(a.validade) <= 3
  ).length;

  function adicionarAlimento(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!nome.trim() || !validade || Number(quantidade) <= 0) return;

    const novoAlimento: Alimento = {
      id: Date.now(),
      nome: nome.trim(),
      quantidade: Number(quantidade),
      unidade,
      local,
      validade,
    };

    setAlimentos((atuais) => [...atuais, novoAlimento]);

    setNome("");
    setQuantidade("1");
    setValidade("");
    setMostrarFormulario(false);
  }

  function excluirAlimento(id: number) {
    setAlimentos((atuais) => atuais.filter((a) => a.id !== id));
  }

  function paginaInicial() {
    Router.push("/");
  }

  function notification(){
    alert("Tem nada, mas pode colocar notificações de alimentos pertos do vencimento");
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-green-50 to-green-100 px-5 py-8 sm:px-10">

      <header className="mb-8 flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700"><Leaf size={19}/></div>
          <div>
            <h1 onClick={paginaInicial} className="text-lg font-extrabold tracking-tight text-slate-900 cursor-pointer">Eco<span className="text-emerald-600">Fridge</span></h1>
            <p className="text-xs text-slate-400">Organize, aproveite, não desperdice.</p>
          </div>
        </div>
          <div className="gap-1 flex">
              <a href="/dashboard" className="rounded-xl text-sm px-4 py-2 font-semibold text-slate-600 hover:bg-emerald-50"> Página inicial </a>
              <a href="/receitas" className="rounded-xl text-sm px-4 py-2 font-semibold text-slate-600 hover:bg-emerald-50"> Receitas </a>
              <a href="/compras" className="rounded-xl text-sm px-4 py-2 font-semibold text-slate-600 hover:bg-emerald-50"> Lista de compras </a>
          </div>
        <button aria-label="Notificações" onClick={notification} className="relative rounded-xl border border-slate-100 p-2.5 text-slate-500 hover:bg-slate-50">
          <Bell className="h-5 w-5" /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
        </button>
      </header> 

      <div className="mx-auto max-w-7xl">


       
        <section className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="flex flex-col ml-2">
            
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-700">              
              <CalendarDays className="h-4 w-4" /> 
              <span className="font-semibold">{data || 'Carregando...'}</span> 
            </p>

            <h2 className="text-4xl font-extrabold text-slate-950">
              Bem vindo ao seu estoque!
            </h2>
                      
          </div>

          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="rounded-2xl bg-emerald-600 px-7 py-4 font-bold text-white shadow-sm transition hover:bg-emerald-700"
          >
            + Adicionar alimento
          </button>
        </section>


        {/* ai vai adicionar alimento */}
        {mostrarFormulario && (
          <form
            onSubmit={adicionarAlimento}
            className="mb-8 rounded-3xl border border-gray-100 bg-white p-7 shadow-sm"
          >
            <h3 className="mb-6 text-xl font-bold text-slate-900">
              Novo alimento
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <input
                required
                placeholder="Nome do alimento"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="rounded-xl border border-gray-200 p-3 outline-none focus:border-emerald-500"
              />

              <input
                required
                type="number"
                min="1"
                placeholder="Quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                className="rounded-xl border border-gray-200 p-3 outline-none focus:border-emerald-500"
              />

              <select
                value={unidade}
                onChange={(e) => setUnidade(e.target.value)}
                className="rounded-xl border border-gray-200 p-3"
              >
                <option>unidades</option>
                <option>kg</option>
                <option>g</option>
                <option>litros</option>
                <option>pacotes</option>
              </select>

              <select
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                className="rounded-xl border border-gray-200 p-3"
              >
                <option>Geladeira</option>
                <option>Freezer</option>
                <option>Despensa</option>
              </select>

              <input
                required
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={validade}
                onChange={(e) => setValidade(e.target.value)}
                className="rounded-xl border border-gray-200 p-3"
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-700"
              >
                Salvar alimento
              </button>

              <button
                type="button"
                onClick={() => setMostrarFormulario(false)}
                className="rounded-xl bg-gray-100 px-6 py-3 font-semibold text-slate-600"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* lista ai*/}
        <section className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <h3 className="text-2xl font-bold text-slate-950">
              Seus alimentos
            </h3>

            <input
              type="search"
              placeholder="Pesquisar alimento..."
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
              className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          {/* essa parte aqui é para se localizar melhor */}
          <div className="mb-6 flex flex-wrap gap-2">
            {["Todos", "Geladeira", "Freezer", "Despensa"].map((opcao) => (
              <button
                key={opcao}
                onClick={() => setFiltro(opcao)}
                className={`rounded-xl px-5 py-2 font-semibold transition ${
                  filtro === opcao
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-slate-600 hover:bg-emerald-50"
                }`}
              >
                {opcao}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {alimentosFiltrados.map((alimento) => {
              const dias = diasAteVencer(alimento.validade);

              return (
                <div
                  key={alimento.id}
                  className="flex flex-col justify-between gap-4 rounded-2xl border border-gray-100 p-5 sm:flex-row sm:items-center"
                >
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">
                      {alimento.nome}
                    </h4>
                    <p className="mt-1 text-sm text-slate-500">
                      {alimento.quantidade} {alimento.unidade} · {alimento.local}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-5">
                    <div>
                      <p className="text-xs text-slate-400">Validade</p>
                      <p className="font-semibold text-slate-700">
                        {new Date(alimento.validade + "T00:00:00").toLocaleDateString("pt-BR")}
                      </p>
                      <span className={`text-xs font-semibold ${
                        dias < 0
                          ? "text-red-600"
                          : dias <= 3
                          ? "text-amber-600"
                          : "text-emerald-600"
                      }`}>
                        {dias < 0
                          ? "Vencido"
                          : dias === 0
                          ? "Vence hoje"
                          : `Vence em ${dias} dias`}
                      </span>
                    </div>

                    <button
                      onClick={() => excluirAlimento(alimento.id)}
                      title="Excluir alimento"
                      className="rounded-xl bg-red-50 px-4 py-3 flex font-semibold text-red-600 hover:bg-red-100"
                    >
                    <Trash className="h-4 w-4" />
                      
                    </button>
                  </div>
                </div>
              );
            })}

            {alimentosFiltrados.length === 0 && (
              <p className="py-10 text-center text-slate-400">
                Nenhum alimento encontrado.
              </p>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}
