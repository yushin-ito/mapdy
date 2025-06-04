import { Button } from "@/components/Button";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Image,
  View,
  useWindowDimensions,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  type GestureUpdateEvent,
  type PanGestureHandlerEventPayload,
  type PinchGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Stack, Text, XStack, YStack } from "tamagui";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const CropPage = () => {
  const { t } = useTranslation();
  const { uri } = useLocalSearchParams<{ uri?: string }>();
  const { width, height } = useWindowDimensions();

  const [isLoading, setIsLoading] = useState(true);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const startTranslateX = useSharedValue(0);
  const startTranslateY = useSharedValue(0);

  const scale = useSharedValue(1);
  const startScale = useSharedValue(1);
  const size = useSharedValue<{
    width: number;
    height: number;
  } | null>(null);

  const diameter = width * 0.9;
  const radius = diameter / 2;

  const overlayBorderThickness = Math.max(width, height) * 1.5;

  useEffect(() => {
    if (uri) {
      setIsLoading(true);
      Image.getSize(uri, (width, height) => {
        if (height > width) {
          size.value = {
            width: diameter,
            height: height * (diameter / width),
          };
          translateX.value = withTiming(0, { duration: 50 });
          translateY.value = withTiming(
            (diameter - height * (diameter / width)) / 2,
            { duration: 50 }
          );
        } else {
          size.value = {
            width: width * (diameter / height),
            height: diameter,
          };
          translateX.value = withTiming(
            (diameter - width * (diameter / height)) / 2,
            { duration: 50 }
          );
          translateY.value = withTiming(0, { duration: 50 });
        }

        scale.value = withTiming(1, { duration: 50 });

        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [uri, translateX, translateY, scale, size, diameter]);

  const worklet = () => {
    "worklet";
    if (!size.value) return;

    const currentWidth = size.value.width * scale.value;
    const currentHeight = size.value.height * scale.value;

    const maxOffsetX = Math.max((currentWidth - diameter) / 2, 0);
    const maxOffsetY = Math.max((currentHeight - diameter) / 2, 0);

    translateX.value = Math.min(
      Math.max(translateX.value, -maxOffsetX),
      maxOffsetX
    );
    translateY.value = Math.min(
      Math.max(translateY.value, -maxOffsetY),
      maxOffsetY
    );
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startTranslateX.value = translateX.value;
      startTranslateY.value = translateY.value;
    })
    .onUpdate((event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
      if (!size.value) {
        return;
      }
      translateX.value = startTranslateX.value + event.translationX;
      translateY.value = startTranslateY.value + event.translationY;
      worklet();
    })
    .onEnd(() => {
      worklet();
    });

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      startScale.value = scale.value;
    })
    .onUpdate((event: GestureUpdateEvent<PinchGestureHandlerEventPayload>) => {
      if (!size.value) {
        return;
      }

      const ratio = Math.max(1, startScale.value * event.scale) / scale.value;

      translateX.value = radius - (radius - translateX.value) * ratio;
      translateY.value = radius - (radius - translateY.value) * ratio;
      scale.value = Math.max(1, startScale.value * event.scale);
      worklet();
    })
    .onEnd(() => {
      worklet();
    });

  const animatedStyles = useAnimatedStyle(() => {
    if (!size.value) return {};
    return {
      width: size.value.width,
      height: size.value.height,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  if (isLoading) {
    return (
      <Stack flex={1} justify="center" items="center" bg="$background">
        <ActivityIndicator size="large" color="$color" />
        <Text mt="$2">Loading Image...</Text>
      </Stack>
    );
  }

  return (
    <YStack flex={1} bg="black">
      <GestureDetector gesture={Gesture.Simultaneous(panGesture, pinchGesture)}>
        <Animated.View
          style={{
            position: "absolute",
            top: 20,
            left: 0,
            right: 0,
            bottom: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AnimatedImage source={{ uri }} style={animatedStyles} />
          <View
            style={{
              position: "absolute",
              width: diameter + 2 * overlayBorderThickness,
              height: diameter + 2 * overlayBorderThickness,
              borderRadius: radius + overlayBorderThickness,
              borderWidth: overlayBorderThickness,
              borderColor: "rgba(0, 0, 0, 0.7)",
              left: width / 2 - (radius + overlayBorderThickness),
              top: (height - 20 - 20) / 2 - (radius + overlayBorderThickness),
            }}
            pointerEvents="none"
          />
          <View
            style={{
              position: "absolute",
              width: diameter,
              height: diameter,
              borderRadius: radius,
              borderWidth: 1,
              borderColor: "white",
              left: width / 2 - radius,
              top: (height - 20 - 20) / 2 - radius,
            }}
            pointerEvents="none"
          />
        </Animated.View>
      </GestureDetector>
      <XStack
        position="absolute"
        b={20}
        w="90%"
        self="center"
        justify="space-between"
        px="$2"
      >
        <Button onPress={router.back} size="$4" chromeless>
          <Button.Text color="white">{t("cancel")}</Button.Text>
        </Button>
        <Button onPress={() => {}} size="$4">
          <Button.Text color="white" fontWeight="bold">
            {t("done")}
          </Button.Text>
        </Button>
      </XStack>
    </YStack>
  );
};

export default CropPage;
