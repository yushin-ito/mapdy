import { useUser } from "@/hooks/useUser";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

const AppLayout = () => {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="onboarding" />
      </Stack.Protected>
    </Stack>
  );
};

export default AppLayout;
