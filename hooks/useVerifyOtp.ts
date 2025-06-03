import type { UseMutationResult } from "@/types";
import { supabase } from "@/utils/supabase";
import type { AuthError } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";

export type VerifyOtpResponse = Awaited<ReturnType<typeof verifyOtp>>;

const verifyOtp = async ({
  email,
  token,
}: { email: string; token: string }) => {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });
  if (error) {
    throw error;
  }

  return data;
};

export const useVerifyOtp = ({
  onSuccess,
  onError,
}: UseMutationResult<VerifyOtpResponse, AuthError>) =>
  useMutation({
    mutationFn: verifyOtp,
    onSuccess,
    onError,
  });
