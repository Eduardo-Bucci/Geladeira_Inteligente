"use client";
import { useState } from "react";
import { Check, ListChecks, Plus, Trash2, X , ArrowLeft, Leaf } from "lucide-react";
import {useRouter} from "next/navigation";

type ShoppingItem = {
  id: number;
  name: string;
  checked: boolean;
  quantity?: string;
};

const initialShopping: ShoppingItem[] = [
  { id: 1, name: "Arroz", checked: false },
  { id: 2, name: "Azeite de oliva", checked: true },
  { id: 3, name: "Bananas", checked: false },
];

export default function Compras() {
  const [shopping, setShopping] = useState(initialShopping);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const Router = useRouter();

  function deletarItem() {
    const novoShopping = shopping.filter((item) => !item.checked);
    setShopping(novoShopping);
  }

  function toggleShopping(id: number) {
    setShopping((current) =>
      current.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  }

  function addFood(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !quantity.trim()) return;
    setShopping((current) => [
      ...current,
      {
        id: current.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1,
        name: name.trim(),
        quantity: quantity.trim(),
        checked: false,
      },
    ]);
    setName("");
    setQuantity("");
  }
  function paginaDashboard(){
    Router.push("/dashboard");
  }

  const completedShopping = shopping.filter((item) => item.checked).length;

  return (
    <main className="flex flex-col h-screen items-center justify-center bg-linear-to-t from-green-200 to-green-50">
      
      <header className="flex items-center justify-between gap-5">
          <a href="/dashboard" className="inline-flex items-center gap-2 rounded-full border border-[#e2e8df] bg-white px-4 py-2.5 text-sm font-semibold text-[#466052] transition hover:bg-[#f0f5ed]">
            <ArrowLeft size={17} /> Voltar ao início
          </a>
          <div className="flex items-center gap-2 text-sm font-bold tracking-tight text-[#2d6348]"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#dff0df]"><Leaf size={19} /></span><span className="hidden sm:inline">EcoFridge</span></div>
      </header>
      <h1 className="text-2xl font-bold text-slate-900 mt-10"> Lista de Compras </h1>
      <p className="text-slate-500 mb-4"> Organize o que precisa comprar. </p>

            <div className="rounded-2xl border border-slate-100 w-4xl bg-white p-5 shadow-sm md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>

                    <h2 className="text-base font-extrabold text-slate-900">Lista de compras</h2>
                    <p className="mt-1 text-xs text-slate-400">{completedShopping} de {shopping.length} itens concluídos</p>

                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-700"><ListChecks className="h-5 w-5" /></div>
                </div>

                <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${shopping.length ? (completedShopping / shopping.length) * 100 : 0}%` }} />
                </div>
                <div className="space-y-2">
                  {shopping.length === 0 ? (
                    <p className="rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500 text-center">Nenhum item na lista</p>
                  ) : (
                    shopping.map((item) => (
                      <button key={item.id} onClick={() => toggleShopping(item.id)} className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-slate-50">
                        <span className={`flex h-5 w-5 items-center justify-center rounded-md border ${item.checked ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 bg-white text-transparent"}`}>
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span className={`flex-1 text-sm ${item.checked ? "text-slate-400 line-through" : "font-medium text-slate-700"}`}>
                          {item.name}
                          {item.quantity && <span className="ml-2 text-xs text-slate-400">({item.quantity})</span>}
                        </span>
                      </button>
                    ))
                  )}

                  <button onClick={deletarItem} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700">
                    Deletar itens selecionados <Trash2 className="h-3.5 w-3.5" />
                  </button>
                  
                </div>

                <button onClick={() => setShowForm(true)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700">
                  Adicionar item <Plus className="h-3.5 w-3.5" />
                </button>
                
            </div>

            {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowForm(false); }}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-start justify-between">
              <div><h3 className="text-lg font-extrabold text-slate-900"> Adicionar item na lista </h3><p className="mt-1 text-sm text-slate-500">Preencha os dados do item.</p></div>
              <button onClick={() => setShowForm(false)} aria-label="Fechar" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={addFood} className="space-y-4">
              <label className="block"><span className="mb-1.5 block text-sm font-semibold text-slate-700">Nome ou descrição</span><input autoFocus required value={name} onChange={(event) => setName(event.target.value)} placeholder="Ex.: Queijo 300g" className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50" /></label>
              <label className="block"><span className="mb-1.5 block text-sm font-semibold text-slate-700">Quantidade</span><input required value={quantity} onChange={(event) => setQuantity(event.target.value)} placeholder="Ex.: 2" className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50" /></label>
              <p className="rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500"> Os dados inseridos aqui são apenas para fins de demonstração e serão descartados após o fechamento da página. </p>
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50">Cancelar</button>
                <button type="submit" className="flex-1 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700"> Salvar </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}