"use client";
import {useState} from "react";
import {useRouter} from "next/navigation"
import Swal from "sweetalert2";

//tirei o window.Location.href e coloquei Router.push, o codigo 
// nao tava gostando muito do window
//Se der error lembra de instalar o sweetalert2 (npm install sweetalert2)


export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const Router = useRouter();

  const [verSenha, setVerSenha] = useState(false);
 //Gostei do bagulhinho que vê a senha

  async function cadastrarUsuario() {

    try {
      const response = await fetch(`http://localhost:3001/cadastro`, {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          nome,
          email,
          senha
        })
      })

      if(response.ok){
        await Swal.fire({
          title:"Bem vindo!",
          text:"Seu cadastro foi finalizado com sucesso!",
          icon:"success",
          confirmButtonText:"Ok"
        })
      }

    } catch (error) {
      console.log(error)
      await Swal.fire({
          title:"Algo deu errado",
          text:"Infelizmente algo deu errado em nossos servidores, aguarde um momento e tente novamente",
          icon:"error",
          confirmButtonText:"Ok"
        })
    }

    Router.push("/login");
  }
  function paginaInicial(){
    Router.push("/");
  }

  return (
    
      <main className="flex flex-col h-screen items-center justify-center bg-linear-to-t from-green-200 to-green-50">

        <h1 onClick={paginaInicial} className="translate-y-4 font-bold text-4xl text-green-800 mb-1"> EcoFridge </h1>
        <div className="-translate-y-2 py-5 w-full max-w-md rounded-md bg-green-50 p-8 shadow-lg border mt-10">
            <h1 className="text-center mb-8 font-bold text-2xl text-green-700">
            Cadastro
            </h1>
            <p className="text-center text-gray-600">
              Preencha os campos abaixo para criar sua conta.
            </p>

          <form className="mt-6" onSubmit={(e)=>{e.preventDefault(); cadastrarUsuario();}} >

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
            
            className="w-full rounded bg-orange-600 py-1.5 font-semibold text-white transition hover:bg-orange-700 cursor-pointer">
              Cadastrar
            </button>
          </form>

          <a href="/login" className="mt-4 block text-center text-sm text-green-800 hover:underline">
              Já possui conta? Faça login
            </a>
        </div>
      </main>
    
  );
}