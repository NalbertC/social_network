import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

import { useAuth } from "../hooks/useAuth";

interface NavbarProps {
  screen?: string;
}

export function Navbar({ screen }: NavbarProps) {
  const { user } = useAuth();

  const { navigate } = useNavigation();

  return (
    <View className="h-12 w-full bg-card border-background border-t flex-row items-center justify-between px-4">
      <TouchableOpacity
        activeOpacity={0.7}
        className="relative"
        onPress={() => navigate("home")}
      >
        {screen === "home" ? (
          <MaterialCommunityIcons name="home-variant" size={28} color={"#2374e1"} />
        ) : (
          <MaterialCommunityIcons name="home-variant-outline" size={28} color={"#fff"} />
        )}
      </TouchableOpacity>

      <Feather name="search" size={28} color={"#fff"} />

      <TouchableOpacity activeOpacity={0.7} className="relative">
        <Feather name="message-circle" size={28} color={"#fff"} />
        <View className="h-3 bg-red-500 w-3 rounded-full absolute top-0 right-0" />
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-cardHover h-8 w-8 rounded-full"
        activeOpacity={0.7}
        onPress={() => navigate("profile")}
      >
        <Image
          source={{ uri: `http://10.0.1.106:8000/files/${user?.imageKey}` }}
          className="w-full h-full rounded-full"
        />
      </TouchableOpacity>
    </View>
  );
}
