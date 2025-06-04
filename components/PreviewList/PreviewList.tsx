import type { Post } from "@/types";
import { useCallback, useRef } from "react";
import { FlatList, type FlatListProps } from "react-native";
import { View, useWindowDimensions } from "tamagui";
import { PreviewItem } from "./PreviewItem";

interface PreviewListProps extends FlatListProps<Post> {}

export const PreviewList = () => {
  const ref = useRef<FlatList>(null);
  const { width } = useWindowDimensions();

  const scrollToOffset = useCallback(
    async (index: number) => {
      if (ref.current) {
        ref.current.scrollToOffset({
          animated: true,
          offset: width * index,
        });
      }
    },
    [width],
  );

  return (
    <View position="absolute" b="$24">
      <FlatList
        ref={ref}
        horizontal
        pagingEnabled
        data={undefined}
        renderItem={() => <PreviewItem />}
        style={{ width }}
      />
    </View>
  );
};
