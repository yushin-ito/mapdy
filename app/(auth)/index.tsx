import { Button } from "@/components/Button";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { H1, Text, YStack } from "tamagui";

const TopPage = () => {
  const { t } = useTranslation("top");
  const router = useRouter();

  return (
    <YStack
      flex={1}
      bg="$primaryBackground"
      justify="space-between"
      pt="$80"
      px="$8"
      pb="$8"
    >
      <YStack gap="$4">
        <H1
          text="center"
          fontWeight="$bold"
          fontSize="$4xl"
          color="$primaryColor"
        >
          {t("title")}
        </H1>
        <Text
          text="center"
          fontWeight="$bold"
          fontSize="$md"
          color="$primaryColor"
        >
          {t("description")}
        </Text>
      </YStack>
      <YStack gap="$4">
        <Button onPress={() => router.navigate("/signup")}>
          <Button.Text color="$primaryBackground">{t("signup")}</Button.Text>
        </Button>
        <Button group variant="link" onPress={() => router.navigate("/login")}>
          <Button.Text
            color="white"
            $group-press={{ textDecorationLine: "underline" }}
          >
            {t("login")}
          </Button.Text>
        </Button>
      </YStack>
    </YStack>
  );
};

export default TopPage;
