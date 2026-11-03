"use client";

import { useMemo, useState, useEffect } from "react";
import { Leaf, Bell, Trash, CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2"

type Alimento = {
  id: number;
  nome: string;
  validade: string;
  quantidade: string;
  custo_total: string;
  estado: string;
};

export default function Estoque() {
  const [alimentos, setAlimentos] = useState<Alimento[]>([]);
  const [pesquisa, setPesquisa] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [nome, setNome] = useState("");
  const [validade, setValidade] = useState("");
  const [quantidade, setQuantidade] = useState("0");
  const [custo_total, setCusto_total] = useState("0");
  const [estado, setEstado] = useState("");

  const [data, setData] = useState('');

  const Router = useRouter();

   useEffect(() => {
    const hoje = new Date();
    setData(hoje.toLocaleDateString('pt-BR'));
  }, []);

  async function buscarEstoque(){

    try {
      const response = await fetch("http://localhost:3001/estoque")

      if(!response.ok){
        const erro = await response.text()
        console.error("Erro HTTP ", response.status, erro)
        throw new Error("Erro ao buscar estoque")
      }

      const data = await response.json()
      
      setAlimentos(Array.isArray (data) ? data : data.data ?? [])
    } catch (error) {
      console.error("Erro ao buscar usuário ", error)

      await Swal.fire({
              title: "Erro",
              text: "Não foi possível carregar o estoque. Confira se o servidor está ligado e se a rota GET /usuarios existe.",
              icon: "error",
              confirmButtonText: "Ok",
            });
    }
  }

  useEffect(() => {
    buscarEstoque()
  }, []);

   const formatarData = (dataString: string) => {
    if (!dataString) return "";
    try {
      const data = new Date(dataString); 
      data.setMinutes(data.getMinutes() + data.getTimezoneOffset());
      return data.toLocaleDateString('pt-BR');
    } catch {
      return dataString;
    }
  };

  const alimentosFiltrados = useMemo(() => {
    return alimentos.filter((alimento) => {
      const correspondeNome = alimento.nome
        .toLowerCase()
        .includes(pesquisa.toLowerCase());

     const correspondeLocal =
        filtro === "Todos" || alimento.estado === filtro;

      return correspondeNome && correspondeLocal;
    });
  }, [alimentos, pesquisa, filtro]);

  //Falta colocar ele ligado ao botao também
  async function adicionarAlimento() {
  
    try {
      const response = await fetch(`http://localhost:3001/cadastroEstoque`, {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
        //familia_id, {Esse vai vir com o JWT, so vai funcionar com a adição dele}
        //alimento_id, {Esse vou ter que fazer algumas alterações tambem}
          quantidade,
          validade,
          custo_total
        })
      })

      if(response.ok){
        await Swal.fire({
          title:"Tudo certo!",
          text:"Seu alimento foi adicionado ao estoque com sucesso!",
          icon:"success",
          confirmButtonText:"Ok"
        })
      }
    } catch (error) {
      console.log(error)
      await Swal.fire({
          title:"Algo deu errado",
          text:"Infelizmente algo deu errado em nossos servidores, aguarde um momento e tente novamente",
          icon:"error",
          confirmButtonText:"Ok"
        })
    }
  }
  
  async function excluirAlimento(id: any) {

    const resultado = await Swal.fire({
      title: "Excluir Alimento?",
      text: "Essa opção não poderá ser desfeita",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!resultado.isConfirmed) return;

    try {
      const response = await fetch(
        `http://localhost:3001/estoque/${id}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        const erro = await response.text();
        console.error("Erro HTTP:", response.status, erro);
        throw Error("Erro ao excluir alimento");
      }

      setAlimentos((atuais) => atuais.filter((alimento) => alimento.id !== id));

      await Swal.fire({
        title: "Excluído!",
        text: "O alimento foi excluído com sucesso",
        icon: "success",
        confirmButtonText: "Ok",
      });
  }
    catch(error){
      console.error("Erro ao excluir usuário:", error);
      
      await Swal.fire({
        title: "Erro",
        text: "Não foi possível excluir o usuário. Confira se a rota DELETE /estoque/:id existe.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
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
           // onSubmit={adicionarAlimento}
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
                value={custo_total}
                onChange={(e) => setCusto_total(e.target.value)}
                className="rounded-xl border border-gray-200 p-3"
              >
                <option>unidades</option>
                <option>kg</option>
                <option>g</option>
                <option>litros</option>
                <option>pacotes</option>
              </select>

              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
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
                      Quantidade: {alimento.quantidade} ; Valor: R${alimento.custo_total}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-5">
                    <div>
                      <p className="text-xs text-slate-400">Validade</p>

                      <p className="font-semibold text-slate-700 ml-auto">{formatarData(alimento.validade)}</p>
                      <p className="mt-1 text-sm text-slate-500"> {alimento.estado} </p>
                       
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
