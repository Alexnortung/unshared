import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Camera from './views/Camera.js';
import SendImage from './views/SendImage.js';

const App = () => {
    const [currentPicture, setCurrentPicture] = useState(null)

    const onTakePicture = (data) => {
        // data from RNCamera
        // setCurrentPicture(`data:image/jpg;base64,${data.base64}`)
        setCurrentPicture(data.uri)
    }

    const currentView = () => {
        if (currentPicture !== null) {
            console.log("Current view is now SendImage")
            return (
                <SendImage
                    onClose={() => setCurrentPicture(null)}
                    image={currentPicture} />
            )
        }
        console.log("Current view is now Camera")
        return (
            <Camera 
                onTakePicture={onTakePicture} />
        )
    }

    return (
        <>
            {currentView()}
        </>
    )
}

export default App