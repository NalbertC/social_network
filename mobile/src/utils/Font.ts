import * as Font from "expo-font";

const loadFonts = async () => {
  await Font.loadAsync({
    helvetica: require("../assets/Helvetica-Font/Helvetica.ttf"),
    helveticaBold: require("../assets/Helvetica-Font/Helvetica-Bold.ttf"),
  });
};

export { loadFonts };
