import AsyncStorage from "@react-native-async-storage/async-storage";
import { view } from "./storybook.requires";
import { useColorScheme } from "react-native";
import {
  IBMPlexSansJP_400Regular,
  IBMPlexSansJP_500Medium,
  IBMPlexSansJP_700Bold,
  useFonts,
} from "@expo-google-fonts/ibm-plex-sans-jp"
import { TamaguiProvider } from "tamagui";
import { config } from "../tamagui.config";

const StorybookUI = view.getStorybookUI({
  storage: {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
  },
});

const StorybookUIRoot = () => {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    IBMPlexSansJP_400Regular,
    IBMPlexSansJP_500Medium,
    IBMPlexSansJP_700Bold,
  });

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider
      config={config}
      defaultTheme={colorScheme === "dark" ? "dark" : "light"}
    >
      <StorybookUI />
    </TamaguiProvider>
  );
};

export default StorybookUIRoot;
