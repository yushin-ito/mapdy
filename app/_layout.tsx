import "expo-dev-client";
import "@/locales";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/context/AuthProvider";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/client";
import { config } from "@/tamagui.config";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AppState, type AppStateStatus, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Toaster } from "sonner-native";
import { SWRConfig } from "swr";
import { PortalProvider, TamaguiProvider } from "tamagui";

SplashScreen.preventAutoHideAsync();

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <SWRConfig
        value={{
          provider: () => new Map(),
          isVisible: () => {
            return true;
          },
          initFocus(callback) {
            let appState = AppState.currentState;

            const onAppStateChange = (nextAppState: AppStateStatus) => {
              if (
                appState.match(/inactive|background/) &&
                nextAppState === "active"
              ) {
                callback();
              }
              appState = nextAppState;
            };

            const subscription = AppState.addEventListener(
              "change",
              onAppStateChange,
            );

            return () => {
              subscription.remove();
            };
          },
        }}
      >
        <TamaguiProvider
          config={config}
          defaultTheme={colorScheme === "dark" ? "dark" : "light"}
        >
          <ThemeProvider>
            <PortalProvider shouldAddRootHost>
              <GestureHandlerRootView>
                <SafeAreaProvider>
                  <KeyboardProvider>
                    <StatusBar
                      style={colorScheme === "dark" ? "light" : "dark"}
                    />
                    <RootNavigator />
                    <Toaster />
                  </KeyboardProvider>
                </SafeAreaProvider>
              </GestureHandlerRootView>
            </PortalProvider>
          </ThemeProvider>
        </TamaguiProvider>
      </SWRConfig>
    </AuthProvider>
  );
};

const RootNavigator = () => {
  const { session, isLoading } = useAuth();
  const isAuth = session !== null;

  if (isLoading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isAuth}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={isAuth}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
    </Stack>
  );
};

export default RootLayout;
