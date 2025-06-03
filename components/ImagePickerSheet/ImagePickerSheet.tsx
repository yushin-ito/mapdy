import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Sheet, type SheetProps } from "tamagui";
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
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
    });

    if (!result.canceled) {
      onImagePicked(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
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
      native={true}
      snapPoints={[40]}
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
      <Sheet.Handle />
      <Sheet.Frame h="$40" gap="$4">
        <Button variant="ghost">
          <Button.Text onPress={pickImage}>
            {t("choose_from_library")}
          </Button.Text>
        </Button>
        <Button variant="ghost">
          <Button.Text onPress={takePhoto}>{t("take_a_photo")}</Button.Text>
        </Button>
      </Sheet.Frame>
    </Sheet>
  );
};
