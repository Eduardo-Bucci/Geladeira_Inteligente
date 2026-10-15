"use client"

export default function Dashboard() {


/* 15/10 eu abri essa pagina e quase chorei, fiquei tao triste vendo isso que fiz, que desistir de ajeitar agora*/

  return (
    <main className="min-h-screen bg-green-100">
      <header className="flex items-center justify-between bg-green-600 p-4 text-white">
        <h1 className="text-2x1 font-bold">
        Olá, aqui é a página do Dashboard
        </h1>
      </header>

      <div className="flex items-center justify-center mih-h-screen h-64 ">

      <div className="border-2 border-green-400 w-full max-w-4xl h-50 rounded-lg shadow-lg bg-green-50">
      <h2 className="px-5 ">Veja como está seus alimentos</h2>
      </div>

      </div>
    </main>
  );
}