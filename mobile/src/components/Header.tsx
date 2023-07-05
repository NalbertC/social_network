import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";

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

      <TouchableOpacity
        activeOpacity={0.7}
        className="items-center flex-row bg-card px-1 rounded-full h-9 w-9 justify-center"
        onPress={logout}
      >
        <FontAwesome name="bars" size={24} color={colors.blue[500]} />
      </TouchableOpacity>
    </View>
  );
}
