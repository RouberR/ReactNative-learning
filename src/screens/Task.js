import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setTasksID, setTasks } from '../redux/actions'
import CustomButton from '../utils/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CheckBox from '@react-native-community/checkbox'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
export default function Task({ navigation }) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [done, setDone] = useState(false)
  const [color, setColor] = useState('#ffffff')

  const { tasks, tasksID } = useSelector(state => state.taskReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    getTask()
  }, [])

  const getTask = () => {
    const Task = tasks.find(task => task.ID === tasksID)
    if (Task) {
      setTitle(Task.Title)
      setDesc(Task.Desc)
      setDone(Task.Done)
      setColor(Task.Color)
    }
  }

  const setTask = () => {
    if (title.length === 0) {
      Alert.alert('Warning!', 'Please write your task title.')
    } else {
      try {
        const Task = {
          ID: tasksID,
          Title: title,
          Desc: desc,
          Done: done,
          Color: color
        }
        const index = tasks.findIndex(task => task.ID === tasksID)
        let newTasks = []
        if (index > -1) {
          newTasks = [...tasks]
          newTasks[index] = Task
        } else {
          newTasks = [...tasks, Task]
        }
        AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
          .then(() => {
            dispatch(setTasks(newTasks))
            Alert.alert('Success!', 'Task saved succesfully')
            navigation.goBack()
          })
          .catch(err => console.log(err))
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <View style={styles.body}>
      <TextInput style={styles.input} value={title} placeholder="Title" onChangeText={value => setTitle(value)} />
      <TextInput
        style={styles.input}
        value={desc}
        placeholder="Description"
        multiline
        onChangeText={value => setDesc(value)}
      />
      <View style={styles.color_bar}>
        <TouchableOpacity
          style={styles.color_white}
          onPress={() => {
            setColor('#ffffff')
          }}
        >
          {color === '#ffffff' && <FontAwesome5 name={'check'} size={25} color={'#000000'} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.color_red}
          onPress={() => {
            setColor('#f28b82')
          }}
        >
          {color === '#f28b82' && <FontAwesome5 name={'check'} size={25} color={'#000000'} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.color_blue}
          onPress={() => {
            setColor('#aecbfa')
          }}
        >
          {color === '#aecbfa' && <FontAwesome5 name={'check'} size={25} color={'#000000'} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.color_green}
          onPress={() => {
            setColor('#ccff90')
          }}
        >
          {color === '#ccff90' && <FontAwesome5 name={'check'} size={25} color={'#000000'} />}
        </TouchableOpacity>
      </View>
      <View style={styles.checkBox}>
        <CheckBox value={done} onValueChange={newValue => setDone(newValue)} />
        <Text style={styles.text}>Is Done</Text>
      </View>
      <CustomButton text="Save Task" color="#11eb90" style={{ width: '100%' }} onPressHandler={setTask} />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'left',
    fontSize: 20,
    margin: 10,
    paddingHorizontal: 10
  },
  checkBox: {
    flexDirection: 'row',
    margin: 10
  },
  text: {
    fontSize: 20,
    color: '#000000'
  },
  color_bar: {
    flexDirection: 'row',
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#555555',
    marginVertical: 10
  },
  color_white: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  color_red: {
    flex: 1,
    backgroundColor: '#f28b82',
    justifyContent: 'center',
    alignItems: 'center'
  },
  color_blue: {
    flex: 1,
    backgroundColor: '#aecbfa',
    justifyContent: 'center',
    alignItems: 'center'
  },
  color_green: {
    flex: 1,
    backgroundColor: '#ccff90',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  }
})
