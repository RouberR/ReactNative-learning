import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import GlobalStyle from '../utils/GlobalStyle'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomButton from '../utils/CustomButton'

const Home = ({ navigation }) => {
  const [name, setName] = useState("")
  const getData = () => {
    try {
      AsyncStorage.getItem("UserName").then(value => {
        if(value != null ){
          setName(value)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const updateData = async () => {
    if (name.length == 0) {
      Alert.alert('Warning', 'Please write your name')
    } else {
      try {
        await AsyncStorage.setItem('UserName', name)
        Alert.alert("Success!", "Your data has been updated")
      } catch (error) {
        console.log(error)
      }
    }
  }

  const removeData = async () => {
      try {
        await AsyncStorage.removeItem('UserName')
        Alert.alert("Success!", "Your name has been rempve")
        navigation.navigate('Login')
      } catch (error) {
        console.log(error)
      }
  }

  useEffect(() => {
    getData()
  },[])


  return (
    <View style={styles.body}>
      <Text style={[
        GlobalStyle.CustomFont,
        styles.text]}>Welcome {name}</Text>
      <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={(value) => setName(value)}/>
      <CustomButton onPressHandler={updateData} text={"Update"} />
      <CustomButton onPressHandler={removeData} text={"Remove name"} color={"red"} style={{marginTop:15}}/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  text: {
    fontSize: 40,
  },
  input:{
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
