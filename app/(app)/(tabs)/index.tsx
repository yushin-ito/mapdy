import { PreviewList } from "@/components/PreviewList";
import { useRef } from "react";
import MapView from "react-native-maps";
import { View } from "tamagui";

const MapPage = () => {
  const ref = useRef(null);

  return (
    <View flex={1}>
      <MapView ref={ref} style={{ flex: 1 }} />
      <PreviewList />
    </View>
  );
};

export default MapPage;
