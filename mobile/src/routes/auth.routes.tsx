import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Home } from "../screens/Home";

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />

    </Navigator>
  );
}
