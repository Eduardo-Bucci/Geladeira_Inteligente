"use client"

import Link from "next/link";
import { useRouter } from "next/navigation"
import Carrossel from "./components/Carrossel";
import {
  ArrowRight, BellRing, Check, ChefHat, ChevronRight,
  Leaf, Menu, Refrigerator, ShoppingBasket,
  Sparkles, Sprout, X,
} from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: Refrigerator,
    title: "Tudo sob controle",
    description: "Organize os alimentos da sua casa em um só lugar e consulte seu estoque quando precisar.",
    color: "bg-emerald-100 text-emerald-800",
  },
  {
    icon: BellRing,
    title: "Validade em dia",
    description: "Veja quais alimentos estão perto de vencer e planeje o que usar primeiro.",
    color: "bg-amber-100 text-amber-800",
  },
  {
    icon: ChefHat,
    title: "Ideias para cozinhar",
    description: "Encontre receitas que aproveitam o que você já tem, com indicação do que está faltando.",
    color: "bg-lime-100 text-lime-800",
  },
  {
    icon: ShoppingBasket,
    title: "Compras mais conscientes",
    description: "Monte listas de compras com mais planejamento e evite comprar o que já existe em casa.",
    color: "bg-sky-100 text-sky-800",
  },
];

const steps = [
  { number: "01", title: "Cadastre seus alimentos", description: "Adicione os itens da despensa e da geladeira, com quantidade e validade." },
  { number: "02", title: "Acompanhe seu estoque", description: "Consulte o que você tem e descubra o que precisa ser consumido primeiro." },
  { number: "03", title: "Aproveite melhor", description: "Explore receitas e planeje suas próximas compras com mais consciência." },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const Router = useRouter();

  function paginaInicial(){
    Router.push("/");
  }
  
  return (
    <>

      <header className="relative z-20 border-b border-emerald-950/5 bg-[#fbfcf8]/90 backdrop-blur-md">
              <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
                <Link href="/" className="flex items-center gap-2.5" aria-label="EcoFridge - página inicial">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-800 text-white shadow-sm">
                    <Refrigerator size={22} strokeWidth={1.8} />
                  </span>
                  <span className="text-lg font-extrabold tracking-tight text-emerald-950">Eco<span className="text-emerald-700">Fridge</span></span>
                </Link>
      
                <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
                  <a href="#sobre" className="text-sm font-medium text-slate-600 transition hover:text-emerald-800">Sobre o projeto</a>
                  <a href="#funcionalidades" className="text-sm font-medium text-slate-600 transition hover:text-emerald-800">Funcionalidades</a>
                  <a href="#como-funciona" className="text-sm font-medium text-slate-600 transition hover:text-emerald-800">Como funciona</a>
                </nav>
      
                <div className="hidden items-center gap-3 md:flex">
                  <Link href="/login" className="rounded-full px-4 py-2.5 text-sm font-bold text-emerald-900 transition hover:bg-emerald-50">Entrar</Link>
                  <Link href="/cadastro" className="inline-flex items-center gap-2 rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-900 focus:outline-none focus:ring-4 focus:ring-emerald-800/20">
                    Criar conta <ArrowRight size={16} />
                  </Link>
                </div>
      
                <button className="flex h-10 w-10 items-center justify-center rounded-xl text-emerald-950 hover:bg-emerald-50 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}>
                  {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
              {menuOpen && (
                <div className="border-t border-emerald-950/5 bg-white px-5 py-4 md:hidden">
                  <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Menu mobile">
                    <a onClick={() => setMenuOpen(false)} href="#sobre" className="rounded-lg px-3 py-3 text-sm font-semibold hover:bg-emerald-50">Sobre o projeto</a>
                    <a onClick={() => setMenuOpen(false)} href="#funcionalidades" className="rounded-lg px-3 py-3 text-sm font-semibold hover:bg-emerald-50">Funcionalidades</a>
                    <a onClick={() => setMenuOpen(false)} href="#como-funciona" className="rounded-lg px-3 py-3 text-sm font-semibold hover:bg-emerald-50">Como funciona</a>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <Link href="/login" className="rounded-full border border-emerald-800 px-4 py-3 text-center text-sm font-bold text-emerald-900">Entrar</Link>
                      <Link href="/cadastro" className="rounded-full bg-emerald-800 px-4 py-3 text-center text-sm font-bold text-white">Criar conta</Link>
                    </div>
                  </nav>
                </div>
              )}
            </header>



      <main className="grid grid-cols-5 md:grid-cols-1 max-w-screen flex-col min-h-100 max-h-200 items-center 
      justify-center bg-linear-to-b from-green-100 to-green-50">


  
<section className="relative isolate">
        <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-lime-200/40 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.02fr_.98fr] lg:gap-16 lg:px-10 lg:pb-28 lg:pt-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white px-3.5 py-2 text-xs font-bold uppercase tracking-[0.13em] text-emerald-800 shadow-sm">
              <Sprout size={15} /> Mais organização, menos desperdício
            </div>
            <h1 className="max-w-2xl text-4xl font-black leading-[1.08] tracking-[-0.045em] text-emerald-950 sm:text-5xl lg:text-6xl">
              Sua cozinha mais inteligente começa <span className="relative whitespace-nowrap text-emerald-700">aqui.
                <svg className="absolute -bottom-2 left-0 h-3 w-full text-lime-400" viewBox="0 0 250 12" fill="none" aria-hidden="true"><path d="M3 8C60 2 158 1 247 7" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /></svg>
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              O EcoFridge ajuda você a organizar os alimentos, acompanhar as validades e descobrir novas receitas com o que já tem em casa.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/cadastro" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-emerald-800 px-7 py-4 text-sm font-extrabold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-emerald-900 focus:outline-none focus:ring-4 focus:ring-emerald-800/20">
                Começar gratuitamente <ArrowRight size={18} />
              </Link>
              <a href="#sobre" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-bold text-emerald-950 transition hover:bg-white">
                Conhecer o projeto <ChevronRight size={17} />
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2"><Check size={16} className="text-emerald-700" /> Fácil de usar</span>
              <span className="inline-flex items-center gap-2"><Check size={16} className="text-emerald-700" /> Planejamento simples</span>
              <span className="inline-flex items-center gap-2"><Check size={16} className="text-emerald-700" /> Mais aproveitamento</span>
            </div>
          </div>
          
           <div className="flex items-center justify-center w-fit rounded-2xl translate-x-00 translate-y-0 "> 
        
            <Carrossel />

           </div> 
          </div>
      </section>

        


        


        <section id="sobre" className="scroll-mt-20 border-y border-emerald-950/5 bg-green-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-20 lg:px-10">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">Sobre o projeto</p>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-emerald-950 sm:text-4xl">Uma ideia simples para um problema do dia a dia.</h2>
          </div>
          <div className="space-y-4 text-base leading-7 text-slate-600">
            <p>Às vezes compramos alimentos que já temos, esquecemos produtos no fundo da geladeira ou percebemos que algo venceu quando já é tarde. Isso dificulta a organização da casa e pode aumentar o desperdício.</p>
            <p>O <strong className="font-extrabold text-emerald-900">EcoFridge</strong> é um projeto de sistema web pensado para ajudar famílias a acompanhar seus alimentos, consultar datas de validade, encontrar receitas e planejar compras com mais consciência.</p>
            <p className="font-semibold text-emerald-800">Nosso propósito: organizar. aproveitar. não desperdiçar.</p>
          </div>
        </div>
      </section>

      <section id="funcionalidades" className="scroll-mt-20 py-16 sm:py-24 bg-linear-to-t from-green-50 via-white to-green-50">
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">O que você pode fazer</p>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-emerald-950 sm:text-4xl">Tudo para cuidar melhor dos seus alimentos</h2>
                <p className="mt-4 text-base leading-7 text-slate-600">Ferramentas práticas para transformar a rotina da cozinha em uma experiência mais organizada.</p>
              </div>
              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return <article key={feature.title} className="group rounded-3xl border border-emerald-950/8 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-800/20 hover:shadow-lg hover:shadow-emerald-950/5 sm:p-7">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.color}`}><Icon size={23} /></div>
                    <h3 className="mt-6 text-lg font-extrabold text-emerald-950">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
                    
                  </article>;
                })}
              </div>
            </div>
        </section>

      <section id="como-funciona" className="scroll-mt-20 bg-green-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
            <div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">Comece em poucos passos</p><h2 className="mt-4 text-3xl font-black tracking-tight text-emerald-950 sm:text-4xl">Da despensa ao prato, sem complicação.</h2><p className="mt-4 max-w-lg text-base leading-7 text-slate-600">Uma rotina mais simples para saber o que você tem, o que usar e o que realmente precisa comprar.</p></div>
            <div className="grid gap-4 sm:grid-cols-3">
              {steps.map((step) => <article key={step.number} className="rounded-3xl border border-white bg-white/80 p-5 sm:p-6"><span className="text-sm font-black tracking-widest text-emerald-700">{step.number}</span><h3 className="mt-5 text-base font-extrabold text-emerald-950">{step.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p></article>)}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-emerald-950/5 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <Link href="/" className="flex items-center gap-2"><span className="font-extrabold tracking-tight text-emerald-950">Eco<span className="text-emerald-700">Fridge</span></span></Link>
          <p className="text-sm text-slate-500">Organize. Aproveite. Não desperdice.</p>
          <p className="text-xs text-slate-400">Projeto acadêmico · EcoFridge</p>
        </div>
      </footer>
      </main>

        
    </>
  );
}
