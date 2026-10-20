"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

export default function Admin() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [buscando, setBuscando] = useState(true);

  async function buscarUsuarios() {
    try {
      const response = await fetch("http://localhost:3001/usuarios");

      if (!response.ok) {
        const erro = await response.text();
        console.error("Erro HTTP:", response.status, erro);
        throw new Error("Erro ao buscar usuários");
      }

      const data = await response.json();

      // Aceita tanto uma lista direta quanto { data: [...] }
      setUsuarios(Array.isArray(data) ? data : data.data ?? []);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);

      await Swal.fire({
        title: "Erro",
        text: "Não foi possível carregar os usuários. Confira se o servidor está ligado e se a rota GET /usuarios existe.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setBuscando(false);
    }
  }

  useEffect(() => {
    buscarUsuarios();
  }, []);

  async function excluirUsuario(id: number) {
    const resultado = await Swal.fire({
      title: "Excluir usuário?",
      text: "Essa opção não poderá ser desfeita",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!resultado.isConfirmed) return;

    try {
      const response = await fetch(
        `http://localhost:3001/usuarios/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        const erro = await response.text();
        console.error("Erro HTTP:", response.status, erro);
        throw new Error("Erro ao excluir usuário");
      }

      setUsuarios((atuais) =>
        atuais.filter((usuario) => usuario.id !== id)
      );

      await Swal.fire({
        title: "Excluído!",
        text: "O usuário foi excluído com sucesso",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);

      await Swal.fire({
        title: "Erro",
        text: "Não foi possível excluir o usuário. Confira se a rota DELETE /usuarios/:id existe.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  }

  return (
    <main className="min-h-screen from-green-200 to-green-100 p-8 text-black">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold">
          Gerenciar Usuários
        </h1>

        {buscando ? (
          <p className="text-gray-300">Carregando usuários...</p>
        ) : usuarios.length === 0 ? (
          <div className="rounded-lg bg-green-700 p-8 text-center shadow">
            <p className="text-gray-400">
              Nenhum usuário cadastrado
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {usuarios.map((usuario) => (
              <div
                key={usuario.id}
                className="rounded-lg border border-gray-700 bg-green-300 p-4 shadow"
              >
                <h2 className="text-xl font-bold text-black">{usuario.nome}</h2>

                <p className="mt-3 text-black">{usuario.email}</p>

                <button
                  className="mt-4 w-full rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                  onClick={() => excluirUsuario(usuario.id)}
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}