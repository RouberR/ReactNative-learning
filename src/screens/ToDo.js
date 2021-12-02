import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const Todo = () => {
  return (
    <View style={styles.body}>
      <TouchableOpacity style={styles.button}>
        <FontAwesome5 name={'plus'} size={22} color={'#ffffff'} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0080ff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    elevation: 5
  }
})

export default Todo
