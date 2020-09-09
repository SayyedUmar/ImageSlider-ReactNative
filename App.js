import React from 'react';
import Slider from './src/flatlist/Slider'
import configureStore from './src/redux/store';
import { Provider } from 'react-redux';

import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Slider2 from './src/flatlist/Slider2';





function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="List" component={Slider2} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)

const Stack = createStackNavigator();

const store = configureStore();
const ReduxTutorial = () =>
  <Provider store={store}>
    <App />
  </Provider>
export default ReduxTutorial;