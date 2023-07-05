import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Button } from "../components/Button";
import { Logo } from "../components/Logo";
import { useAuth } from "../hooks/useAuth";

interface LoginProps {}

export function Login({}: LoginProps) {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  // const [] = useState();

  async function handleLogin() {
    const response = await login(username, password);
  }

  return (
    <View className="flex-1 bg-background px-4 pt-6 items-center justify-center">
      <View className="bg-card p-4 rounded-2xl w-[320px]">
        <View className="items-center pb-2">
          <Logo />
          <Text className="text-base text-textSecondary font-[helveticaBold] ">
            Faça login na plataforma
          </Text>
        </View>

        <View className="flex-col">
          <View className="pb-2">
            <Text className="text-sm text-textPrincipal  font-[helveticaBold] ">
              Username
            </Text>
            <TextInput
              className="h-10 w-full bg-slate-500 px-2 rounded-lg"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View>
            <Text className="text-sm text-textPrincipal  font-[helveticaBold] ">
              Senha
            </Text>
            <TextInput
              className="h-10 w-full bg-slate-500 px-2 rounded-lg"
              value={password}
              onChangeText={setPass}
            />
          </View>
        </View>
        <View className="flex-col pt-8 items-center">
          <Button onPress={handleLogin}>Entrar</Button>

          <View className="pt-2 gap-1 items-center">
            <Text className="text-sm text-textSecondary font-[helvetica] ">
              Esqueceu a senha?
            </Text>
            <Text className="text-sm text-textSecondary font-[helvetica]">
              Criar conta
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
