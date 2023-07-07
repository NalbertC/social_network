import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import { Upload } from "../components/Upload";

interface UpdateImageProfileProps {}

export function UpdateImageProfile({}: UpdateImageProfileProps) {
  const { goBack } = useNavigation();

  return (
    <View className="flex-1 bg-background pt-6">
      <View className="h-12 flex-row w-full items-center px-4 justify-between">
        <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
          <Feather name="x" color={"#fff"} size={24} />
        </TouchableOpacity>
      </View>
      <View className="flex-1 ">
        <Upload />
      </View>
    </View>
  );
}
