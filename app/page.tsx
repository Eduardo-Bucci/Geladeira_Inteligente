"use client"

import Link from "next/link";

export default function Home() {

  return (
    
      <main className="flex h-screen items-baseline justify-center bg-green-100">

        <div className="w-full max-w-md rounded-2x1 bg-green-50 p-8 shadow-lg border mt-20">

          <h1 className="text-center mb-8 font-bold text-2xl text-green-800">
            Geladeira Inteligente kk
          </h1>


        <div className=" w-40 mx-auto flex border-2 border-green-700  py-2 align-center justify-center ">
          <Link href="/login" className="font-semibold text-green-800">
          Já possuo conta kk
          </Link>

        </div>


        </div>



      </main>




    
  );
}
