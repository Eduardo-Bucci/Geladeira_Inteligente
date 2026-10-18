"use client"


import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  CookingPot,
  LayoutDashboard,
  Leaf,
  ListChecks,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  ShoppingBasket,
  Sparkles,
  TrendingDown,
  TriangleAlert,
  Utensils,
  X,
  Refrigerator,
  Carrot,
  Apple,
  Milk,
  Egg,
} from "lucide-react";



type Food = { id: number; name: string; quantity: string; expiryDays: number; icon: "apple" | "milk" | "carrot" };


const initialFoods: Food[] = [
   { id: 1, name: "Leite", quantity: "1 litro", expiryDays: 2, icon: "milk", },
   { id: 2, name: "Cenoura", quantity: "500 gramas", expiryDays: 5, icon: "carrot" },
   { id: 3, name: "Maçã", quantity: "6 unidades", expiryDays: 1, icon: "apple" },
   { id: 4, name: "Ovos", quantity: "12 unidades", expiryDays: 7, icon: "milk" },
];

function FoodIcon({ kind }: { kind: Food["icon"] }) {
  const className = "h-5 w-5";
  if (kind === "milk") return <Milk className={className} />;
  if (kind === "carrot") return <Carrot className={className} />;
  return <Apple className={className} />;
}

function expiryText(days: number) {
  if (days === 0) return "Vence hoje";
  if (days === 1) return "Vence amanhã";
  return `Vence em ${days} dias`;
}

