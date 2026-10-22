'use client';

import { useMemo, useState } from 'react';
import {
  ArrowLeft, Bookmark, Check, ChefHat, Clock3, CookingPot, Search,
  SlidersHorizontal, Sparkles, Utensils, X, Leaf, AlertCircle, Plus,
} from 'lucide-react';

type Ingredient = { name: string; amount: string; available: boolean };
type Recipe = {
  id: number; title: string; category: string; time: number; difficulty: string;
  servings: number; image: string; description: string; availableCount: number;
  ingredients: Ingredient[]; steps: string[]; expiring?: boolean;
};

const initialRecipes: Recipe[] = [
  {
    id: 1, title: 'Omelete colorida', category: 'Rápidas', time: 15, difficulty: 'Fácil', servings: 2,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=85',
    description: 'Uma refeição prática para aproveitar os ovos e os vegetais da geladeira.', availableCount: 5, expiring: true,
    ingredients: [
      { name: 'Ovos', amount: '3 unidades', available: true }, { name: 'Tomate', amount: '1 unidade', available: true },
      { name: 'Queijo', amount: '50 g', available: true }, { name: 'Cebola', amount: '1/2 unidade', available: true },
      { name: 'Cheiro-verde', amount: 'A gosto', available: true },
    ],
    steps: ['Bata os ovos em uma tigela e tempere a gosto.', 'Pique o tomate, a cebola e o cheiro-verde.', 'Misture os ingredientes aos ovos e acrescente o queijo.', 'Despeje em uma frigideira untada e cozinhe em fogo baixo até firmar.'],
  },
  {
    id: 2, title: 'Macarrão ao molho caseiro', category: 'Almoço', time: 25, difficulty: 'Fácil', servings: 3,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=85',
    description: 'Um clássico simples com molho de tomate feito em casa.', availableCount: 4,
    ingredients: [
      { name: 'Macarrão', amount: '250 g', available: true }, { name: 'Tomate', amount: '3 unidades', available: true },
      { name: 'Alho', amount: '2 dentes', available: true }, { name: 'Cebola', amount: '1/2 unidade', available: true },
      { name: 'Manjericão', amount: 'A gosto', available: false },
    ],
    steps: ['Cozinhe o macarrão conforme as instruções da embalagem.', 'Refogue o alho e a cebola picados com um fio de azeite.', 'Adicione os tomates picados e cozinhe até formar um molho.', 'Ajuste o tempero, misture o molho ao macarrão e finalize com manjericão, se tiver.'],
  },
  {
    id: 3, title: 'Salada fresca da estação', category: 'Leves', time: 10, difficulty: 'Muito fácil', servings: 2,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85',
    description: 'Uma combinação leve e crocante para acompanhar suas refeições.', availableCount: 3, expiring: true,
    ingredients: [
      { name: 'Alface', amount: '1/2 pé', available: true }, { name: 'Tomate', amount: '2 unidades', available: true },
      { name: 'Cenoura', amount: '1 unidade', available: true }, { name: 'Limão', amount: '1 unidade', available: false },
    ],
    steps: ['Lave e higienize bem todos os vegetais.', 'Rasgue as folhas de alface e corte o tomate.', 'Rale a cenoura e misture tudo em uma tigela.', 'Tempere a gosto. Se não tiver limão, use o tempero disponível em casa.'],
  },
  {
    id: 4, title: 'Panqueca de banana', category: 'Café da manhã', time: 12, difficulty: 'Fácil', servings: 2,
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=85',
    description: 'Panquecas macias para começar o dia com poucos ingredientes.', availableCount: 3,
    ingredients: [
      { name: 'Banana', amount: '2 unidades', available: true }, { name: 'Ovos', amount: '2 unidades', available: true },
      { name: 'Aveia', amount: '4 colheres', available: false }, { name: 'Canela', amount: 'A gosto', available: true },
    ],
    steps: ['Amasse as bananas com um garfo.', 'Misture com os ovos e a aveia, se disponível.', 'Coloque pequenas porções em uma frigideira antiaderente.', 'Doure dos dois lados e finalize com canela.'],
  },
  {
    id: 5, title: 'Legumes salteados', category: 'Leves', time: 20, difficulty: 'Fácil', servings: 2,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=85',
    description: 'Uma maneira saborosa de aproveitar os legumes que já estão na geladeira.', availableCount: 4,
    ingredients: [
      { name: 'Cenoura', amount: '1 unidade', available: true }, { name: 'Brócolis', amount: '1 xícara', available: true },
      { name: 'Abobrinha', amount: '1 unidade', available: true }, { name: 'Alho', amount: '2 dentes', available: true },
      { name: 'Shoyu', amount: '1 colher', available: false },
    ],
    steps: ['Lave os legumes e corte em pedaços semelhantes.', 'Aqueça uma frigideira com um pouco de óleo ou azeite.', 'Refogue o alho e adicione os legumes mais firmes primeiro.', 'Salteie até ficarem macios, mas ainda crocantes, e tempere a gosto.'],
  },
  {
    id: 6, title: 'Vitamina de banana', category: 'Café da manhã', time: 5, difficulty: 'Muito fácil', servings: 1,
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=900&q=85',
    description: 'Uma bebida rápida para aproveitar bananas maduras.', availableCount: 2, expiring: true,
    ingredients: [
      { name: 'Banana', amount: '1 unidade', available: true }, { name: 'Leite', amount: '200 ml', available: true },
      { name: 'Aveia', amount: '1 colher', available: false },
    ],
    steps: ['Descasque a banana e corte em rodelas.', 'Coloque a banana e o leite no liquidificador.', 'Bata até ficar cremoso. Acrescente aveia se tiver disponível.'],
  },
];

