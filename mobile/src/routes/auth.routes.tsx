import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Home } from "../screens/Home";
import { Profile } from "../screens/Profile";
import { UpdateImageProfile } from "../screens/UpdateImageProfile";
import { ViewPhotoProfile } from "../screens/ViewPhotoProfile";
import { ViewPost } from "../screens/ViewPost";

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
      <Screen name="home" component={Home} />
      <Screen name="post" component={ViewPost} />
      <Screen name="profile" component={Profile} />
      <Screen name="photoProfile" component={ViewPhotoProfile} />
      <Screen name="updateImageProfile" component={UpdateImageProfile} />
    </Navigator>
  );
}
