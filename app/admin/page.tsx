"use client"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

interface Usuario{
    id:number,
    nome:string,
    email:string,
    senha:string
}

export default function Admin() {
    const [usuarios,setUsuarios]= useState<Usuario[]>([])
    const [buscando,setBuscando]= useState(true)
        
        async function buscarUsuarios(){

            try {
                 const response = await fetch("http://localhost:3001/usuarios")

                if(!response){
                    throw new Error("Erro ao buscar usuario")
                }
                 const data=await response.json()
                setUsuarios(data)



            }catch (error){
                console.log(error)
            
                await Swal.fire({
                title:"Erro",
                text:"Não foi possível carregar os usuarios",
                icon:"error",
                confirmButtonText:"Ok"
            })
            
            }finally{
            setBuscando(false)
            
            }

            

        }   

            async function excluirUsuario(id:number){
        const resultado = await Swal.fire({
            title:"Excluir usuario?",
            text:"Essa opção não poderá ser desfeita",
            icon:"warning",
            showCancelButton:true,
            confirmButtonText:"Sim, excluir",
            cancelButtonText:"Cancelar",
            confirmButtonColor:"#dc2626",
            cancelButtonColor:"#6b7280"

        })
         if(!resultado.isConfirmed){
                return
            }
        try {
            const response = await fetch(`http://localhost:3001/usuarios/${id}`,{
                method:"DELETE"
            })

            if(!response.ok){
                throw new Error("Erro ao excluir o usuario")
            }
            setUsuarios((usuariosAtuais)=> usuariosAtuais.filter((usuario)=> usuario.id !== id))

             await Swal.fire({
            title:"Excluido",
            text:"O usuario foi excluído com sucesso",
            icon:"success",
            confirmButtonText:"Ok"
            
        })
        }
        catch (error){
            console.error(error)

        await Swal.fire({
            title:"Erro",
            text:"Não foi possível excluir o usuario",
            icon:"error",
            confirmButtonText:"Ok"
        })

        
    }
        


    

    return(
       <main className="p-8 min-h-screen bg-gray-800">
            <div className="mx-auto max-w-6x1">
                <h1 className="mb-6 text-3x1 font-bold">
                    Gerenciar Usuarios
                </h1>

                {usuarios.length === 0 ? (
                    <div className="rounded-lg bg-gray-800 p-8 text-center shadow">
                        <p className="text-gray-500">Nenhum usuário cadastrado</p>
                    </div>
                ):(
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {usuarios.map((usuario)=>(
                            <div key={usuario.id} className="overflow-hidden rounded-lg border bg-gray-800 shadow p-4">

                           

                            <div className="p-5">
                                <h2 className="text-xl font-bold">
                                    {usuario.nome}
                                </h2>
                                </div>
                                <p className="mt-3 text-lg text-gray-500">{usuario.email}

                                </p>

                               

                                <button className="mt-4 w-full rounded-lg bg-red-600 px-4 py-2 
                                font-semibold text-white hover:bg-red-700" onClick={()=>excluirUsuario(usuario.id)}>Excluir</button>
                            </div>
                        ))}
                        </div>
                )}
            </div>
        </main>
    )
 
        
}
}  