import type { UseMutationResult } from "@/types";
import { supabase } from "@/utils/supabase";
import type { AuthError } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";

export type SignOutResponse = Awaited<ReturnType<typeof signOut>>;

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
};

export const useSignOut = ({
  onSuccess,
  onError,
}: UseMutationResult<SignOutResponse, AuthError>) =>
  useMutation({
    mutationFn: signOut,
    onSuccess,
    onError,
  });
