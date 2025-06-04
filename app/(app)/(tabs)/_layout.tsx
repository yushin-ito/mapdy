import { Icons } from "@/components/Icons";
import { navConfig } from "@/config/nav";
import { usePathname } from "expo-router";
import { TabList, TabSlot, TabTrigger, Tabs } from "expo-router/ui";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, XStack, YStack } from "tamagui";

const TabLayout = () => {
  const { t } = useTranslation("common");
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  return (
    <Tabs>
      <TabSlot />
      <TabList asChild>
        <XStack
          pt="$3"
          px="$8"
          pb={insets.bottom + 2}
          items="center"
          justify="space-between"
        >
          {navConfig.map((item) => {
            const isActive = pathname === item.href;
            const Icon = Icons[item.icon as keyof typeof Icons];

            return (
              <TabTrigger key={item.key} name={item.name} href={item.href}>
                <YStack gap="$1" items="center">
                  <Icon size="$5" color="$color" opacity={isActive ? 1 : 0.6} />
                  <Text
                    fontSize="$sm"
                    color="$color"
                    opacity={isActive ? 1 : 0.6}
                  >
                    {t(item.key)}
                  </Text>
                </YStack>
              </TabTrigger>
            );
          })}
        </XStack>
      </TabList>
    </Tabs>
  );
};

export default TabLayout;
