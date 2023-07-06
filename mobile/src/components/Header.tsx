import { Feather } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";
import { Logo } from "./Logo";

interface HeaderProps {}

export function Header({}: HeaderProps) {
  const { navigate } = useNavigation();
  const { logout } = useAuth();

  return (
    <View className="w-full flex-row items-center justify-between h-14 px-4 border-background border-b bg-header">
      <Logo />

      <View className="flex-row gap-2">
        <TouchableOpacity
          activeOpacity={0.7}
          className="items-center flex-row bg-card rounded-lg  justify-center  "
        >
          <Feather name="plus-square" size={28} color={"#fff"} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          className="items-center flex-row bg-card rounded-lg justify-center  relative"
        >
          <Feather name="bell" size={28} color={"#fff"} />
          <View className="h-3 bg-red-500 w-3 rounded-full absolute top-0 right-0"/>
        </TouchableOpacity>
      </View>
    </View>
  );
}
