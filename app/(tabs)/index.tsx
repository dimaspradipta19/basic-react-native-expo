import { StyleSheet, Image, Alert, StatusBar, } from 'react-native';
import { View } from '../../components/Themed';
import { captureRef } from 'react-native-view-shot';
import { useState, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ImageViewer from '../../components/ImageViewer';
import Button from '../../components/Button';
import * as ImagePicker from 'expo-image-picker';
import IconButton from '../../components/IconButton';
import CircleButton from '../../components/CircleButton';
import EmojiPicker from "../../components/EmojiPicker";
import EmojiList from '../../components/EmojiList';
import EmojiSticker from '../../components/EmojiSticker';
import * as MediaLibrary from 'expo-media-library';

const PlaceholderImage = require('../../assets/images/background-image.png');

export default function TabOneScreen() {

  const [selectedImage, setSelectedImage] = useState("")
  const [showAppOption, setShowAppOption] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();


  if (status === null) {
    requestPermission();
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    });

    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.assets[0].uri);
      setShowAppOption(true)
    } else {
      alert('You did not select any image.');
    }
  }

  const onReset = () => {
    setShowAppOption(true);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };
  const imageRef = useRef();

  const onSaveImageAsync = async () => {
    
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <GestureHandlerRootView style={styles.container}>
      {/* <View style={styles.container}> */}
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false} style={{ backgroundColor: "#25292e" }}>
          <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji !== null ? (<EmojiSticker imageSize={40} stickerSource={pickedEmoji} />) : null}
        </View>
      </View>

      {showAppOption ?
        <View style={styles.footerContainer}>
          <Button label='Choose a Picture' theme='primary' onPress={pickImageAsync}></Button>
          <Button label='Use this Picture' theme='secondary' onPress={() => setShowAppOption(false)}></Button>
        </View>
        :
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      }

      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar />
      {/* </View> */}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
    backgroundColor: '#25292e',

  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
    backgroundColor: '#25292e',
  },

  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },

  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: "#25292e"
  },
});
