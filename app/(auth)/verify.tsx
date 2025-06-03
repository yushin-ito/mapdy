import { Button } from "@/components/Button";
import { OtpInput } from "@/components/OtpInput";
import { useSignInWithEmail } from "@/hooks/useSignInWithEmail";
import { useVerifyOtp } from "@/hooks/useVerifyOtp";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import { toast } from "sonner-native";
import { H1, Text, View, XStack, YStack } from "tamagui";

const VerifyPage = () => {
  const { t } = useTranslation("verify");
  const { email } = useLocalSearchParams<{ email: string }>();

  const { mutateAsync: mutateAsyncVerifyOtp } = useVerifyOtp({
    onError: () => {
      toast.error(t("error"));
    },
  });

  const { mutateAsync: mutateAsyncSignInWithEmail } = useSignInWithEmail({
    onSuccess: () => {
      toast.success(t("success"));
    },
    onError: () => {
      toast.error(t("error"));
    },
  });

  const onEnter = (code: number) => {
    mutateAsyncVerifyOtp({
      email: email as string,
      token: code.toString(),
    });
  };

  const onResend = () => {
    mutateAsyncSignInWithEmail(email);
  };

  return (
    <YStack flex={1} items="center" justify="center" gap="$6">
      <View position="absolute" t="$16" l="$5">
        <TouchableOpacity activeOpacity={0.6} onPress={router.back}>
          <ChevronLeft size="$8" />
        </TouchableOpacity>
      </View>
      <YStack gap="$1">
        <H1 text="center" fontSize="$2xl" fontWeight="bold">
          {t("title")}
        </H1>
        <Text fontSize="$md" color="$mutedColor">
          {t("description")}
        </Text>
      </YStack>
      <OtpInput onEnter={onEnter} />
      <XStack gap="$2" items="center">
        <Text>{t("do_not_receive_code")}</Text>
        <Button
          group
          variant="link"
          h="auto"
          px="$0"
          py="$0"
          onPress={onResend}
        >
          <Button.Text
            color="$primaryBackground"
            $group-press={{ textDecorationLine: "underline" }}
          >
            {t("resend")}
          </Button.Text>
        </Button>
      </XStack>
    </YStack>
  );
};

export default VerifyPage;
