import { ScrollView, View } from "react-native";

import { Header } from "../components/Header";

import { } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { CardPost } from "../components/CardPost";
import { api } from "../libs/axios";

interface HomeProps {}

export interface Post {
  id: string;
  created_at: Date;
  legend?: string;
}

export function Home({}: HomeProps) {
  const [post, setPost] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const response = await api.get("/posts");

      setPost(response.data);
    })();
  }, []);

  return (
    <View className="flex-1 bg-background pt-6">
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} className="pt-1">
        <View className="flex-col  ">
          {post.map((post, i) => (
            <CardPost
              // src={require("../assets/images/78893eb2ae665ca165874ce0dc48e5fe-rtert.png")}
              key={`iten-${i}`}
              id={post.id}
              // likes={post.likes}
              // userImage={post.User.image?.url}
              // userPost={post.User.name}
              // img={post.image.url}
              // legend={post.legend}
              // created_at={post.created_at}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
