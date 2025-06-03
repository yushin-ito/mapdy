import type { UseMutationResult } from "@/types";
import { supabase } from "@/utils/supabase";
import type { AuthError, Provider } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";

export type SignInWithOAuthResponse = Awaited<
  ReturnType<typeof signInWithOAuth>
>;

WebBrowser.maybeCompleteAuthSession();
const redirectTo = makeRedirectUri();

const getSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);
  if (errorCode) {
    throw new Error(errorCode);
  }

  const { access_token, refresh_token } = params;
  if (!access_token) {
    return;
  }

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });

  if (error) {
    throw error;
  }

  return data.session;
};

const signInWithOAuth = async (provider: Provider) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  });
  if (error) {
    throw error;
  }

  const res = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

  if (res.type === "success") {
    const { url } = res;
    await getSessionFromUrl(url);
  }

  return res;
};

export const useSignInWithOAuth = ({
  onSuccess,
  onError,
}: UseMutationResult<SignInWithOAuthResponse, AuthError>) =>
  useMutation({
    mutationFn: signInWithOAuth,
    onSuccess,
    onError,
  });
