"use client"
import {useState} from "react"
import {useRouter} from "next/navigation"
import Swal from "sweetalert2";

// Ler ai tropa: Seria bom mudar a parte de "Área de Login" para algo mais descritivo, 
// só que fiquei sem ideias :(

export default function Login() {
  const Router = useRouter();
  const [verSenha, setVerSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");



  async function entrar(){
   try {
      const response = await fetch(`http://localhost:3001/login`, {
        
        body: JSON.stringify({

          email,
          senha
        })
      })

      if(response.ok){
              await Swal.fire({
                title:"Bem vindo!",
                text:"Seu cadastro foi finalizado com sucesso!",
                icon:"success",
                confirmButtonText: "OK"
              })
            
            Router.push("/dashboard");
      }
    
       
    } catch (error) {
      console.log(error)
          await Swal.fire({
              title:"Algo deu errado",
              text:"Infelizmente algo deu errado em nossos servidores, aguarde um momento e tente novamente",
              icon:"error",
              confirmButtonText: "OK"
          })
    }
    
   
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

              <form onSubmit={(event)=>{event.preventDefault(); entrar();}}>
                <label>Email</label>

                <input type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}

                placeholder="Digite o seu email"
                className="mb-4 w-full rounded border border-green-800 px-3 py-2 focus:outline-none focus:ring focus:ring-orange-400"
                required
                />


                <label>Senha</label>
                <input type={verSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
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