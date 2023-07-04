import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";

import { Logo } from "./Logo";

interface HeaderProps {}

export function Header({}: HeaderProps) {
  return (
    <View className="w-full flex-row items-center justify-between bg-slate-600 h-14">
      <Logo />
      <TouchableOpacity activeOpacity={0.7}>
        <Feather name="plus" size={20} color={colors.blue[500]} />

        <Text className="text-textPrincipal  ml-3 text-base">Novo</Text>
      </TouchableOpacity>
    </View>
  );
}
