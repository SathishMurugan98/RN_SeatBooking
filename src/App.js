/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './components/Login';
import Home from './components/Home';
import Alerts from './components/Alerts';
import BookingSeat from './components/BookingSeat';
import CancelBooking from './components/CancelBooking';
import Reschedule from './components/Reschedule';
import SeeAllHistory from './components/SeeAllHistory';

const Stack = createNativeStackNavigator();
function App() {
  const [initialRoute, setInitialRoute] = useState('login');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    checkingStatus();
  }, []);

  const checkingStatus = async () => {
    const status = await AsyncStorage.getItem('@login_check');
    console.log('---------->', status);
    if (status === 'success') {
      setInitialRoute('home');
    } else {
      setInitialRoute('login');
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? <Text /> : (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="alerts" component={Alerts} />
            <Stack.Screen name="seatbook" component={BookingSeat} />
            <Stack.Screen name="reschedule" component={Reschedule} />
            <Stack.Screen name="cancel" component={CancelBooking} />
            <Stack.Screen name="seeall" component={SeeAllHistory} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}

export default App;
