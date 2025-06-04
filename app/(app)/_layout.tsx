import { useUser } from "@/hooks/useUser";
import { Stack } from "expo-router";

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
      <Stack.Screen name="crop" />
    </Stack>
  );
};

export default AppLayout;
