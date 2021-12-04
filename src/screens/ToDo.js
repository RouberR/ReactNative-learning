import React, { useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux'
import { setTasks, setTasksID } from '../redux/actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ItemTask from '../Components/ItemTask'
const ToDo = ({ navigation }) => {
  const { tasks } = useSelector(state => state.taskReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    getTasks()
  }, [])

  const getTasks = () => {
    AsyncStorage.getItem('Tasks')
      .then(tasks => {
        const parsedTasks = JSON.parse(tasks)
        if (parsedTasks && typeof parsedTasks === 'object') {
          dispatch(setTasks(parsedTasks))
        }
      })
      .catch(error => console.log(error))
  }

  const onClickNewTask = () => {
    const newId = Math.random()
    dispatch(setTasksID(newId))
    navigation.navigate('Task')
    console.log(newId)
  }
 

  return (
    <View style={styles.body}>
      <FlatList
        data={tasks.filter(task => task.Done === false)}
        renderItem={({ item }) => (
          <ItemTask item={item} navigation={navigation}/>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={onClickNewTask}
      >
        <FontAwesome5 name={'plus'} size={22} color={'#ffffff'} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
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
  },
 
})

export default ToDo
