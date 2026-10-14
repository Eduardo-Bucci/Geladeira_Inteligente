"use client"

import Link from "next/link";

export default function Home() {

  return (
    
      <main className="flex flex-col h-screen items-center justify-center bg-linear-to-t from-green-200 to-green-300">

        <h1 onClick={() => window.location.href = "/"} className="font-bold text-5xl text-orange-600 mb-2"> EcoFridge </h1>
        <div className="w-full max-w-md rounded-sm bg-green-50 p-8 shadow-lg border mt-10">

          <h1 className="text-center mb-8 font-bold text-2xl text-green-800">
            EcoFridge - Sistema de Controle de Alimentos
          </h1>
          <h3 className="text-center text-gray-600">
            Bem-vindo ao EcoFridge!
          </h3>
          <p className="text-center text-gray-600 mt-4">
            Uma aplicação web inteligente para gerenciar alimentos domésticos, 
            monitorar datas de validade, sugerir receitas, organizar listas de compras
            e ajudar famílias a reduzir o desperdício alimentar.
          </p>


        <div className=" w-40 mx-auto mt-5 rounded-sm flex border-2 border-green-700  py-2 align-center justify-center transition hover:bg-green-200  ">
          <Link href="/login" className="font-semibold text-green-800">
          Já possuo conta 
          </Link>
        </div>
        <div className=" w-40 mx-auto mt-5 rounded-sm flex border-2 border-green-700  py-2 align-center justify-center transition hover:bg-green-200  ">
          <Link href="/cadastro" className="font-semibold text-green-800 ">
          Não possuo conta 
          </Link>
        </div>


        </div>



      </main>




    
  );
}
