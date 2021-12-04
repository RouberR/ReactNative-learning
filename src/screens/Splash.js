import React, { useEffect } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import logo from '../../assets/img/logo.png'
import GlobalStyle from '../utils/GlobalStyle'
import PushNotification from 'react-native-push-notification'
const Login = ({ navigation }) => {

  useEffect(() => {
    createChannels()
    setTimeout(() => {
      navigation.replace('My Tasks')
    }, 1500)
  }, [])

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'task-channel',
      channelName: 'Task Channel'
    })
  }

  return (
    <View style={styles.body}>
      <Image style={styles.logo} source={logo} />
      <Text style={[styles.text, GlobalStyle.CustomFontBold]}>To-Do List</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#04C5F2',
    justifyContent: 'center',
  
  },
  logo: {
    width: 350,
    height: 350,
    margin: 10,
   
  },
  text: {
    fontSize: 50,
    textShadowColor: 'black',
    color: '#ffffff',
    marginBottom: 40
  }
})

export default Login
