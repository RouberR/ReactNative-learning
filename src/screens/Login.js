import React, { useEffect } from 'react'
import { View, StyleSheet, Image, Text, TextInput, Alert } from 'react-native'
import { useState } from 'react/cjs/react.development'
import logo from '../../assets/img/game.png'
import CustomButton from '../utils/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Login = ({ navigation }) => {
  const [name, setName] = useState('')

  const getData = () => {
    try {
      AsyncStorage.getItem("UserName").then(value => {
        if(value != null ){
         navigation.navigate("Home")
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const onPressHandler = async () => {
    if (name.length == 0) {
      Alert.alert('Warning', 'Please write your name')
    } else {
      try {
        await AsyncStorage.setItem('UserName', name)
        navigation.navigate('Home')
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <View style={styles.body}>
      <Image style={styles.logo} source={logo} />
      <Text style={styles.text}>Async Storage</Text>
      <TextInput style={styles.input} placeholder="Enter your name" onChangeText={value => setName(value)} />
      <CustomButton text={'Login'} color={'#1eb900'} style={{ margin: 10 }} onPressHandler={onPressHandler} />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#72B9EC'
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
    margin: 40
  },
  text: {
    fontSize: 24,
    color: '#fff'
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    backgroundColor: '#fff',
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 20,
    marginTop: 100,
    marginBottom: 10
  }
})

export default Login
