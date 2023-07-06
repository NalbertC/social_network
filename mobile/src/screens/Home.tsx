import { RefreshControl, ScrollView, View } from "react-native";

import { Header } from "../components/Header";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { CardPost, Like } from "../components/CardPost";
import { Loading } from "../components/Loading";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import { api } from "../libs/axios";

interface HomeProps {}

export interface Post {
  id: string;
  created_at: Date;
  legend?: string;
  likes: Like[];
}

export function Home({}: HomeProps) {
  const { loading, user } = useAuth();
  const [post, setPost] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
      await fecthData();
    })();
  }, []);

  async function fecthData() {
    api.interceptors.request.use(
     async function (config) {
        const token =  await AsyncStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    const response = await api.get("/posts");

    setPost(response.data);
  }

  async function handleRefresh() {
    setRefreshing(true);
    await fecthData();
    setRefreshing(false);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background pt-6">
      <Header />

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
      <Navbar  screen="home"/>
    </View>
  );
}
