"use client"
import {useState} from "react"
import {useRouter} from "next/navigation"

// Ler ai tropa: Seria bom mudar a parte de "Área de Login" para algo mais descritivo, 
// só que fiquei sem ideias :(

export default function Login() {
  const Router = useRouter();
  const [verSenha, setVerSenha] = useState(false);
  
  function entrar(){
    
    alert("botao funcionou kkj")
    
    Router.push("/");
  }
   function paginaInicial(){
    Router.push("/");
  }


  return (
    <main className ="flex flex-col h-screen items-center justify-center bg-linear-to-t from-green-200 to-green-50">
            <h1 onClick={paginaInicial} className="font-bold text-5xl text-green-800 mb-7"> EcoFridge </h1>
            <div className="w-full max-w-md rounded-md bg-green-50 p-8 shadow-lg border-green-700 border">
                <h1 className="text-center mb-8 font-bold text-2xl text-green-700">Login</h1>

                
                <p className="mb-8 text-center text-gray-600">Área de Login</p>

              <form onSubmit={entrar}>
                <label>Email</label>
                <input type="email"
                placeholder="Digite o seu email"
                className="mb-4 w-full rounded border border-green-800 px-3 py-2 focus:outline-none focus:ring focus:ring-orange-400"
                required
                />


                <label>Senha</label>
                <input type={verSenha ? "text" : "password"}

                placeholder="Digite sua senha"
                className="mb-4 w-full rounded border border-green-800 px-3 py-2 focus:outline-none focus:ring focus:ring-orange-400"
                required
                />


                <button type="button" onClick={() => setVerSenha(!verSenha)} className="cursor-pointer mb-4 text-sm text-green-800 hover:underline">
                  {verSenha ? "Ocultar Senha" : "Mostrar Senha"} 

                </button>




                <button type="submit"
                 className="w-full rounded bg-orange-600 py-1.5 font-semibold text-white transition hover:bg-orange-700 cursor-pointer">
                  Entrar
                </button>

            </form>

            <a href="/cadastro" className="mt-4 block text-center text-sm text-green-800 hover:underline">
              Não possui conta? Cadastre-se
            </a>
            </div>



        </main>

  );
}