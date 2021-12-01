import 'react-native-gesture-handler'
import React from 'react'
import { StyleSheet } from 'react-native'
import Home from './src/screens/Home'
import { NavigationContainer } from '@react-navigation/native'
import Login from './src/screens/Login'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import { Store } from './src/redux/store'
const Stack = createStackNavigator()

const App = () => {
  return (
    <Provider store={Store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName= "Login">
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
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
