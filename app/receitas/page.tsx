'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import {
  Bookmark, Check, ChefHat, Clock3, CookingPot, Search,
  SlidersHorizontal, Sparkles, Utensils, X, AlertCircle, Plus,
  Bell, Leaf
} from 'lucide-react';

// Ajustamos o tipo da receita para refletir as propriedades extras que seu SQL retorna
type Recipe = {
  id: number;
  title: string;
  category: string;
  time: number; // Caso o banco não traga, definimos um padrão no mapeamento
  difficulty: string;
  servings: number;
  image: string;
  description: string;
  availableCount: number; // Agora mapeado com "ingredientes_que_eu_tenho"
  totalIngredients: number; // Mapeado com "total_ingredientes_necessarios"
  ingredients: { name: string; amount: string; available: boolean }[]; // Virá vazio ou tratado se houver outra rota
  steps: string[]; // Mapeado a partir de "receita_preparo"
  expiring?: boolean;
};

const categories = ['Todas', 'Rápidas', 'Almoço', 'Leves', 'Café da manhã'];

export default function ReceitasPage() {
  const [receita, setReceita] = useState<Recipe[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [selected, setSelected] = useState<Recipe | null>(null);
  const [saved, setSaved] = useState<number[]>([]);
  const [prepared, setPrepared] = useState<number[]>([]);
  const [showPreparedMessage, setShowPreparedMessage] = useState(false);

  const Router = useRouter();
  function paginaInicial() {
    Router.push("/");
  }

  function notification(){
    alert("Sem notificações no momento. Este é um protótipo.");
  }

  async function verReceitas(){
    const token = localStorage.getItem("token")

    if (!token) {
      console.error("Token não encontrado!");
      Router.push("/login")
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/receitas", {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar receitas");
      }

      const data = await response.json();
      const backendRows = Array.isArray(data) ? data : data.data ?? [];

      // 🔄 CONVERSÃO: Transforma o formato da sua Query SQL para o formato do Frontend
      const receitasFormatadas: Recipe[] = backendRows.map((row: any) => {
        // Trata as instruções do preparo caso venham como string ou JSON stringificado
        let passos: string[] = [];
        try {
          passos = typeof row.receita_preparo === 'string' && row.receita_preparo.startsWith('[')
            ? JSON.parse(row.receita_preparo)
            : row.receita_preparo?.split('\n') || [];
        } catch {
          passos = [row.receita_preparo];
        }

        return {
          id: row.receita_id,
          title: row.receita_titulo,
          description: row.receita_descricao,
          difficulty: row.receita_dificuldade || 'Fácil',
          category: row.receita_tipo || 'Geral',
          steps: passos,
          availableCount: row.ingredientes_que_eu_tenho ?? 0,
          totalIngredients: row.total_ingredientes_necessarios ?? 0,
          time: row.tempo_preparo || 20, // Padrão caso não exista na query
          servings: row.porcoes || 2, // Padrão caso não exista na query
          image: row.imagem_url || 'https://unsplash.com', // Imagem padrão de comida
          ingredients: [] // Como a query atual agrupa os ingredientes em contadores, a lista detalhada inicia vazia
        };
      });

      setReceita(receitasFormatadas);
    } catch (error) {
      console.error("Erro ao carregar receitas do backend:", error);
    }
  }

  useEffect(() => {
    verReceitas();
  }, []);

  // 🔄 Filtros adaptados para usar os dados vindos da Query SQL
  const filtered = useMemo(() => {
    return receita.filter((recipe) => {
      // Busca pelo título ou pela descrição
      const matchesSearch = recipe.title.toLowerCase().includes(search.toLowerCase()) || 
                            recipe.description.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory = category === 'Todas' || recipe.category.toLowerCase() === category.toLowerCase();
      
      // Se "onlyAvailable" estiver ativo, só mostra se você tiver todos os ingredientes necessários
      const matchesAvailable = !onlyAvailable || recipe.availableCount === recipe.totalIngredients;
      
      return matchesSearch && matchesCategory && matchesAvailable;
    });
  }, [receita, search, category, onlyAvailable]);

  const toggleSaved = (id: number) => setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  return (
     <main className="min-h-screen bg-linear-to-t from-green-200 to-green-50 text-[#20352b]">
      <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10">
        <header className="mb-8 flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700"><Leaf size={19}/></div>
              <div>
                <h1 onClick={paginaInicial} className="text-lg font-extrabold tracking-tight text-slate-900 cursor-pointer">Eco<span className="text-emerald-600">Fridge</span></h1>
                <p className="text-xs text-slate-400">Organize, aproveite, não desperdice.</p>
              </div>
            </div>
              <div className="gap-1 flex">
                  <a href="/estoque" className="rounded-xl text-sm px-4 py-2 font-semibold text-slate-600 hover:bg-emerald-50"> Meu estoque </a>
                  <a href="/dashboard" className="rounded-xl text-sm px-4 py-2 font-semibold text-slate-600 hover:bg-emerald-50"> Dashboard </a>
                  <a href="/compras" className="rounded-xl text-sm px-4 py-2 font-semibold text-slate-600 hover:bg-emerald-50"> Lista de compras </a>
              </div>
            <button aria-label="Notificações" onClick={notification} className="relative rounded-xl border border-slate-100 p-2.5 text-slate-500 hover:bg-slate-50">
              <Bell className="h-5 w-5" /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
            </button>
        </header>

        <section className="relative mt-8 overflow-hidden rounded-4xl bg-emerald-800 px-6 py-8 text-white sm:px-10 sm:py-11">
          <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border-35 border-white/5" />
          <div className="pointer-events-none absolute -bottom-24 right-40 h-52 w-52 rounded-full bg-[#8dc89a]/10 blur-2xl" />
          <div className="relative max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-[#d9f0dc]"><Sparkles size={14} /> IDEIAS COM O QUE VOCÊ JÁ TEM</div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Sua próxima refeição começa na geladeira.</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/75 sm:text-base">Encontre receitas práticas usando os ingredientes disponíveis em casa e dê prioridade aos alimentos que estão perto de vencer.</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2"><CookingPot size={16} /> {receita.length} ideias para experimentar</span>
              <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2"><Leaf size={16} /> Menos desperdício</span>
            </div>
          </div>
          <div className="absolute bottom-5 right-7 hidden rotate-6 items-center justify-center rounded-3xl border border-white/15 bg-white/10 p-5 sm:flex"><ChefHat size={76} strokeWidth={1.2} className="text-[#c7e8c9]" /></div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#e7ebe3] bg-white p-5"><div className="flex items-center justify-between"><span className="text-sm text-[#718076]">Receitas disponíveis</span><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#e8f4e7] text-[#36734b]"><Utensils size={18} /></span></div><p className="mt-3 text-3xl font-bold">{receita.length.toString().padStart(2, '0')}</p><p className="mt-1 text-xs text-[#78877d]">Sugestões para sua despensa</p></div>
          <div className="rounded-2xl border border-[#e7ebe3] bg-white p-5"><div className="flex items-center justify-between"><span className="text-sm text-[#718076]">Para fazer agora</span><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#fff0d8] text-[#a56b1d]"><Clock3 size={18} /></span></div><p className="mt-3 text-3xl font-bold">{1}</p><p className="mt-1 text-xs text-[#78877d]">Com sua despensa</p></div>
          <div className="rounded-2xl border border-[#e7ebe3] bg-white p-5"><div className="flex items-center justify-between"><span className="text-sm text-[#718076]">Salvas por você</span><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#f1eafa] text-[#7956a5]"><Bookmark size={18} /></span></div><p className="mt-3 text-3xl font-bold">{saved.length.toString().padStart(2, '0')}</p><p className="mt-1 text-xs text-[#78877d]">Suas receitas favoritas</p></div>
        </section>

        <section className="mt-9">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4b8a5b]">Inspire-se</p><h2 className="mt-1 text-2xl font-bold tracking-tight">Receitas para você</h2><p className="mt-1 text-sm text-[#78877d]">Escolha uma opção e confira o que vai precisar.</p></div>
            <label className="relative block w-full sm:max-w-xs"><Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#87958a]" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar receita ou ingrediente..." className="w-full rounded-xl border border-[#e0e7dd] bg-white py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#a0aaa2] focus:border-[#4b8a5b] focus:ring-4 focus:ring-[#4b8a5b]/10" /></label>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${category === item ? 'bg-[#285c40] text-white shadow-sm' : 'border border-[#e1e8de] bg-white text-[#637469] hover:border-[#b6cdb7]'}`}>{item}</button>)}</div>
            <button onClick={() => setOnlyAvailable((v) => !v)} className={`inline-flex w-fit items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-semibold transition ${onlyAvailable ? 'border-[#438657] bg-[#e7f4e7] text-[#2c7144]' : 'border-[#e1e8de] bg-white text-[#637469]'}`}><SlidersHorizontal size={16} /> Só com tudo disponível <span className={`h-4 w-7 rounded-full p-0.5 ${onlyAvailable ? 'bg-[#438657]' : 'bg-[#cbd4ca]'}`}><span className={`block h-3 w-3 rounded-full bg-white transition-transform ${onlyAvailable ? 'translate-x-3' : ''}`} /></span></button>
          </div>

          {receita.some((recipe) => recipe.expiring) && <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#f0dfb8] bg-[#fff8e9] p-4"><span className="mt-0.5 text-[#b27a24]"><AlertCircle size={19} /></span><div><p className="text-sm font-bold text-[#76531e]">Aproveite antes que vençam</p><p className="mt-1 text-sm leading-5 text-[#8b7043]">Algumas sugestões usam alimentos que podem estar perto da validade. Confira seu estoque para escolher o que preparar primeiro.</p></div></div>}

          {filtered.length > 0 ? <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((recipe) => {
            const available = recipe.availableCount;
            const missing = recipe.totalIngredients - available;
            const isSaved = saved.includes(recipe.id);
            return <article key={recipe.id} className="group overflow-hidden rounded-3xl border border-[#e5eae2] bg-white transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#254c32]/[0.07]">
              <div className="relative h-48 overflow-hidden bg-[#e8eee5]"><img src={recipe.image} alt={recipe.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#315e40] shadow-sm">{recipe.category}</div><button aria-label={isSaved ? 'Remover dos favoritos' : 'Salvar receita'} onClick={() => toggleSaved(recipe.id)} className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full shadow-sm backdrop-blur transition ${isSaved ? 'bg-[#285c40] text-white' : 'bg-white/95 text-[#476052] hover:bg-white'}`}><Bookmark size={17} fill={isSaved ? 'currentColor' : 'none'} /></button>{recipe.expiring && <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-[#fff3d7] px-3 py-1.5 text-xs font-bold text-[#95631d]"><Leaf size={13} /> Ajuda a evitar desperdício</div>}</div>
              <div className="p-5"><div className="flex items-start justify-between gap-3"><h3 className="text-lg font-bold tracking-tight">{recipe.title}</h3><span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-[#7b887e]"><Clock3 size={14} /> {recipe.time} min</span></div><p className="mt-2 min-h-10 text-sm leading-5 text-[#758177]">{recipe.description}</p><div className="mt-4 flex flex-wrap items-center gap-2 text-xs"><span className="rounded-lg bg-[#edf6eb] px-2.5 py-1.5 font-semibold text-[#39764b]">{available} ingredientes em casa</span>{missing > 0 ? <span className="rounded-lg bg-[#fff3df] px-2.5 py-1.5 font-semibold text-[#a16c24]">Faltam {missing}</span> : <span className="rounded-lg bg-[#edf6eb] px-2.5 py-1.5 font-semibold text-[#39764b]">Tudo disponível</span>}</div><div className="mt-4 flex items-center justify-between border-t border-[#edf0eb] pt-4"><span className="text-xs text-[#78877d]">{recipe.difficulty} <span className="mx-1.5">·</span> {recipe.servings} porções</span><button onClick={() => { setSelected(recipe); setShowPreparedMessage(false); }} className="inline-flex items-center gap-2 rounded-xl bg-[#285c40] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1f4932]">Ver receita <span aria-hidden="true">→</span></button></div></div>
            </article>;
          })}</div> : <div className="mt-6 rounded-3xl border border-dashed border-[#d6dfd4] bg-green-50 px-6 py-14 text-center"><Search size={28} className="mx-auto text-[#92a092]" /><h3 className="mt-3 font-bold">Nenhuma receita encontrada</h3><p className="mt-1 text-sm text-[#78877d]">Tente mudar a busca ou escolher outra categoria.</p><button onClick={() => { setSearch(''); setCategory('Todas'); setOnlyAvailable(false); }} className="mt-4 rounded-xl bg-[#285c40] px-4 py-2.5 text-sm font-semibold text-white">Limpar filtros</button></div>}
        </section>

        <footer className="mt-12 border-t border-[#e4e9e1] py-6 text-center text-xs text-[#8a968c]">EcoFridge <span className="mx-1.5">·</span> Organize. Aproveite. Não desperdice.</footer>
      </div>

          {/**/}
      {selected && <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#10251a]/55 p-0 backdrop-blur-sm sm:items-center sm:p-5" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelected(null); }}><section role="dialog" aria-modal="true" aria-label={`Receita ${selected.title}`} className="max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-t-4xl bg-[#fbfcf9] shadow-2xl sm:rounded-4xl">
        <div className="relative h-52 sm:h-64"><img src={selected.image} alt={selected.title} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/10" /><button onClick={() => setSelected(null)} aria-label="Fechar" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-[#304638] shadow"><X size={19} /></button><div className="absolute bottom-5 left-6 right-6 text-white"><span className="rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold backdrop-blur">{selected.category}</span><h2 className="mt-3 text-2xl font-bold sm:text-3xl">{selected.title}</h2><div className="mt-2 flex flex-wrap gap-4 text-sm text-white/90"><span className="flex items-center gap-1.5"><Clock3 size={15} /> {selected.time} min</span><span className="flex items-center gap-1.5"><ChefHat size={16} /> {selected.difficulty}</span><span className="flex items-center gap-1.5"><Utensils size={15} /> {selected.servings} porções</span></div></div></div>
        <div className="grid gap-8 p-6 sm:grid-cols-[0.85fr_1.15fr] sm:p-8"><div><h3 className="text-lg font-bold">Ingredientes</h3><p className="mt-1 text-sm text-[#78877d]">Confira o que já tem em casa.</p><ul className="mt-4 space-y-3">{selected.ingredients.map((ingredient) => <li key={ingredient.name} className="flex items-start gap-3 text-sm"><span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${ingredient.available ? 'bg-[#e3f2e2] text-[#347448]' : 'bg-[#fff0d8] text-[#a56b1d]'}`}>{ingredient.available ? <Check size={13} /> : <Plus size={13} />}</span><span className="min-w-0 flex-1"><span className="font-semibold">{ingredient.name}</span><span className="block text-xs text-[#879187]">{ingredient.amount}</span></span><span className={`text-[11px] font-semibold ${ingredient.available ? 'text-[#438153]' : 'text-[#a56b1d]'}`}>{ingredient.available ? 'Tenho' : 'Falta'}</span></li>)}</ul><div className="mt-5 rounded-2xl bg-[#edf5e9] p-4"><p className="text-sm font-bold text-[#356546]">Dica Geladeira Viva</p><p className="mt-1 text-xs leading-5 text-[#5d7b63]">Se algum ingrediente estiver faltando, você pode adaptar a receita com o que já tem disponível.</p></div></div><div><h3 className="text-lg font-bold">Modo de preparo</h3><ol className="mt-4 space-y-4">{selected.steps.map((step, index) => <li key={step} className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#dfeede] text-xs font-bold text-[#326644]">{index + 1}</span><p className="pt-1 text-sm leading-6 text-[#58685d]">{step}</p></li>)}</ol><button onClick={() => { setPrepared((current) => current.includes(selected.id) ? current : [...current, selected.id]); setShowPreparedMessage(true); }} className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#285c40] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#1f4932]"><Check size={17} /> Já preparei essa receita</button>{showPreparedMessage && <p className="mt-3 rounded-xl bg-[#e8f5e6] p-3 text-sm font-medium text-[#347448]"> Quando apertar esse botão os ingredientes da receitas vão ser apagados da geladeira virtual </p>}</div></div>
      </section></div>}
    </main>
  );
}
