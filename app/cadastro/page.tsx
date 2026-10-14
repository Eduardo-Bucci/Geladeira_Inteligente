"use client";
import {useState} from "react";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [verSenha, setVerSenha] = useState(false);
 //Gostei do bagulhinho que vê a senha

  function cadastrar() {
    alert(`Cadastro realizado com sucesso!\nNome: ${nome}\nEmail: ${email}\nSenha: ${senha}`);
    // aqui bota a lógica pra enviar pro back 

    // rota pra página de login
    window.location.href = "/login";
  }

  return (
    
      <main className="flex flex-col h-screen items-center justify-center bg-linear-to-t from-green-200 to-green-300">

        <h1 onClick={() => window.location.href = "/"} className="font-bold text-5xl text-orange-600 mb-1"> EcoFridge </h1>
        <div className="w-full max-w-md rounded-md bg-green-50 p-8 shadow-lg border mt-10">
            <h1 className="text-center mb-8 font-bold text-2xl text-green-800">
            Cadastro
            </h1>
            <p className="text-center text-gray-600">
              Preencha os campos abaixo para criar sua conta.
            </p>

          <form className="mt-6">
            <label>Nome</label>
            <input type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
            className="mb-4 w-full rounded border border-green-800 px-3 py-2 focus:outline-none focus:ring focus:ring-green-800"
            required
            />
          
            <label>Email</label>
            <input type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            className="mb-4 w-full rounded border border-green-800 px-3 py-2 focus:outline-none focus:ring focus:ring-green-800"
            required
            />

            <label>Senha</label>
            <input type={verSenha ? "text" : "password"}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            className="mb-4 w-full rounded border border-green-800 px-3 py-2 focus:outline-none focus:ring focus:ring-green-800"
            required
            />
            <button type="button" onClick={() => setVerSenha(!verSenha)} className="cursor-pointer mb-4 text-sm text-green-800 hover:underline">
              {verSenha ? "Ocultar Senha" : "Mostrar Senha"} 
            </button>

            <button type="submit"
            onClick={cadastrar}
            className="w-full rounded bg-orange-600 py-1.5 font-semibold text-white transition hover:bg-orange-700 cursor-pointer">
              Cadastrar
            </button>
          </form>
        </div>
      </main>
    
  );
}