const categories = ['Todas', 'Rápidas', 'Almoço', 'Leves', 'Café da manhã'];

export default function ReceitasPage() {
  const [recipes] = useState(initialRecipes);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [selected, setSelected] = useState<Recipe | null>(null);
  const [saved, setSaved] = useState<number[]>([]);
  const [prepared, setPrepared] = useState<number[]>([]);
  const [showPreparedMessage, setShowPreparedMessage] = useState(false);

  const filtered = useMemo(() => recipes.filter((recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(search.toLowerCase()) || recipe.ingredients.some((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = category === 'Todas' || recipe.category === category;
    const matchesAvailable = !onlyAvailable || recipe.ingredients.every((item) => item.available);
    return matchesSearch && matchesCategory && matchesAvailable;
  }), [recipes, search, category, onlyAvailable]);

  const toggleSaved = (id: number) => setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  return (
    <main className="min-h-screen bg-linear-to-t from-green-200 to-green-50 text-[#20352b]">
      <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between gap-4">
          <a href="/dashboard" className="inline-flex items-center gap-2 rounded-full border border-[#e2e8df] bg-white px-4 py-2.5 text-sm font-semibold text-[#466052] transition hover:bg-[#f0f5ed]">
            <ArrowLeft size={17} /> Voltar ao início
          </a>
          <div className="flex items-center gap-2 text-sm font-bold tracking-tight text-[#2d6348]"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#dff0df]"><Leaf size={19} /></span><span className="hidden sm:inline">EcoFridge</span></div>
        </header>

        <section className="relative mt-8 overflow-hidden rounded-4xl bg-emerald-800 px-6 py-8 text-white sm:px-10 sm:py-11">
          <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border-35 border-white/5" />
          <div className="pointer-events-none absolute -bottom-24 right-40 h-52 w-52 rounded-full bg-[#8dc89a]/10 blur-2xl" />
          <div className="relative max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-[#d9f0dc]"><Sparkles size={14} /> IDEIAS COM O QUE VOCÊ JÁ TEM</div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Sua próxima refeição começa na geladeira.</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/75 sm:text-base">Encontre receitas práticas usando os ingredientes disponíveis em casa e dê prioridade aos alimentos que estão perto de vencer.</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2"><CookingPot size={16} /> {recipes.length} ideias para experimentar</span>
              <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2"><Leaf size={16} /> Menos desperdício</span>
            </div>
          </div>
          <div className="absolute bottom-5 right-7 hidden rotate-6 items-center justify-center rounded-3xl border border-white/15 bg-white/10 p-5 sm:flex"><ChefHat size={76} strokeWidth={1.2} className="text-[#c7e8c9]" /></div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#e7ebe3] bg-white p-5"><div className="flex items-center justify-between"><span className="text-sm text-[#718076]">Receitas disponíveis</span><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#e8f4e7] text-[#36734b]"><Utensils size={18} /></span></div><p className="mt-3 text-3xl font-bold">{recipes.length.toString().padStart(2, '0')}</p><p className="mt-1 text-xs text-[#78877d]">Sugestões para sua despensa</p></div>
          <div className="rounded-2xl border border-[#e7ebe3] bg-white p-5"><div className="flex items-center justify-between"><span className="text-sm text-[#718076]">Para fazer agora</span><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#fff0d8] text-[#a56b1d]"><Clock3 size={18} /></span></div><p className="mt-3 text-3xl font-bold">{recipes.filter((r) => r.time <= 15).length.toString().padStart(2, '0')}</p><p className="mt-1 text-xs text-[#78877d]">Prontas em até 15 minutos</p></div>
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

          {recipes.some((recipe) => recipe.expiring) && <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#f0dfb8] bg-[#fff8e9] p-4"><span className="mt-0.5 text-[#b27a24]"><AlertCircle size={19} /></span><div><p className="text-sm font-bold text-[#76531e]">Aproveite antes que vençam</p><p className="mt-1 text-sm leading-5 text-[#8b7043]">Algumas sugestões usam alimentos que podem estar perto da validade. Confira seu estoque para escolher o que preparar primeiro.</p></div></div>}

          {filtered.length > 0 ? <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((recipe) => {
            const available = recipe.ingredients.filter((item) => item.available).length;
            const missing = recipe.ingredients.length - available;
            const isSaved = saved.includes(recipe.id);
            return <article key={recipe.id} className="group overflow-hidden rounded-3xl border border-[#e5eae2] bg-white transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#254c32]/[0.07]">
              <div className="relative h-48 overflow-hidden bg-[#e8eee5]"><img src={recipe.image} alt={recipe.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#315e40] shadow-sm">{recipe.category}</div><button aria-label={isSaved ? 'Remover dos favoritos' : 'Salvar receita'} onClick={() => toggleSaved(recipe.id)} className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full shadow-sm backdrop-blur transition ${isSaved ? 'bg-[#285c40] text-white' : 'bg-white/95 text-[#476052] hover:bg-white'}`}><Bookmark size={17} fill={isSaved ? 'currentColor' : 'none'} /></button>{recipe.expiring && <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-[#fff3d7] px-3 py-1.5 text-xs font-bold text-[#95631d]"><Leaf size={13} /> Ajuda a evitar desperdício</div>}</div>
              <div className="p-5"><div className="flex items-start justify-between gap-3"><h3 className="text-lg font-bold tracking-tight">{recipe.title}</h3><span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-[#7b887e]"><Clock3 size={14} /> {recipe.time} min</span></div><p className="mt-2 min-h-10 text-sm leading-5 text-[#758177]">{recipe.description}</p><div className="mt-4 flex flex-wrap items-center gap-2 text-xs"><span className="rounded-lg bg-[#edf6eb] px-2.5 py-1.5 font-semibold text-[#39764b]">{available} ingredientes em casa</span>{missing > 0 ? <span className="rounded-lg bg-[#fff3df] px-2.5 py-1.5 font-semibold text-[#a16c24]">Faltam {missing}</span> : <span className="rounded-lg bg-[#edf6eb] px-2.5 py-1.5 font-semibold text-[#39764b]">Tudo disponível</span>}</div><div className="mt-4 flex items-center justify-between border-t border-[#edf0eb] pt-4"><span className="text-xs text-[#78877d]">{recipe.difficulty} <span className="mx-1.5">·</span> {recipe.servings} porções</span><button onClick={() => { setSelected(recipe); setShowPreparedMessage(false); }} className="inline-flex items-center gap-2 rounded-xl bg-[#285c40] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1f4932]">Ver receita <span aria-hidden="true">→</span></button></div></div>
            </article>;
          })}</div> : <div className="mt-6 rounded-3xl border border-dashed border-[#d6dfd4] bg-white px-6 py-14 text-center"><Search size={28} className="mx-auto text-[#92a092]" /><h3 className="mt-3 font-bold">Nenhuma receita encontrada</h3><p className="mt-1 text-sm text-[#78877d]">Tente mudar a busca ou escolher outra categoria.</p><button onClick={() => { setSearch(''); setCategory('Todas'); setOnlyAvailable(false); }} className="mt-4 rounded-xl bg-[#285c40] px-4 py-2.5 text-sm font-semibold text-white">Limpar filtros</button></div>}
        </section>

        <footer className="mt-12 border-t border-[#e4e9e1] py-6 text-center text-xs text-[#8a968c]">EcoFridge <span className="mx-1.5">·</span> Organize. Aproveite. Não desperdice.</footer>
      </div>

      {selected && <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#10251a]/55 p-0 backdrop-blur-sm sm:items-center sm:p-5" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelected(null); }}><section role="dialog" aria-modal="true" aria-label={`Receita ${selected.title}`} className="max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-t-4xl bg-[#fbfcf9] shadow-2xl sm:rounded-4xl">
        <div className="relative h-52 sm:h-64"><img src={selected.image} alt={selected.title} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/10" /><button onClick={() => setSelected(null)} aria-label="Fechar" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-[#304638] shadow"><X size={19} /></button><div className="absolute bottom-5 left-6 right-6 text-white"><span className="rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold backdrop-blur">{selected.category}</span><h2 className="mt-3 text-2xl font-bold sm:text-3xl">{selected.title}</h2><div className="mt-2 flex flex-wrap gap-4 text-sm text-white/90"><span className="flex items-center gap-1.5"><Clock3 size={15} /> {selected.time} min</span><span className="flex items-center gap-1.5"><ChefHat size={16} /> {selected.difficulty}</span><span className="flex items-center gap-1.5"><Utensils size={15} /> {selected.servings} porções</span></div></div></div>
        <div className="grid gap-8 p-6 sm:grid-cols-[0.85fr_1.15fr] sm:p-8"><div><h3 className="text-lg font-bold">Ingredientes</h3><p className="mt-1 text-sm text-[#78877d]">Confira o que já tem em casa.</p><ul className="mt-4 space-y-3">{selected.ingredients.map((ingredient) => <li key={ingredient.name} className="flex items-start gap-3 text-sm"><span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${ingredient.available ? 'bg-[#e3f2e2] text-[#347448]' : 'bg-[#fff0d8] text-[#a56b1d]'}`}>{ingredient.available ? <Check size={13} /> : <Plus size={13} />}</span><span className="min-w-0 flex-1"><span className="font-semibold">{ingredient.name}</span><span className="block text-xs text-[#879187]">{ingredient.amount}</span></span><span className={`text-[11px] font-semibold ${ingredient.available ? 'text-[#438153]' : 'text-[#a56b1d]'}`}>{ingredient.available ? 'Tenho' : 'Falta'}</span></li>)}</ul><div className="mt-5 rounded-2xl bg-[#edf5e9] p-4"><p className="text-sm font-bold text-[#356546]">Dica Geladeira Viva</p><p className="mt-1 text-xs leading-5 text-[#5d7b63]">Se algum ingrediente estiver faltando, você pode adaptar a receita com o que já tem disponível.</p></div></div><div><h3 className="text-lg font-bold">Modo de preparo</h3><ol className="mt-4 space-y-4">{selected.steps.map((step, index) => <li key={step} className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#dfeede] text-xs font-bold text-[#326644]">{index + 1}</span><p className="pt-1 text-sm leading-6 text-[#58685d]">{step}</p></li>)}</ol><button onClick={() => { setPrepared((current) => current.includes(selected.id) ? current : [...current, selected.id]); setShowPreparedMessage(true); }} className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#285c40] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#1f4932]"><Check size={17} /> Já preparei essa receita</button>{showPreparedMessage && <p className="mt-3 rounded-xl bg-[#e8f5e6] p-3 text-sm font-medium text-[#347448]">Receita marcada como preparada! Na versão conectada à API, você poderá registrar o consumo dos ingredientes no estoque.</p>}</div></div>
      </section></div>}
    </main>
  );
}