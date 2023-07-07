import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Modalize } from "react-native-modalize";
import { Button } from "../components/Button";
import { CardPost, Post } from "../components/CardPost";
import { Loading } from "../components/Loading";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import { api } from "../libs/axios";

interface ProfileProps {}

export function Profile({}: ProfileProps) {
  const { loading, user, logout } = useAuth();
  const { userProfile } = useProfile();
  const { goBack, navigate } = useNavigation();
  const [post, setPost] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      await fecthData();
    })();
  }, []);

  async function fecthData() {
    try {
      const response = await api.get("/posts/user");

      setPost(response.data);
    } catch (error) {}
  }

  async function handleRefresh() {
    setRefreshing(true);
    await fecthData();
    setRefreshing(false);
  }

  if (loading) {
    return <Loading />;
  }

  const modalizeRef = useRef<Modalize>(null);

  function onOpen() {
    modalizeRef.current?.open();
  }

  return (
    <View className="flex-1 bg-background pt-6">
      <View className="h-10 flex-row items-center px-4 justify-between">
        <TouchableOpacity activeOpacity={0.7} onPress={logout}>
          <Feather name="x" color={"#fff"} size={24} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <Feather name="settings" color={"#fff"} size={24} />
        </TouchableOpacity>
      </View>

      {/*  */}
      <View className="h-32 px-4 items-center flex-row  border-card border-y w-screen">
        <TouchableOpacity
          className="bg-slate-800 rounded-full h-24 w-24"
          activeOpacity={0.7}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Image
            source={{
              uri: `http://10.0.1.106:8000/files/${userProfile?.image?.key}`,
            }}
            className="h-full rounded-full"
          />
        </TouchableOpacity>

        <View className="ml-4 h-24 justify-between">
          <Text className="text-textPrincipal font-[helveticaBold] text-lg">
            {user?.name}
          </Text>
          <Text className="text-textSecondary font-[helvetica] text-base">
            {user?.username}
          </Text>

          <Button icon={<Feather name="edit-3" color={"#fff"} size={18} />}>
            Editar perfil
          </Button>
        </View>
      </View>

      <Modal
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="items-center justify-center flex-1 bg-background/60">
          <View className="w-[320px] p-4 bg-card rounded-2xl">
            <TouchableOpacity
              className="items-center justify-center flex-row h-10 w-full  mb-4"
              activeOpacity={0.7}
              onPress={() => {
                navigate("photoProfile");

                setModalVisible(false);
              }}
            >
              <Feather name="camera" color={"#fff"} size={20} />
              <Text className="pl-2 text-base text-textPrincipal font-[helveticaBold] ">
                Ver foto
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="items-center justify-center flex-row h-10 w-full  mb-4"
              activeOpacity={0.7}
              onPress={() => {
                navigate("updateImageProfile");
                setModalVisible(false);
              }}
            >
              <Feather name="edit" color={"#fff"} size={20} />
              <Text className="pl-2 text-base text-textPrincipal font-[helveticaBold] ">
                Atualizar foto
              </Text>
            </TouchableOpacity>

            <Button onPress={() => setModalVisible(false)}>Cancelar</Button>
          </View>
        </View>
      </Modal>

      {/*  */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
        className="pt-1"
      >
        <View className="flex-col">
          {post.map((post, i) => (
            <CardPost
              key={`iten-${i}`}
              id={post.id}
              likes={post.likes?.length}
            />
          ))}
        </View>
      </ScrollView>
      <Navbar />
    </View>
  );
}
