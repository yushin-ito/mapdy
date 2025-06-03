import type { ConfigContext, ExpoConfig } from "@expo/config";

export type Extra = {
  storybookEnabled: string | undefined;
  SUPABASE_URL: string | undefined;
  SUPABASE_ANON_KEY: string | undefined;
  eas: {
    projectId: string;
  };
};

export interface ExtendedExpoConfig extends ExpoConfig {
  extra: Extra;
}

export default ({ config }: ConfigContext): ExtendedExpoConfig => ({
  ...config,
  name: "mapdy",
  slug: "mapdy",
  scheme: "mapdy",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  backgroundColor: "#171717",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#171717",
  },
  ios: {
    bundleIdentifier: "com.mapdy.app",
    supportsTablet: true,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    package: "com.mapdy.app",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#171717",
    },
    edgeToEdgeEnabled: true,
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [
    "expo-image-picker",
    "expo-dev-client",
    "expo-web-browser",
    "expo-router",
    "expo-localization",
  ],
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    eas: {
      projectId: "218757d3-0241-4f44-a652-bfab5a42441b",
    },
  },
});
