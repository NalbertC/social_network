import { Dimensions, Text, TouchableOpacity, View } from "react-native";

import {
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Post } from "../components/CardPost";
import { FotoZoom } from "../components/ZoomImage";
import { useAuth } from "../hooks/useAuth";
import { api } from "../libs/axios";

interface Params {
  postId: string;
}

interface ViewPostProps {}

export function ViewPost({}: ViewPostProps) {
  const { user } = useAuth();

  const { goBack } = useNavigation();
  const route = useRoute();

  const [post, setPost] = useState<Post>({} as Post);
  const [isLike, setIsLike] = useState(false);
  // const [] = useState();

  const { postId } = route.params as Params;
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/posts/post/${postId}`);

        setPost(response.data);
      } catch (error) {}
    })();
  }, [postId, isLike]);

  async function like(postId: string) {
    try {
      const { data } = await api.patch(`/like/${postId}`);
      console.log(data);
      setIsLike(!isLike);
    } catch (error) {}
  }

  return (
    <View className="flex-1 bg-background pt-6">
      <View className="h-12 flex-row  items-center px-4 justify-between">
        <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
          <Feather name="x" color={"#fff"} size={24} />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7}>
          <Entypo name="dots-three-horizontal" color={"#fff"} size={20} />
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center justify-center">
        {/* <Image
          source={{ uri: `http://10.0.1.106:8000/files/${post.image?.key}` }}
          style={{ aspectRatio: 1 }}
          resizeMode="contain"
          className="w-full"
        /> */}

        <FotoZoom url={`http://10.0.1.106:8000/files/${post.image?.key}`} />
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
              like(postId);
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
