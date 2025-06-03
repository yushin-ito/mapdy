import { Button } from "@/components/Button";
import { useSignOut } from "@/hooks/useSignOut";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner-native";
import { YStack } from "tamagui";

const SettingsPage = () => {
  const { t } = useTranslation("walkthrough");

  const { mutateAsync: mutateAsyncSignOut } = useSignOut({
    onSuccess: () => {
      toast.success(t("success"));
    },
    onError: () => {
      toast.error(t("error"));
    },
  });

  return (
    <YStack flex={1} items="center" justify="center" gap="$4">
      <Button variant="primary" onPress={() => mutateAsyncSignOut()}>
        <Button.Text>Sign Out</Button.Text>
      </Button>
      <Link href="/" asChild>
        <Button variant="primary">
          <Button.Text>home</Button.Text>
        </Button>
      </Link>
    </YStack>
  );
};

export default SettingsPage;
