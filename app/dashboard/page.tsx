"use client"


import { useMemo, useState } from "react";
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



export default function Dashboard() {



/* 15/10 eu abri essa pagina e quase chorei, fiquei tao triste vendo isso que fiz, que desistir de ajeitar agora*/

  return (
    <main className="min-h-screen flex flex-col bg-green-100">
      <header className="flex items-center justify-between bg-green-600 p-4 text-white">
        <h1 className="text-2x1 font-bold">
        Olá, aqui é a página do Dashboard
        </h1>
      </header>


      <div className="flex items-center justify-center h-64 ">

       

      <div className="border-2 border-green-600 w-full max-w-4xl h-50  rounded-lg shadow-lg bg-green-50">
      <h2 className="px-5 "> Veja como está seus alimentos </h2>
        <button className="rounded-lg m-5 bg-emerald-700 px-5 py-3
          text-white hover:bg-emerald-800">
            + Adicionar alimento
        </button>
      </div>
    
      </div>
    </main>
  );
}