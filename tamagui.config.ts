import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui } from "tamagui";
import { fonts } from "./theme/fonts";
import { shorthands } from "./theme/shorthands";
import { themes } from "./theme/themes";
import { tokens } from "./theme/tokens";

export const config = createTamagui({
  ...defaultConfig,
  fonts,
  themes,
  tokens,
  shorthands,
});

type CustomConfig = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends CustomConfig {}
}
