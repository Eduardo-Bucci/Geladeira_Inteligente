"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Receitas() {

  const Router = useRouter();

  function voltarDashboard() {
    Router.push("/dashboard");
  }
  return (
    <main className="flex min-h-screen flex-col bg-linear-to-t from-green-200 to-green-50 items-center justify-between p-24">
        <div className="z-10 w-full flex-col max-w-5xl items-center p-10 rounded-md bg-emerald-200 border border-green-900 justify-between font-mono text-sm lg:flex">
            <p className="text-lg font-bold" >Aqui você pode descobrir receitas com os ingredientes que você tem na sua cozinha.</p>
            
            <p>Mas não tem kk volte depois. </p>

            <p>Clique aqui para voltar ⬇</p>
            <button onClick={voltarDashboard} className="w-lg mt-5 rounded bg-orange-600 py-1.5 font-semibold text-white transition hover:bg-orange-700 cursor-pointer">
              Voltar
            </button>
        
        </div>
    </main>
  );
}