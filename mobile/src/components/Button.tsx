import { Text, View } from "react-native";

interface ButtonProps {}

export function Button({}: ButtonProps) {
  return (
    <View className="h-10 bg-button w-40 rounded-lg items-center justify-center">
      <Text className="text-textPrincipal text-lg font-[helveticaBold] ">
        Entrar
      </Text>
    </View>
  );
}
