import { Camera, Image } from "@tamagui/lucide-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Sheet, type SheetProps, YStack } from "tamagui";
import { Button } from "../Button";

interface ImagePickerSheetProps extends SheetProps {
  onImagePicked: (image: string) => void;
}

export const ImagePickerSheet = ({
  onImagePicked,
  ...props
}: ImagePickerSheetProps) => {
  const [position, setPosition] = useState(0);
  const { t } = useTranslation("common");

  const takePhoto = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();

    if (!granted) {
      return; // todo: feedback to user
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
    });

    if (!result.canceled) {
      onImagePicked(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!granted) {
      return; // todo: feedback to user
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onImagePicked(result.assets[0].uri);
    }
  };

  return (
    <Sheet
      modal
      snapPoints={[28]}
      position={position}
      onPositionChange={setPosition}
      dismissOnSnapToBottom
      {...props}
    >
      <Sheet.Overlay
        bg="black"
        opacity={0.5}
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Sheet.Handle h="$1" mx="40%" />
      <Sheet.Frame
        flex={1}
        justify="space-between"
        px="$6"
        py="$8"
        rounded="$4xl"
      >
        <YStack gap="$4">
          <Button
            variant="ghost"
            justify="flex-start"
            gap="$3"
            onPress={pickImage}
          >
            <Button.Icon>
              <Image size="$5" />
            </Button.Icon>
            <Button.Text>{t("choose_from_library")}</Button.Text>
          </Button>
          <Button
            variant="ghost"
            justify="flex-start"
            gap="$3"
            onPress={takePhoto}
          >
            <Button.Icon>
              <Camera size="$5" />
            </Button.Icon>
            <Button.Text>{t("take_a_photo")}</Button.Text>
          </Button>
        </YStack>
        <Button variant="ghost" onPress={() => props.onOpenChange?.(false)}>
          <Button.Text>{t("cancel")}</Button.Text>
        </Button>
      </Sheet.Frame>
    </Sheet>
  );
};
