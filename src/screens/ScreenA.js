import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GlobalStyle from '../utils/GlobalStyle'
const ScreenA = ({ navigation }) => {
  const onPressHandler = () => {
    navigation.navigate('Screen_B', {ItenName: "Item from Screen A", ItemId: 12})
  }
  return (
    <View style={styles.body}>
      <Text style={[
        GlobalStyle.CustomFont,
        styles.text]}>ScreenA</Text>
      <Pressable  onPress={onPressHandler} style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#0f0' })}>
        <Text style={GlobalStyle.ButtonText}>Go to Screen B</Text>
      </Pressable>
    </View>
  )
}

export default ScreenA

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  text: {
    fontSize: 40,
  }
})
