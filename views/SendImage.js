import React, { useState } from 'react'
import { StyleSheet, Text, Pressable, Image, View } from 'react-native'
import MainStyles from '../styles/main.js'

const SendImage = (props) => {
    // Props:
    // image: image uri
    // onClose: a callback for if the image is closed.

    const [image, setImage] = useState(props.image)

    const close = () => {
        props.onClose()
    }

    return (
        <View style={styles.container}>
            <Image style={styles.container} source={{uri: image}} />
            {/* delete button */}
            <Pressable style={styles.deleteButton} onPress={close}>
                <Text style={{color: '#fff'}}>Close</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    ...MainStyles,
    deleteButton: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
})

export default SendImage