import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { Loading } from "./src/components/Loading";
import { AuthProvider } from "./src/contexts/Auth";
import { Routes } from "./src/routes";
import { loadFonts } from "./src/utils/Font";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadApp = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };

    loadApp();
  }, []);

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </>
  );
}
