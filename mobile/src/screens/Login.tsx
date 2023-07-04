import { TouchableOpacity, View } from "react-native";
import { Button } from "../components/Button";

interface LoginProps {
}

export function Login ({}: LoginProps) {
    return (
      <View className="flex-1 bg-background px-4 pt-6">

        <TouchableOpacity activeOpacity={0.9}>
          <Button />
        </TouchableOpacity>
      </View>
    );
}