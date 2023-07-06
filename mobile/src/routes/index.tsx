import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { ProfileProvider } from "../contexts/Profile";
import { useAuth } from "../hooks/useAuth";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

interface indexProps {}

export function Routes({}: indexProps) {
  const { user } = useAuth();
  return (
    <View className="flex-1 bg-background">
      <NavigationContainer>
        {user?.id ? (
          <ProfileProvider>
            <AuthRoutes />
          </ProfileProvider>
        ) : (
          <AppRoutes />
        )}
      </NavigationContainer>
    </View>
  );
}
