import { StyleSheet, useColorScheme, ActivityIndicator, View, StatusBar } from 'react-native'
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useColors from '../Utils/Colors';
import loadFonts from '../Utils/Font'

import Singin from './login/Singin';
import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';
import Profile from './Profile/Profile'
import AddFolder from './Create/AddFolder'
import AddUnite from './Create/AddUnite'

import { AuthProvider } from '../Firebase/AuthContext';

const Stack = createNativeStackNavigator();

const App = () => {

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        async function a () {
            await loadFonts()
            setLoaded(true)
        } a()
    },[])

    const isDark = useColorScheme() == "dark"
    const Colors = useColors(isDark)

    if (!loaded) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alingItems:"center"}}>
                <ActivityIndicator />
                <StatusBar backgroundColor={Colors.background}/>
            </View>
        )
    }
 
  return (
    <NavigationContainer independent={true}>
      <AuthProvider>
        <StatusBar backgroundColor={Colors.background}/>
        <Stack.Navigator>
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Singin"
                component={Singin}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AddUnite"
                component={AddUnite}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AddFolder"
                component={AddFolder}
                options={{ headerShown: false }}
              />
            </>
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})