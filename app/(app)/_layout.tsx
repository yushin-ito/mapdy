import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";
import { Stack } from "expo-router";

const AppLayout = () => {
  const { session } = useAuth();

  const { data: user, isLoading } = useQuery(
    supabase
      .from("users")
      .select("id")
      .eq("id", session?.user.id ?? "")
      .single()
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
