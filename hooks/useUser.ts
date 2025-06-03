import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

export type GetUserResponse = Awaited<ReturnType<typeof getUser>>;

const getUser = async (id: string | undefined) => {
  if (!id) {
    return;
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const useUser = () => {
  const { session } = useAuth();

  return useQuery({
    queryKey: ["user", session?.user.id],
    queryFn: async () => await getUser(session?.user.id),
  });
};
