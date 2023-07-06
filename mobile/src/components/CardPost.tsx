import { Image, Text, TouchableOpacity, View } from "react-native";

import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { api } from "../libs/axios";

export interface Post {
  id: string;
  created_at: Date;
  legend?: string;
  image: IImage;
  User: User;
  likes: Like[];
}

interface IImage {
  id: string;
  url: string;
  key: string;
}

interface User {
  id: string;
  name: string;
  username: string;
  image?: IImage;
}

export interface Like {
  id: string;
  userId: string;
  postId: string;
  created_at: Date;
}

interface CardPostProps {
  id: string;
  likes: number;
}

export function dateFarmater(date: Date) {
  const formater = dayjs(date).locale("pt-br").format("DD/MM/YYYY HH:mm");
  return formater;
}

export function CardPost({ id, likes }: CardPostProps) {
  const [isLike, setIsLike] = useState(false);
  const [post, setPost] = useState<Post>({} as Post);

  const { user } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    (async () => {
      const response = await api.get(`/posts/post/${id}`);

      setPost(response.data);
    })();
  }, [id, likes , isLike]);

  async function like(postId: string) {
    try {
      const { data } = await api.patch(`/like/${postId}`);
      console.log(data);
      setIsLike(!isLike);
    } catch (error) {}
  }

  return (
    <View className="bg-card mb-2">
      {/* header  */}
      <View className="flex-row items-center justify-between px-4 py-2 border-cardHover border-b">
        <View className="flex-row gap-3">
          <View className="bg-slate-500 h-11 w-11 rounded-full">
            <Image
              source={{
                uri: `http://10.0.1.106:8000/files/${post.User?.image?.key}`,
              }}
              className="w-full h-full rounded-full"
            />
          </View>
          <View>
            <Text className="text-textPrincipal font-[helveticaBold] text-base">
              {post.User?.name}
            </Text>
            <Text className="text-textSecondary text-sm">
              {dateFarmater(post.created_at)}
            </Text>
          </View>
        </View>

        <Entypo name="dots-three-horizontal" color={"#fff"} size={20} />
      </View>

      {/* post  */}
      <View>
        {post.legend && (
          <Text className="text-textPrincipal text-base px-4 py-2">
            {post.legend}
          </Text>
        )}

        <TouchableOpacity
          className="w-full border-cardHover border-y max-h-80"
          activeOpacity={1}
          onPress={() => {
            navigate("post", { postId: post.id });
          }}
        >
          <Image
            source={{
              uri: `http://10.0.1.106:8000/files/${post.image?.key}`,
            }}
            className="w-full h-full"
          />
        </TouchableOpacity>
      </View>

      {/* footer  */}

      <View className="">
        <View className="flex-row items-center justify-between px-4 ">
          <View className="flex-row items-center gap-1">
            {post.likes?.length > 0 && (
              <>
                <Ionicons
                  name="heart-sharp"
                  className="py-2"
                  color={"#b0b3b8"}
                  size={18}
                />
                <Text className="text-sm font-[helvetica] text-textSecondary items-center justify-center py-2">
                  {post.likes?.length}
                </Text>
              </>
            )}
          </View>
          <View className="flex-row items-center gap-1">
            <Text className="text-sm text-textSecondary py-2">
              {12} comentários
            </Text>
          </View>
        </View>

        <View className=" flex-row justify-evenly px-4 py-2 border-cardHover border-t">
          <TouchableOpacity
            className="justify-center items-center bg-colorSecondary rounded-full px-10 h-10 flex-row"
            activeOpacity={0.7}
            onPress={() => {
              like(id);
            }}
          >
            {post.likes?.some((iten) => iten.userId === user?.id) ? (
              <Ionicons name="heart-sharp" color={"#2374e1"} size={28} />
            ) : (
              <Ionicons name="heart-outline" color={"#fff"} size={28} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="justify-center items-center bg-colorSecondary rounded-full px-10 h-10"
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="comment-text-outline"
              color={"#fff"}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
