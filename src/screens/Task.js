import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setTasksID, setTasks } from '../redux/actions'
import CustomButton from '../utils/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function Task({ navigation }) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

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
          Desc: desc
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
  }
})
