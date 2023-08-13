

import React, { useEffect, useState } from 'react';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import { launchImageLibrary, launchCamera } from 'react-native-image-picker'
import TextRecognition from '@react-native-ml-kit/text-recognition';




function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [image, setImage] = useState("")
  const [text, setText] = useState()



  const pickImage = async () => {
    console.log("working");
    // No permissions request is necessary for launching the image library
    let result = await launchImageLibrary({ mediaType: 'photo' })
    if (result != undefined) {
      setImage(result.assets[0].uri)
    }
  };

  const openCamera = async () => {
    let result = launchCamera({
      mediaType: 'photo'
    }, (result) => {
      setImage(result.assets[0].uri)
    });
  }





  const recognizeText = async () => {
    if (image != "") {
      const result = await TextRecognition.recognize(image);
      if (result != undefined) {
        setText(result.text)
      }
    }

  }

  useEffect(() => {
    recognizeText()
  }, [image])



  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}

      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
      >


        <View style={{ justifyContent: 'center', alignItems: "center", marginTop: 64 }}>
          <Text>Testing</Text>
          <View style={{ flexDirection: "row" }}>
            <Button onPress={pickImage} title='Pick Image' />
            <Button onPress={openCamera} title='open Camera' />
          </View>
          <Text style={{ textAlign: 'justify', fontSize: 32 }}>{text}</Text>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
