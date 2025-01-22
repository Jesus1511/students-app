import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import useColors from '../../Utils/Colors'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { signOut } from 'firebase/auth'
import { auth } from '../../Firebase/app'

const Profile = () => {

    const navigation = useNavigation()

    async function handleLogout () {
      try {
        await signOut(auth);
        navigation.navigate("Login")
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    }

    const Colors = useColors()
    const styles = DynamicStyles(Colors)

  return (
    <View style={{backgroundColor:Colors.background, flex:1}}>
        <View style={{ marginBottom: 15 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={28} color={Colors.text} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Text>Cerrar sesion</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Profile

const DynamicStyles = (Colors) => StyleSheet.create({


})