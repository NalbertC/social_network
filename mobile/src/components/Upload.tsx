import { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { api } from "../libs/axios";

interface UploadProps {}

export function Upload({}: UploadProps) {
  const [avatar, setAvatar] = useState("https://github.com/NalbertC.png");
  const { navigate } = useNavigation();

  const [selectedFile, setSelectedFile] =
    useState<ImagePicker.ImagePickerAsset>();

  async function imagePeackerCall() {
    const result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 4],
      allowsEditing: true,

      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0]);
      setSelectedFile(result.assets[0]);
      setAvatar(result.assets[0].uri);
    }
  }

  async function uploadImageProfile() {
    const data = new FormData();

    const filename = selectedFile?.uri.substring(
      selectedFile.uri.lastIndexOf("/") + 1,
      selectedFile.uri.length
    );

    const extend = filename?.split(".")[1];

    data.append(
      "file",
      JSON.parse(
        JSON.stringify({
          name: filename,
          uri: selectedFile?.uri,
          type: `${selectedFile?.type}/${extend}`,
        })
      )
    );

    console.log({ data, filename });
    try {
      const response = await api.post(`/uploads/user`, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      return navigate("profile");
    } catch (error) {
      Alert.alert("Ops...", "Erro ao conectar ao servidor");
    }
  }

  return (
    <View className="flex-1 justify-center items-center ">
      <View className="h-24 w-24 rounded-full">
        <Image
          source={{
            uri: avatar,
          }}
          className="w-full h-full rounded-full"
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity
        className="justify-center bg-slate-600 h-10 px-4 rounded-lg mt-4"
        activeOpacity={0.7}
        onPress={imagePeackerCall}
      >
        <Text className="text-base text-textPrincipal justify-center ">
          Escolher imagem
        </Text>
      </TouchableOpacity>

      {selectedFile && (
        <TouchableOpacity
          className="justify-center bg-slate-600 h-10 px-4 rounded-lg mt-4"
          activeOpacity={0.7}
          onPress={uploadImageProfile}
        >
          <Text className="text-base text-textPrincipal justify-center ">
            Upload
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
