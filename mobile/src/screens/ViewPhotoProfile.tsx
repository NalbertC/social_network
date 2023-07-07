import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import { FotoZoom } from "../components/ZoomImage";
import { useProfile } from "../hooks/useProfile";

interface ViewPhotoProfileProps {}

export function ViewPhotoProfile({}: ViewPhotoProfileProps) {
  const { goBack, navigate } = useNavigation();
  const { userProfile } = useProfile();

  return (
    <View className="flex-1 bg-background pt-6 ">
      <View className="h-12 flex-row w-full items-center px-4 justify-between">
        <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
          <Feather name="x" color={"#fff"} size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigate("updateImageProfile")}
        >
          <Feather name="edit" color={"#fff"} size={22} />
        </TouchableOpacity>
      </View>
      <View className="flex-1 items-center justify-center">
        {/* <Image
          source={{ uri: `http://10.0.1.106:8000/files/${post.image?.key}` }}
          style={{ aspectRatio: 1 }}
          resizeMode="contain"
          className="w-full"
        /> */}

        <FotoZoom
          url={`http://10.0.1.106:8000/files/${userProfile?.image?.key}`}
        />
      </View>
    </View>
  );
}
