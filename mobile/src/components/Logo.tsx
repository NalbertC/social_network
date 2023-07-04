import { Text, View } from "react-native";

interface LogoProps {
}

export function Logo ({}: LogoProps) {
    return (
        <View className="h-14 bg-slate-500 justify-center">
          <Text className="text-textPrincipal text-2xl font-[helveticaBold]">r</Text>
        </View>
    )
}