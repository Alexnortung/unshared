import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

const App = () => {
    const [camera, setCamera] = useState()
    const takePicture = async () => {
      if (camera) {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        // console.log(data.uri);
      }
    }
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            setCamera(ref);
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            // console.log(barcodes);
          }}
        />
        <View style={styles.topLayer}>
          {/* options */}
          <View style={styles.optionsView}>
            <TouchableOpacity>
              <Text>
                Flip
              </Text>
              <Text>
                Flash
              </Text>
            </TouchableOpacity>
          </View>
          {/* Bottom button */}
          <View style={styles.captureView}>
            <TouchableOpacity onPress={takePicture} style={styles.capture}>
              {/* <Text style={{ fontSize: 14 }}> SNAP </Text> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
}



const captrueDiameter = 80

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(1, 1, 1, 0)',
  },
  capture: {
    width: captrueDiameter,
    height: captrueDiameter,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 100,
    marginBottom: 30,
  },
  optionsView: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  topLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});

export default App