import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

interface BackButtonProps {}

export function BackButton({}: BackButtonProps) {
  const { goBack } = useNavigation();
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
      <Feather name="arrow-left" size={32} color={"#fff"} />
    </TouchableOpacity>
  );
}
