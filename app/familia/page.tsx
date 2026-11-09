
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  Users,
  Home,
  KeyRound,
  ArrowLeft,
  Leaf,
  Loader2,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function FamiliaPage() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [codigoConvite, setCodigoConvite] = useState("");
  const [carregando, setCarregando] = useState(false);

  // Recupera o token salvo durante o login
  function obterToken() {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return null;
    }

    return token;
  }

  async function dash(){
    router.push("/dashboard");
  }

  // Criar uma nova família
  async function criarFamilia(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!nome.trim()) {
      Swal.fire("Atenção", "Informe o nome da família.", "warning");
      return;
    }

    const token = obterToken();
    if (!token) return;

    try {
      setCarregando(true);

      const response = await fetch(`${API_URL}/cadastroFamilias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome: nome.trim(),
        }),
      });

      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(
          resultado.mensagem || "Não foi possível criar a família."
        );
      }

      const novaFamilia = resultado.data;

      if (!novaFamilia?.token) {
        throw new Error(
          "A família foi criada, mas o servidor não retornou um novo token. Verifique o backend."
        );
      }

      // Atualiza o JWT com o familyId
      localStorage.setItem("token", novaFamilia.token);

      // Mostra o código para o usuário compartilhar
      await Swal.fire({
        title: "Família criada!",
        html: `
          <p>Sua família foi criada com sucesso.</p>
          <p style="margin-top: 15px;">Código de convite:</p>
          <strong style="
            display: block;
            font-size: 25px;
            letter-spacing: 4px;
            color: #15803d;
            margin: 10px 0;
          ">${novaFamilia.codigo_convite}</strong>
          <p style="font-size: 13px; color: #64748b;">
            Compartilhe esse código com as pessoas que deseja adicionar.
          </p>
        `,
        icon: "success",
        confirmButtonText: "Ir para o dashboard",
        confirmButtonColor: "#15803d",
      });

      router.push("/dashboard");
    } catch (error) {
      Swal.fire(
        "Erro",
        error instanceof Error ? error.message : "Ocorreu um erro.",
        "error"
      );
    } finally {
      setCarregando(false);
    }
  }

  // Entrar em uma família existente
  async function entrarFamilia(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!codigoConvite.trim()) {
      Swal.fire("Atenção", "Informe o código de convite.", "warning");
      return;
    }

    const token = obterToken();
    if (!token) return;

    try {
      setCarregando(true);

      const response = await fetch(`${API_URL}/familias/entrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          codigo_convite: codigoConvite.trim().toUpperCase(),
        }),
      });

      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(
          resultado.mensagem || "Não foi possível entrar na família."
        );
      }

      if (!resultado.data?.token) {
        throw new Error("O servidor não retornou o novo token.");
      }

      // Salva o JWT atualizado com o familyId
      localStorage.setItem("token", resultado.data.token);

      await Swal.fire({
        title: "Você entrou na família!",
        text: "Agora você já pode acessar o estoque e os recursos compartilhados.",
        icon: "success",
        confirmButtonText: "Ir para o dashboard",
        confirmButtonColor: "#15803d",
      });

      router.push("/dashboard");
    } catch (error) {
      Swal.fire(
        "Erro",
        error instanceof Error ? error.message : "Ocorreu um erro.",
        "error"
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">

        {/* Cabeçalho */}
        <header className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-green-600 p-3 text-white shadow-lg">
              <Leaf size={27} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-green-800">
                EcoFridge
              </h1>
              <p className="text-sm text-gray-500">
                Gestão inteligente de alimentos
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-green-100 hover:text-green-800"
          >
            <ArrowLeft size={18} />
            Voltar
          </button>
        </header>

        {/* Introdução */}
        <section className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
            <Users size={32} />
          </div>

          <h2 className="mb-3 text-3xl font-bold text-gray-800">
            Vamos organizar sua família?
          </h2>

          <p className="mx-auto max-w-xl text-gray-600">
            Crie um grupo familiar ou entre em um já existente para
            compartilhar alimentos, controlar o estoque e evitar desperdícios.
          </p>
        </section>

        {/* Opções */}
        <section className="grid gap-7 md:grid-cols-2">

          {/* Criar família */}
          <div className="rounded-2xl border border-green-100 bg-white p-7 shadow-lg shadow-green-900/5">
            <div className="mb-6 flex items-center gap-4">
              <div className="rounded-xl bg-green-100 p-3 text-green-700">
                <Home size={27} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Criar família
                </h3>
                <p className="text-sm text-gray-500">
                  Comece um novo grupo familiar
                </p>
              </div>
            </div>

            <form onSubmit={criarFamilia}>
              <label
                htmlFor="nomeFamilia"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Nome da família
              </label>

              <input
                id="nomeFamilia"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Família Silva"
                maxLength={100}
                disabled={carregando}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100 disabled:opacity-60"
              />

              <p className="mt-3 text-sm text-gray-500">
                Você será o responsável pela criação da família e poderá
                compartilhar o código de convite.
              </p>

              <button
                type="submit"
                disabled={carregando}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-semibold text-white shadow-md transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {carregando ? (
                  <>
                    <Loader2 size={19} className="animate-spin" />
                    Aguarde...
                  </>
                ) : (
                  <>
                    <Home size={19} />
                    Criar família
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Entrar em família */}
          <div className="rounded-2xl border border-emerald-100 bg-white p-7 shadow-lg shadow-green-900/5">
            <div className="mb-6 flex items-center gap-4">
              <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                <KeyRound size={27} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Entrar em uma família
                </h3>
                <p className="text-sm text-gray-500">
                  Utilize um código de convite
                </p>
              </div>
            </div>

            <form onSubmit={entrarFamilia}>
              <label
                htmlFor="codigoConvite"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Código de convite
              </label>

              <input
                id="codigoConvite"
                type="text"
                value={codigoConvite}
                onChange={(e) =>
                  setCodigoConvite(e.target.value.toUpperCase())
                }
                placeholder="Ex: A1B2C3"
                maxLength={20}
                disabled={carregando}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 uppercase tracking-widest text-gray-800 outline-none transition placeholder:normal-case placeholder:tracking-normal placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100 disabled:opacity-60"
              />

              <p className="mt-3 text-sm text-gray-500">
                Peça o código de convite para alguém que já criou uma família
                no EcoFridge.
              </p>

              <button
                type="submit"
                disabled={carregando}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border border-green-600 bg-white py-3 font-semibold text-green-700 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {carregando ? (
                  <>
                    <Loader2 size={19} className="animate-spin" />
                    Aguarde...
                  </>
                ) : (
                  <>
                    <Users size={19} />
                    Entrar na família
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

        {/* Rodapé informativo */}
        <footer className="mt-9 rounded-xl border border-green-100 bg-green-50 p-5 text-center">
          <p className="text-sm text-green-800">
            <strong>Por que criar uma família?</strong>
            <br />
            Os membros poderão compartilhar o controle do estoque e
            acompanhar os alimentos cadastrados pelo grupo.
          </p>
          <button className="  mt-7 flex w-full items-center justify-center gap-2 rounded-xl border border-green-600 bg-white py-3 font-semibold text-green-700 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-60" onClick={dash}>Já tem família?</button>
        </footer>
      </div>
    </main>
  );
}
