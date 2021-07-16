import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import MainStyles from '../styles/main.js'
import DoubleClick from 'react-native-double-tap';

const Camera = (props) => {
    // Props:
    // onTakePicture
    const cameraTypes = [
        'back',
        'front',
    ];
    const flashModes = [
        'off',
        'on',
        'auto',
    ]
    const doubleTapMaxDelay = 500 // miliseconds
    const [camera, setCamera] = useState();
    const [cameraType, setCameraType] = useState(0);
    const [flashMode, setFlashMode] = useState(0);
    const [lastCameraPress, setLastCameraPress] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null)
    const takePicture = async () => {
        if (!camera) {
            return
        }
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        console.log(data);
        props.onTakePicture(data)
    }
    const flipCamera = () => {
        setCameraType((cameraType + 1) % cameraTypes.length);
        camera.resumePreview()
    }
    const changeFlashMode = () => {
        setFlashMode((flashMode + 1) % flashModes.length);
    }

    const handleCameraPress = (event) => {
        const pressEvent = event.nativeEvent
        if (timeoutId !== null) {
            clearTimeout(timeoutId)
        }
        if (lastCameraPress === null) {
            // first press
        } else if ( pressEvent.timestamp - lastCameraPress.timestamp <= doubleTapMaxDelay) {
            // double tap
            doubleTapCamera()
            setLastCameraPress(pressEvent)
            return
        }
        setLastCameraPress(pressEvent)
    }

    const singleTapCamera = (coordinates) => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId)
        }
        const newTimeoutId = setTimeout(() => {
            singleTapCameraFunction(coordinates)
            setTimeoutId(null)
        }, doubleTapMaxDelay);
        setTimeoutId(newTimeoutId)
    }
    const singleTapCameraFunction = ({x, y}) => {
        console.log("single tapped camera")
    }

    const doubleTapCamera = ({x, y}) => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId)
        }
        flipCamera()
    }

    return (
        <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        setCamera(ref);
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type[cameraTypes[cameraType]]}
                    flashMode={RNCamera.Constants.FlashMode[flashModes[flashMode]]}
                    onTap={singleTapCamera}
                    onDoubleTap={doubleTapCamera}
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
                    useNativeZoom={true} >
                </RNCamera>
            {/* options */}
            <View style={styles.optionsView}>
                <Pressable
                    onPress={flipCamera}>
                    <Text style={styles.optionsIcon}>
                        Flip
                    </Text>
                </Pressable>
                <Pressable
                    onPress={changeFlashMode}>
                    <Text style={{...styles.optionsIcon, marginBottom: 0}}>
                        Flash: {flashModes[flashMode]}
                    </Text>
                </Pressable>
            </View>
            {/* Bottom button */}
            <View style={styles.captureView}>
                <Pressable onPress={takePicture} style={styles.capture}>
                </Pressable>
            </View>
        </View>
    );
}

const captrueDiameter = 80

const styles = StyleSheet.create({
    ...MainStyles,
    preview: {
        position: 'relative',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'stretch',
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
        backgroundColor: 'rgba(0.4, 0.4, 0.4, 0.5)',
        color: '#fff',
        position: 'absolute',
        top: 5,
        right: 5,
        padding: 10,
        borderRadius: 10,
    },
    optionsIcon: {
        color: '#fff',
        fontSize: 22,
        marginBottom: 5,
    },
    topLayer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
});

export default Camera