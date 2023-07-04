import { TouchableOpacity, View } from "react-native";
import { Header } from "../components/Header";

import { } from "@expo/vector-icons";
import { Button } from "../components/Button";

interface HomeProps {}

export function Home({}: HomeProps) {
  return (
    <View className="flex-1 bg-background px-4 pt-6">
      <Header />
      <TouchableOpacity activeOpacity={0.9}>
        <Button />
      </TouchableOpacity>
    </View>
  );
}
