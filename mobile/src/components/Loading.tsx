import { ActivityIndicator, View } from "react-native";

interface LoadingProps {
}

export function Loading ({}: LoadingProps) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator color="#2374e1" />
      </View>
    );
}