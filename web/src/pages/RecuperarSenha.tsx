import { AxiosError } from "axios";
import { useState } from "react";
import { FaEnvelope, FaLongArrowAltRight } from "react-icons/fa";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { Logo } from "../components/Logo";
import { Page } from "../components/Page";
import { Text } from "../components/Text";
import { api } from "../services/api";

export function RecuperarSenha() {
  const [info, setInfo] = useState(<Text> </Text>);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "") {
      setInfo(
        <Text className="text-red-500">Por favor informe o seu email</Text>
      );
    } else {
      try {
        const recuperarSenha = await api.post("/senha/recuperar", {
          email,
        });

        setInfo(<Text className="text-green-500">{recuperarSenha.data}</Text>);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) {
            setInfo(<Text className="text-red-500">Email não encontrado</Text>);
          } else {
            setInfo(
              <Text className="text-red-500">
                Erro no servidor, tente novamente mais tarde
              </Text>
            );
          }
        }
      }
    }
  };

  return (
    <Page>
      <div className=" h-full w-full fixed inset-0">
        <div className="absolute px-6 pt-4 pb-6 bg-background rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 focus:shadow-0 focus:outline-0 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center my-4 ">
            <Logo /> <Heading>ToDoHub</Heading>
            <Text className="font-bold text-gray-500">Recupere sua senha</Text>
          </div>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <label htmlFor="email" className="flex flex-col gap-3 pt-2">
              <Text className="font-semibold">
                Digite o seu email usado na plataforma
              </Text>
              <Input
                icon={<FaEnvelope />}
                placeholder="ex: example@email.com"
                type={"email"}
                className="h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <div className="flex justify-center h-4 text-red-500">{info}</div>

            <Button className="h-12">Confirmar</Button>
          </form>

          <div className="flex justify-center items-center flex-col pt-2">
            <Text
              size="sm"
              className="text-gray-500 flex flex-row items-center gap-1 text-dark-400 "
            >
              <a
                href="/login"
                className="flex flex-row  items-center hover:text-cyan-500 gap-1"
              >
                Ir para login
                {<FaLongArrowAltRight />}
              </a>
            </Text>
          </div>
        </div>
      </div>
    </Page>
  );
}
