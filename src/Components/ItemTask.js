import React, { useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, FlatList, Text, Alert } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux'
import { setTasks, setTasksID } from '../redux/actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import GlobalStyle from '../utils/GlobalStyle'
import CheckBox from '@react-native-community/checkbox'
const ItemTask = ({ item, navigation }) => {
  const { tasks } = useSelector(state => state.taskReducer)
  const dispatch = useDispatch()
  const checkTask = (id, newValue) => {
    let index = tasks.findIndex(task => task.ID === id)
    if (index > -1) {
      let newTasks = [...tasks]
      newTasks[index].Done = newValue
      AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
        .then(() => {
          dispatch(setTasks(newTasks))
        })
        .catch(err => console.log(err))
    }
  }
  const deleteTasl = id => {
    const filteredTasks = tasks.filter(task => task.ID !== id)
    AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
      .then(() => {
        dispatch(setTasks(filteredTasks))
      })
      .catch(err => console.log(err))
  }
  return (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: item.Color }]}
      onPress={() => {
        dispatch(setTasksID(item.ID))
        navigation.navigate('Task')
      }}
    >
      <View style={styles.item_row}>
        <CheckBox
          value={item.Done}
          onValueChange={newValue => {
            checkTask(item.ID, newValue)
          }}
        />
        <View style={styles.item_body}>
          <Text style={GlobalStyle.TaskHeaderText} numberOfLines={2}>
            {item.Title}
          </Text>
          <Text style={GlobalStyle.TaskSubText}>{item.Desc}</Text>
        </View>
        <TouchableOpacity
          style={styles.delete}
          onPress={() => {
            deleteTasl(item.ID)
          }}
        >
          <FontAwesome5 name={'trash'} size={25} color={'red'} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 5,
    marginVertical: 7,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5
  },
  item_row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  item_body: {
    flex: 1
  },
  delete: {
    width: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ItemTask
