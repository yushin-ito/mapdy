import { Button } from "@/components/Button";
import { ImagePickerSheet } from "@/components/ImagePickerSheet";
import { onboardingSchema } from "@/schemas/app";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Image, UserRound } from "@tamagui/lucide-icons";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Keyboard, Pressable, SafeAreaView } from "react-native";
import {
  Avatar,
  Form,
  H1,
  Label,
  Text,
  View,
  VisuallyHidden,
  YStack,
} from "tamagui";
import type { z } from "zod/v4";

const avatarUrlSchema = onboardingSchema.pick({ avatarUrl: true });
type FormData = z.infer<typeof avatarUrlSchema>;

console.log("ImagePickerSheet is:", ImagePickerSheet);

const AvatarPage = () => {
  const { t } = useTranslation("onboarding");
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name?: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: standardSchemaResolver(avatarUrlSchema),
  });

  const onSubmit = (data: FormData) => {};

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <YStack flex={1} pt="$8" px="$8" gap="$8">
          <YStack gap="$1">
            <H1 fontSize="$2xl" fontWeight="bold">
              {t("avatar.title")}
            </H1>
            <Text fontSize="$md" color="$mutedColor">
              {t("avatar.description")}
            </Text>
          </YStack>

          <Form
            flex={1}
            items="center"
            justify="space-between"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="avatarUrl"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <YStack gap="$1.5">
                  <VisuallyHidden>
                    <Label htmlFor="avatarUrl">{t("avatar.label")}</Label>
                  </VisuallyHidden>
                  <Pressable onPress={() => setIsOpen(true)}>
                    <YStack position="relative">
                      <Avatar circular size="$40">
                        <Avatar.Image
                          accessibilityLabel="avatar"
                          src={undefined}
                        />
                        <Avatar.Fallback
                          items="center"
                          justify="center"
                          bg="$mutedBackground"
                        >
                          <UserRound size="$20" color="$mutedColor" />
                        </Avatar.Fallback>
                      </Avatar>
                      <View
                        position="absolute"
                        p="$2"
                        b="$1"
                        r="$1"
                        bg="black"
                        opacity={0.6}
                        rounded="$full"
                      >
                        <Image size="$5" color="$primaryColor" />
                        <VisuallyHidden>
                          <Text color="$primaryColor" fontSize="$sm">
                            {t("avatar.placeholder")}
                          </Text>
                        </VisuallyHidden>
                      </View>
                    </YStack>
                  </Pressable>
                  {errors.avatarUrl && (
                    <Text
                      text="center"
                      fontSize="$sm"
                      color="$destructiveBackground"
                    >
                      {t(`avatar.${errors.avatarUrl.message}`)}
                    </Text>
                  )}
                </YStack>
              )}
            />
            <YStack w="100%" gap="$4">
              <Form.Trigger asChild>
                <Button variant="primary">
                  <Button.Text>{t("avatar.submit")}</Button.Text>
                </Button>
              </Form.Trigger>
              <Link href="/onboarding/avatar" asChild>
                <Button variant="link" onPress={Keyboard.dismiss}>
                  <Button.Text>{t("avatar.skip")}</Button.Text>
                </Button>
              </Link>
            </YStack>
          </Form>
        </YStack>
      </SafeAreaView>
      <ImagePickerSheet
        open={isOpen}
        onOpenChange={setIsOpen}
        onImagePicked={(uri) => {
          console.log(uri);
        }}
      />
    </>
  );
};

export default AvatarPage;
