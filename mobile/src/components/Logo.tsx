import { Text, View } from "react-native";

interface LogoProps {
}

export function Logo ({}: LogoProps) {
    return (
        <View className="h-10 justify-center items-center">
          <Text className="text-textPrincipal text-2xl font-[helveticaBold]">rolapapo</Text>
        </View>
    )
}