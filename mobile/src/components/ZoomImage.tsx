import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { Image } from "react-native";
import ImageView from "react-native-image-zoom-viewer";

interface ZoomImageProps {
  url: string;
}

export function ZoomImage({ url }: ZoomImageProps) {
  const images = [
    {
      url,
    },
  ];

  return (
    <ImageView
      imageUrls={images}
      enableSwipeDown
      saveToLocalByLongPress={false}
      // renderIndicator={}
      style={{ width: "100%" }}
      renderImage={(prop) => <Image {...prop} resizeMode="contain" />}
    />
  );
}

export function FotoZoom({ url }: ZoomImageProps) {
  return (
    <ReactNativeZoomableView>
      <Image
        source={{ uri: url }}
        style={{ aspectRatio: 1 }}
        resizeMode="contain"
        className="w-full"
      />
    </ReactNativeZoomableView>
  );
}
