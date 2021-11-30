import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GlobalStyle from '../utils/GlobalStyle'
const ScreenB = ({navigation, route}) => {

  const {ItenName, ItemId} = route.params

  const onPressHandler = () => {
    // navigation.navigate('Screen_A')
    navigation.goBack()
  }
  return (
    <View style={styles.body}>
      <Text style={styles.text}>ScreenB</Text>
      <Pressable onPress={onPressHandler} style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#0f0' })}>
        <Text style={GlobalStyle.ButtonText}>Go to Back</Text>
      </Pressable>

      <Text style={styles.text}>{ItenName}</Text>
      <Text style={styles.text}>ID: {ItemId}</Text>
    </View>
  )
}

export default ScreenB

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold'
  }
})
