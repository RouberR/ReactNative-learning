import React, {  } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import ItemTask from '../Components/ItemTask'
const Done = ({ navigation }) => {
  const { tasks } = useSelector(state => state.taskReducer)



  return (
    <View style={styles.body}>
      <FlatList
        data={tasks.filter(task => task.Done === true)}
        renderItem={({ item }) => (
          <ItemTask item={item} navigation={navigation}/>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
})

export default Done
