import React, { useEffect } from 'react'
import { View, StyleSheet, Image, Text, TextInput, Alert } from 'react-native'
import { useState } from 'react/cjs/react.development'
import logo from '../../assets/img/game.png'
import CustomButton from '../utils/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux'
import { setName } from '../redux/actions'
import GlobalStyle from '../utils/GlobalStyle'
const Login = ({ navigation }) => {

  const {name} = useSelector(state=>state.userReducer)
  const dispatch = useDispatch()
  // const [name, setName] = useState('')



 

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("My Tasks")
    }, 1500)
  },[])

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
    backgroundColor: '#1D8DEE',
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    margin: 20
  },
  text: {
    fontSize: 40,
    textShadowColor: "black",
    color: '#ffffff',
    marginBottom: 40
  },
})

export default Login
