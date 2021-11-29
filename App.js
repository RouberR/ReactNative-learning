import React from 'react'
import 'react-native-gesture-handler'
// import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'
import ScreenA from './src/Components/ScreenA'
import { NavigationContainer } from '@react-navigation/native'
import ScreenB from './src/Components/ScreenB'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator()
const Tab = ();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName
            if (route.name === 'Screen_A') {
              iconName = 'autoprefixer'
              size=focused ? 25 : 20
              // color=focused ? "#f0f" : "#555"
            } else if (route.name === 'Screen_B') {
              iconName = 'btc'
              size=focused ? 25 : 20
              // color=focused ? "#f0f" : "#555"
            }
            return <FontAwesome5 name={iconName} size={size} color={color} />
          }
        })}
        tabBarOptions = {{
          activeTintColor: "#f0f",
          inactiveTintColor: "#555",
          showLabel: false,
        }}

        activeColor="#f0edf6"
        inactiveColor="#3e2465"
      >
        <Tab.Screen name="Screen_A" component={ScreenA} 
          options={{tabBarBadge: 5}}
        />
        <Tab.Screen name="Screen_B" component={ScreenB} />
      </Tab.Navigator>
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
