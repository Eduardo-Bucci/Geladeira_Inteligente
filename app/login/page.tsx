"use client"
import {useState} from "react"

// Ler ai tropa: Seria bom mudar a parte de "Área de Login" para algo mais descritivo, 
// só que fiquei sem ideias :(

export default function Login() {

  const [verSenha, setVerSenha] = useState(false);
  
  function entrar(){
    
    alert("botao funcionou kkj")
    
  }

  return (
    <main className ="flex h-screen items-center justify-center bg-green-100">
            <div className="w-full max-w-md rounded-2x1 bg-green-50 p-8 shadow-lg border ">
                <h1 className="text-center mb-8 font-bold">Login</h1>

                
                <p className="mb-8 text-center text-gray-600">Área de Login</p>

              <form onSubmit={entrar}>
                <label>Email</label>
                <input type="email"
                placeholder="Digite o seu email"
                className="mb-4 w-full rounded border border-gray-800 px-3 py-2 focus:outline-none focus:ring focus:ring-gray-800"
                required
                />


                <label>Senha</label>
                <input type={verSenha ? "text" : "password"}

                placeholder="Digite sua senha"
                className="mb-4 w-full rounded border border-gray-800 px-3 py-2 focus:outline-none focus:ring focus:ring-gray-800"
                required
                />


                <button type="button" onClick={() => setVerSenha(!verSenha)} className="cursor-pointer">
                  {verSenha ? "Ocultar Senha" : "Mostrar Senha"} 

                </button>




                 <button type="submit"
                 className="w-full rounded bg-gray-800 py-1.5 font-semibold text-white hover:bg-gray-700 cursor-pointer">

                Entrar
            </button>

            </form>
            </div>



        </main>

  );
}