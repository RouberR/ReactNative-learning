import 'react-native-gesture-handler'
import React from 'react'
import { StyleSheet } from 'react-native'
import ScreenA from './src/screens/ScreenA'
import { NavigationContainer } from '@react-navigation/native'
import ScreenB from './src/screens/ScreenB'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'

const Drawer = createDrawerNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerPosition="right" edgeWidth={400} drawerType="front">
        <Drawer.Screen
          name="Screen_A"
          component={ScreenA}
          options={{
            title: 'Screen_A Title',
            drawerIcon: ({ focused }) => (
              <FontAwesome5 name="autoprefixer" size={focused ? 25 : 20} color={focused ? '#0080ff' : '#999999'} />
            )
          }}
        />
        <Drawer.Screen
          name="Screen_B"
          component={ScreenB}
          options={{
            title: 'Screen_B Title',
            drawerIcon: ({ focused }) => (
              <FontAwesome5 name="btc" size={focused ? 25 : 30} color={focused ? '#0080ff' : '#999999'} />
            )
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
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
