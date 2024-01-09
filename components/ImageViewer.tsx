import { StyleSheet, Image, ImageSourcePropType } from 'react-native';

//adding type for imageviewrprops
type ImageViewerProps = { placeholderImageSource: ImageSourcePropType, selectedImage: string };

export default function ImageViewer({ placeholderImageSource, selectedImage }: ImageViewerProps) {
  const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource
  return (
    <Image source={imageSource} style={styles.image} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
