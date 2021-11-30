import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import GlobalStyle from './GlobalStyle'

export default function CustomButton({ text="text", color="green", onPressHandler, style }) {
  return (
    <Pressable
      onPress={onPressHandler}
      hitSlop={{top: 15, button:15, right:15, left:15}}
      android_ripple={{color: "blue" }}
      style={({ pressed }) => [{ backgroundColor: pressed ? '#dddddd' : `${color}` },
       styles.button,
       {...style}]}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 50,
    alignItems: 'center',
    // borderRadius: 40
  },
  text: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center'
  }
})
