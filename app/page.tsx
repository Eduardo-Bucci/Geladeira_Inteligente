"use client"

import Link from "next/link";
import {useRouter} from "next/navigation"
import Carrossel from "./components/Carrossel";


export default function Home() {
  const Router = useRouter();

   function paginaInicial(){
    Router.push("/");
  }
  
  return (
    <>

      <header className="w-full flex justify-start px-6 py-5  md:px-16 bg-green-50 hover:shadow-md transition">
         {/*  14/10  nao entendi o que esse window ta fazendo ai, 
         fui mexer na pagina e ele tava no h1 antigo e coloquei ele ai kk   */}

          {/* O window era outra forma do router.push mas eu esqueci como fazer
          aí coloquei oque eu lembrava */}

      <h1 className="text-4xl font-bold text-green-800" onClick={paginaInicial}>
        🍃 EcoFridge
      </h1>
      </header>



      <main className="grid grid-cols-5 md:grid-cols-1 flex-col h-screen items-center 
      justify-center bg-linear-to-t from-green-100 to-green-50">


  


        <div className="w-full max-w-md rounded-sm bg-green-50 p-8 shadow-lg mt-20 
        translate-x-35 -translate-y-7">

          
          <h2 className="text-center text-green-700 text-xl font-semibold">
            Sua cozinha mais organizada e inteligente.
          </h2>
          <p className="text-center text-gray-600 mt-4">
            Uma aplicação web inteligente para gerenciar alimentos domésticos, 
            monitorar datas de validade, sugerir receitas, organizar listas de compras
            e ajudar famílias a reduzir o desperdício alimentar.
          </p>


        <div className=" bg-green-900 w-40 mx-auto mt-5 rounded-sm flex py-2 align-center justify-center transition hover:bg-green-700  ">
          <Link href="/login" className="font-semibold text-white">
          Já possuo conta 
          </Link>
        </div>
        <div className=" w-40 mx-auto mt-5 rounded-sm flex border border-green-700  py-2 align-center justify-center transition hover:bg-green-100  ">
          <Link href="/cadastro" className="font-semibold text-green-800 ">
          Não possuo conta 
          </Link>
        </div>

        </div>


        <div className="flex items-center justify-center w-fit 
        rounded-2xl translate-x-180 -translate-y-95 "> 
        
            <Carrossel />

        </div>

        {/* As imagens são genéricas */}  
        {/* Coloquei um carrossel de imagens pra ficar massa */}  

      </main>


    </>
  );
}
