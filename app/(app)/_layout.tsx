import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { Stack } from "expo-router";

const AppLayout = () => {
  const { session } = useAuth();

  const { data: user, isLoading } = useQuery(
    supabase
      .from("users")
      .select("*")
      .eq("id", session?.user.id ?? "")
      .single(),
  );

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
