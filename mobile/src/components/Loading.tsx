import { ActivityIndicator, View } from "react-native";

interface LoadingProps {
}

export function Loading ({}: LoadingProps) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

          <ActivityIndicator color="#7c3aed"/>
        </View>
    )
}