export default function DashboardPage() {
  const [foods, setFoods] = useState(initialFoods);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const Router = useRouter();

  const visibleFoods = useMemo(
    () => foods.filter((food) => food.name.toLowerCase().includes(search.toLowerCase())),
    [foods, search]
  );

  function addFood(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !quantity.trim()) return;
    setFoods((current) => [...current, {
      id: Date.now(), name: name.trim(), quantity: quantity.trim(), expiryDays: 7, icon: "apple",
    }]);
    setName("");
    setQuantity("");
    setShowForm(false);
  }

  function paginaInicial() {
    Router.push("/");
  }

  return (
    <main className="min-h-screen bg-linear-to-t from-green-200 to-green-50 px-4 py-6 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700"><Refrigerator className="h-6 w-6" /></div>
            <div>
              <h1 onClick={paginaInicial} className="text-lg font-extrabold tracking-tight text-slate-900">Eco<span className="text-emerald-600">Fridge</span></h1>
              <p className="text-xs text-slate-400">Organize, aproveite, não desperdice.</p>
            </div>
          </div>
          <button aria-label="Notificações" className="relative rounded-xl border border-slate-100 p-2.5 text-slate-500 hover:bg-slate-50">
            <Bell className="h-5 w-5" /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
          </button>
        </header>

        <section className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-700"><CalendarDays className="h-4 w-4" /> Seu resumo de hoje</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Olá {/*Aqui pode colocar o nome do usuário */}! Como está sua cozinha? </h2>
            <p className="mt-2 text-sm text-slate-500">Confira seus alimentos e evite que algo se perca.</p>
          </div>
          <button onClick={() => setShowForm(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">
            <Plus className="h-4 w-4" /> Adicionar alimento
          </button>
        </section>

        <section className="mb-6 grid gap-4 w-3xl sm:grid-cols-3">
          <SummaryCard title="Alimentos cadastrados" value={String(foods.length)} note="No seu estoque" icon={<Refrigerator className="h-5 w-5" />} color="emerald" />
          <SummaryCard title="Vencem em breve" value={String(foods.filter((food) => food.expiryDays <= 3).length)} note="Nos próximos 3 dias" icon={<Clock3 className="h-5 w-5" />} color="amber" />
          <SummaryCard title="Lista de compras" value="3" note="Itens para comprar" icon={<ShoppingBasket className="h-5 w-5" />} color="sky" />
          <SummaryCard title="Receitas sugeridas" value="5" note="Com base nos alimentos" icon={<CookingPot className="h-5 w-5" />} color="emerald" />
        </section>

        {/*div de alerta de alimentos próximos do vencimento, essa div pode ser colocada somente quando houver alimentos próximos do vencimento */}
        <section className="mb-6 rounded-2xl border mt-6 border-amber-100 bg-amber-50 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-amber-700"><TriangleAlert className="h-5 w-5" /></div>
            <div>
              <h3 className="font-bold text-amber-900">Fique de olho na validade</h3>
              <p className="mt-1 text-sm leading-5 text-amber-800">Alguns alimentos estão perto de vencer. Considere usá-los nas próximas refeições.</p>
            </div>
          </div>
        </section>

        {/*Seção onde ficam os alimentos pode adicionar um botão de excluir para quando forem consumidos*/}
        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Alimentos próximos do vencimento</h3>
              <p className="mt-1 text-sm text-slate-400">Priorize estes itens para reduzir o desperdício.</p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 sm:w-56">
              <Search className="h-4 w-4 shrink-0 text-slate-400" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar alimento" className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400" />
              {search && <button onClick={() => setSearch("")} aria-label="Limpar busca"><X className="h-4 w-4 text-slate-400" /></button>}
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {visibleFoods.length === 0 ? <p className="py-8 text-center text-sm text-slate-400">Nenhum alimento encontrado.</p> : visibleFoods.map((food) => (
              <div key={food.id} className="flex items-center gap-3 py-4">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${food.expiryDays <= 2 ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}><FoodIcon kind={food.icon} /></div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-800">{food.name}</p>
                  <p className="mt-1 text-xs text-slate-400">{food.quantity}</p>
                </div>
                <span className={`shrink-0 rounded-lg px-2.5 py-1.5 text-[11px] font-bold sm:text-xs ${food.expiryDays <= 2 ? "bg-amber-50 text-amber-800" : "bg-slate-100 text-slate-600"}`}>{expiryText(food.expiryDays)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <QuickAction onClick={() => setShowForm(true)} icon={<Plus className="h-5 w-5" />} title="Cadastrar alimento" description="Atualize o que tem na sua cozinha." />
          <QuickAction onClick={() => Router.push("/receitas")} icon={<CookingPot className="h-5 w-5" />} title="Descobrir receitas" description="Inspire-se com seus ingredientes." />
        </section>

        <footer className="py-6 text-center text-xs text-slate-400">EcoFridge · Protótipo </footer>
      </div>

          {/* Caixinha de formulário para adicionar alimento, aqui é onde manda os alimentos */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowForm(false); }}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-start justify-between">
              <div><h3 className="text-lg font-extrabold text-slate-900">Adicionar alimento</h3><p className="mt-1 text-sm text-slate-500">Preencha os dados do alimento.</p></div>
              <button onClick={() => setShowForm(false)} aria-label="Fechar" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={addFood} className="space-y-4">
              <label className="block"><span className="mb-1.5 block text-sm font-semibold text-slate-700">Nome</span><input autoFocus required value={name} onChange={(event) => setName(event.target.value)} placeholder="Ex.: Queijo" className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50" /></label>
              <label className="block"><span className="mb-1.5 block text-sm font-semibold text-slate-700">Quantidade</span><input required value={quantity} onChange={(event) => setQuantity(event.target.value)} placeholder="Ex.: 300 gramas" className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50" /></label>
              <p className="rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500">Este protótipo usa dados de exemplo.</p>
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50">Cancelar</button>
                <button type="submit" className="flex-1 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

function QuickAction({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:border-emerald-200 hover:shadow-md">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-extrabold text-slate-800">{title}</p>
        <p className="mt-1 text-xs text-slate-400">{description}</p>
      </div>
      <Plus className="h-4 w-4 text-slate-300 transition group-hover:text-emerald-600" />
    </button>
  );
}

function SummaryCard({ title, value, note, icon, color }: { title: string; value: string; note: string; icon: React.ReactNode; color: "emerald" | "amber" | "sky" }) {
  const colorClasses = {
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    sky: "bg-sky-50 text-sky-700",
  };
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-500">{title}</p>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorClasses[color]}`}>{icon}</div>
      </div>
      <p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{note}</p>
    </div>
  );
}


