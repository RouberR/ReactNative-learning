import 'react-native-gesture-handler'
import React from 'react'
import { StyleSheet } from 'react-native'
import ToDo from './src/screens/ToDo'
import { NavigationContainer } from '@react-navigation/native'
import Splash from './src/screens/Splash'
import Done from './src/screens/Done'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import { Store } from './src/redux/store'
import Camera from './src/screens/Camera'
import Task from './src/screens/Task'

const Tab = createBottomTabNavigator()

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName
          if (route.name === 'ToDo') {
            iconName = 'clipboard-list'
            size = focused ? 25 : 20
            color = focused ? 'blue' : 'grey'
          } else if (route.name === 'Done') {
            iconName = 'clipboard-check'
            size = focused ? 25 : 20
            color = focused ? 'blue' : 'grey'
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />
        },
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: 'bold'
        },
        tabBarInactiveTintColor: '#AEB2B4',
        tabBarActiveTintColor: '#0080ff'
      })}
    >
      <Tab.Screen
        name={'ToDo'}
        component={ToDo}
        options={{
          headerShown: false,
          title: 'Задачи'
        }}
      />
      <Tab.Screen
        name={'Done'}
        component={Done}
        options={{
          headerShown: false,
          title: 'Выполненные задачи'
        }}
      />
    </Tab.Navigator>
  )
}

const RootStack = createStackNavigator()

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Splash">
          <RootStack.Screen
            name="Splash"
            component={Splash}
            options={{
              headerShown: false
            }}
          />
          <RootStack.Screen
            name="My Tasks"
            component={HomeTabs}
            options={{
              title: 'Мои задачи',
              headerStyle: { backgroundColor: 'tomato' },
              headerTintColor: 'white'
            }}
          />
          <RootStack.Screen
            name="Task"
            component={Task}
            options={{
              title: 'Задача',
              headerStyle: { backgroundColor: '#00BFF9' },
              headerTintColor: 'white'
            }}
          />
          <RootStack.Screen
            name="Camera"
            component={Camera}
            options={{
              title: 'Камера',
              headerStyle: { backgroundColor: '#C500F9' },
              headerTintColor: 'white'
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default App
