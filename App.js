import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import ScreenA from './src/Components/ScreenA';
import {NavigationContainer} from '@react-navigation/native';
import ScreenB from './src/Components/ScreenB';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        header: () => null
      }}>
        <Stack.Screen name="Screen_A" component={ScreenA}/>
        <Stack.Screen name="Screen_B" component={ScreenB} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
