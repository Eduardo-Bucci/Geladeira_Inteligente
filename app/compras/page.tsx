"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import{ Check, ListChecks, Plus , Trash2} from "lucide-react";

const initialShopping = [
  { id: 1, name: "Arroz", checked: false },
  { id: 2, name: "Azeite de oliva", checked: true },
  { id: 3, name: "Bananas", checked: false },
];

export default function Compras() {
  const [shopping, setShopping] = useState(initialShopping);
  

  function adicionarItem() {
    const itemName = prompt("Digite o nome do item:");
    if (!itemName) return;

    const novoItem = {
      id: shopping.length + 1,
      name: itemName,
      checked: false,
    };
    setShopping([...shopping, novoItem]);
  }
  function deletarItem() {
    const novoShopping = shopping.filter((item) => !item.checked);
    setShopping(novoShopping);
  }

  function toggleShopping(id: number) {
    setShopping((current) =>
      current.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  }
  const completedShopping = shopping.filter((item) => item.checked).length;

  return (
    <main className="flex flex-col h-screen items-center justify-center bg-linear-to-t from-green-200 to-green-50">
      <h1 className="text-2xl font-bold text-slate-900"> Lista de Compras </h1>
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
                  {shopping.map((item) => (
                    <button key={item.id} onClick={() => toggleShopping(item.id)} className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-slate-50">
                      <span className={`flex h-5 w-5 items-center justify-center rounded-md border ${item.checked ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 bg-white text-transparent"}`}>
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className={`flex-1 text-sm ${item.checked ? "text-slate-400 line-through" : "font-medium text-slate-700"}`}>{item.name}</span>
                    </button>
                    
                  ))}

                  <button onClick={deletarItem} className="mt-4 flex w-full items-center justify-center gap-2 text-red-500 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700">
                    Deletar itens <Trash2 className="h-3.5 w-3.5" />
                  </button>
                  
                </div>

                <button onClick={adicionarItem} className="mt-4 flex w-full items-center justify-center gap-2 text-emerald-500 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700">
                  Adicionar item <Plus className="h-3.5 w-3.5" />
                </button>
                
            </div>
    </main>
  );
}