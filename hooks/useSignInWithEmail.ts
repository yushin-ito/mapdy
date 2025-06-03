import type { UseMutationResult } from "@/types";
import { supabase } from "@/utils/supabase";
import type { AuthError } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { makeRedirectUri } from "expo-auth-session";

export type SignInWithEmailResponse = Awaited<
  ReturnType<typeof signInWithEmail>
>;

const redirectTo = makeRedirectUri();

const signInWithEmail = async (email: string) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
    },
  });

  if (error) {
    throw error;
  }

  return data;
};

export const useSignInWithEmail = ({
  onSuccess,
  onError,
}: UseMutationResult<SignInWithEmailResponse, AuthError>) =>
  useMutation({
    mutationFn: signInWithEmail,
    onSuccess,
    onError,
  });
