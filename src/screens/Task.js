import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setTasksID, setTasks } from '../redux/actions'
import CustomButton from '../utils/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CheckBox from '@react-native-community/checkbox'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import PushNotification from 'react-native-push-notification'
import { ScrollView } from 'react-native-gesture-handler'
import RNFS from 'react-native-fs'
import { LogBox } from 'react-native';
import GlobalStyle from '../utils/GlobalStyle'
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
export default function Task({ navigation }) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [done, setDone] = useState(false)
  const [color, setColor] = useState('#ffffff')
  const [showBellModal, setShowBellModal] = useState(false)
  const [bellTimeMin, setBellTimeMin] = useState('15')
  const [bellTimeHour, setBellTimeHour] = useState('0')

  const [image, setImage] = useState('')

  const { tasks, tasksID } = useSelector(state => state.taskReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    navigation.addListener('focus', () => {
      getTask()
    })
  }, [image])

  const getTask = () => {
    const Task = tasks.find(task => task.ID === tasksID)
    if (Task) {
      setTitle(Task.Title)
      setDesc(Task.Desc)
      setDone(Task.Done)
      setColor(Task.Color)
      setImage(Task.Image)
    }
  }

  const setTask = () => {
    if (title.length === 0) {
      Alert.alert('Внимание!', 'Пожалуйста напишите заголовок задачи :)')
    } else {
      try {
        const Task = {
          ID: tasksID,
          Title: title,
          Desc: desc,
          Done: done,
          Color: color,
          Image: image
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
            navigation.goBack()
          })
          .catch(err => console.log(err))
      } catch (error) {
        console.log(error)
      }
    }
  }

  const setTaskAlarm = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'task-channel',
      title: title,
      message: desc,
      date: new Date(Date.now() + (parseInt(bellTimeMin) * 60 * 1000) + (parseInt(bellTimeHour) * 3600 * 1000 )),
      allowWhileIdle: true
    })
  }

  const deleteImage = () => {
    RNFS.unlink(image)
      .then(() => {
        const index = tasks.findIndex(task => task.ID === tasksID)
        if (index > -1) {
          let newTasks = [...tasks]
          newTasks[index].Image = ''
          AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
            .then(() => {
              dispatch(setTasks(newTasks))
              getTask()
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  }
  return (
    <ScrollView>
      <View style={styles.body}>
        <Modal
          visible={showBellModal}
          transparent
          onRequestClose={() => setShowBellModal(false)}
          animationType="slide"
          hardwareAccelerated
        >
          <View style={styles.centered_view}>
            <View style={styles.bell_modal}>
              <View style={styles.bell_body}>
                <Text style={GlobalStyle.TaskSubText}>Напомнить через </Text>
                <Text style={GlobalStyle.TaskSubText}>часов:минут</Text>
                <View style={styles.bell_buttons}>
                <TextInput
                  value={bellTimeHour}
                  onChangeText={value => setBellTimeHour(value)}
                  style={styles.bell_input}
                  keyboardType="numeric"
                />     
                <Text style={[styles.text, {fontSize: 25,  marginTop: 20}]}>:</Text>   
                <TextInput
                  value={bellTimeMin}
                  onChangeText={value => setBellTimeMin(value)}
                  style={styles.bell_input}
                  keyboardType="numeric"
                />
                </View>
                
              </View>
              <View style={styles.bell_buttons}>
                <TouchableOpacity style={styles.bell_cancel_button} onPress={() => setShowBellModal(false)}>
                  <Text style={styles.text}>Отмена</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.bell_ok_button}
                  onPress={() => {
                    setTaskAlarm()
                    setShowBellModal(false)
                  }}
                >
                  <Text style={styles.text}>ОК</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <TextInput style={styles.input} value={title} placeholder="Название" onChangeText={value => setTitle(value)} />
        <TextInput
          style={styles.input}
          value={desc}
          placeholder="Описание"
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
        <View style={styles.extra_row}>
          <TouchableOpacity
            style={styles.extra_button}
            onPress={() => {
              setShowBellModal(true)
            }}
          >
            <FontAwesome5 name={'bell'} size={25} color={'#ffffff'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.extra_button}
            onPress={() => {
              navigation.navigate('Camera', { id: tasksID, image:setImage})
            }}
          >
            <FontAwesome5 name={'camera'} size={25} color={'#ffffff'} />
          </TouchableOpacity>
        </View>
        {image ? (
          <View>
            <Image style={styles.image} source={{ uri: image }} />
            <TouchableOpacity
              style={styles.delete}
              onPress={() => {
                deleteImage()
              }}
            >
              <FontAwesome5 name={'trash'} size={25} color={'#ff3636'} />
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.checkBox}>
          <CheckBox value={done} onValueChange={newValue => setDone(newValue)} />
          <Text style={styles.text}>Выполнено?</Text>
        </View>
        <CustomButton text="Сохранить задачу" color="#11eb90" style={{ width: '100%' }} onPressHandler={setTask} />
      </View>
    </ScrollView>
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
    color: '#000000',

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
  },
  extra_row: {
    flexDirection: 'row',
    marginVertical: 10
  },
  extra_button: {
    flex: 1,
    height: 50,
    backgroundColor: '#0080ff',
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centered_view: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bell_modal: {
    width: 300,
    height: 250,
    backgroundColor: '#17ECEA',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000000'
  },
  bell_body: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bell_buttons: {
    flexDirection: 'row',
    height: 50
  },
  bell_input: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    backgroundColor: '#39D38A',
    textAlign: 'center',
    fontSize: 30,
    margin: 10
  },
  bell_cancel_button: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000000',
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bell_ok_button: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000000',
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 300,
    height: 300,
    margin: 20,
    borderRadius: 20
  },
  delete: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 20,
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff80'
  }
})
