import { AxiosError } from "axios";
import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { Logo } from "../components/Logo";
import { Page } from "../components/Page";
import { Text } from "../components/Text";
import { api } from "../services/api";

export function ResetarSenha() {
  const params = useParams();
  const navigate = useNavigate();
  const [infoCadastro, setInfoCadastro] = useState(<Text> </Text>);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "") {
      setInfoCadastro(
        <Text className="text-red-500">Por favor, inforforme seu email</Text>
      );
    } else {
      if (password !== confirmPassword) {
        setInfoCadastro(
          <Text className="text-red-500">As senhas não coencidem</Text>
        );
      } else {
        try {
          const novaSenha = await api.post("/senha/resetar", {
            email,
            token: params.token,
            senha: password,
          });

          setInfoCadastro(
            <Text className="text-green-500">{novaSenha.data}</Text>
          );

          setTimeout(() => navigate("/login"), 1000);
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
              setInfoCadastro(
                <Text className="text-red-500">
                  A solicitação não corresponde ao email inserido
                </Text>
              );
            } else {
              if (error.response?.status === 404) {
                setInfoCadastro(
                  <Text className="text-red-500">Email não encontrado</Text>
                );
              } else {
                setInfoCadastro(
                  <Text className="text-red-500">
                    Erro no servidor, tente novamente mais tarde
                  </Text>
                );
              }
            }
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
            <Text className="font-bold text-gray-500">Crie uma nova senha</Text>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-4"
            autoComplete="off"
          >
            <label htmlFor="email" className="flex flex-col gap-3 pt-2">
              <Text className="font-semibold">Seu Email</Text>
              <Input
                icon={<FaEnvelope />}
                placeholder="ex: example@email.com"
                type={"email"}
                className="h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </label>
            <label htmlFor="email" className="flex flex-col gap-3 ">
              <Text className="font-semibold">Nova senha</Text>
              <Input
                icon={<FaLock />}
                placeholder="**********"
                inputUse="password"
                type="password"
                className="h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
            </label>

            <label htmlFor="email" className="flex flex-col gap-3 ">
              <Text className="font-semibold">Confirme sua senha</Text>
              <Input
                icon={<FaLock />}
                placeholder="**********"
                type="password"
                className="h-12"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="off"
              />
            </label>
            <div className="flex justify-center h-4">{infoCadastro}</div>
            <Button className="h-12">Confirmar</Button>
          </form>
        </div>
      </div>
    </Page>
  );
}
