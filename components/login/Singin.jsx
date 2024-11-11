import { StyleSheet, Text, View, ToastAndroid, TouchableOpacity, TextInput, Image } from 'react-native';
import { useState } from 'react';
import useColors from '../../Utils/Colors';
import Feather from '@expo/vector-icons/Feather'; 
import { useNavigation } from '@react-navigation/native'
import {auth} from '../../Firebase/app'
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import Toast from 'react-native-toast-message';

const Login = () => {
    const Colors = useColors();
    const styles = DynamicStyles(Colors);
    const navigation = useNavigation()

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState(null)

    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const handleSignin = async () => {
      if (username == "" || password == "" || email == "" ) {
        setError("fill out all fields to continue")
        return;
      }

      if (password !== confirmPassword) {
        setError("The passwords are diferent")
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: username,
        });

        await signInWithEmailAndPassword(auth, email, password)
        navigation.navigate('Dashboard');
        Toast.show({
          type: 'success',
          text1: 'You have logged-in succesffuly!',
          position: 'top',
          visibilityTime: 2000, 
          autoHide: true,
        });
      } catch (error) {
        setError(error.message)
        console.error(error.message);
        throw error;
      }
    };

    return (
        <View style={{ backgroundColor: Colors.background, flex: 1, justifyContent:"space-between", paddingBottom:30 }}>

            {error !== null && (
              <View style={styles.errorContainer}>
                <Feather name="alert-circle" size={24} color="hsla(0, 100%, 50%, 0.42)" />
                <Text style={styles.errorText}> {error}</Text>
              </View>
            )}

            <View style={{ marginBottom: 15 }}>
              <Text style={styles.h1}>Sing in to "Name"</Text>

              <TextInput 
                style={styles.input}
                placeholder="Username"
                placeholderTextColor={Colors.placeholder}
                value={username}
                onChangeText={(text) => {setUsername(text)}}
              />
              <TextInput 
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={Colors.placeholder}
                value={email}
                onChangeText={(text) => {setEmail(text)}}
              />
              <View style={[styles.input, {flexDirection:"row", justifyContent:"space-between"}]}>
                  <TextInput
                      style={{fontFamily:"Montserrat-Medium", width:"85%", color:Colors.text}}
                      placeholder="Password"
                      value={password}
                      placeholderTextColor={Colors.placeholder}
                      onChangeText={(text) => {setPassword(text)}}
                      secureTextEntry={!isPasswordVisible}
                      keyboardType="default"
                  />
                  <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
                      <Feather
                          name={!isPasswordVisible ? 'eye' : 'eye-off'}
                          size={24}
                          color={Colors.text} // Cambia el color si es necesario
                          style={styles.eyeIcon}
                      />
                  </TouchableOpacity>
              </View>

              <View style={[styles.input, {flexDirection:"row", justifyContent:"space-between"}]}>
                  <TextInput
                      style={{fontFamily:"Montserrat-Medium", width:"85%", color:Colors.text}}
                      placeholder="Confirm Password"
                      secureTextEntry={!isPasswordVisible}
                      placeholderTextColor={Colors.placeholder}
                      keyboardType="default"
                      value={confirmPassword}
                      onChangeText={(text) => {setConfirmPassword(text)}}
                  />
                  <TouchableOpacity onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                      <Feather
                          name={!isPasswordVisible ? 'eye' : 'eye-off'}
                          size={24}
                          color={Colors.text} // Cambia el color si es necesario
                          style={styles.eyeIcon}
                      />
                  </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.login} onPress={handleSignin}>
                <Text style={styles.loginText}>Sing-in</Text>
              </TouchableOpacity>

              <View style={styles.orContainer}>
                <View style={styles.bar}/>
                <Text style={styles.orText}>Or continue With</Text>
                <View style={styles.bar}/>
              </View>

              {/* <View style={{paddingHorizontal:10}}>
                <TouchableOpacity style={styles.continueWithButton}>
                    <Text>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.continueWithButton}>
                    <Text>Facebook</Text>
                </TouchableOpacity>
              </View> */}


            </View>

            <View>
              <Text style={{fontFamily:"Montserrat-Medium", color:Colors.text, fontSize:16, textAlign:"center"}}>Already have an account?</Text>
              <TouchableOpacity onPress={() => {
                navigation.navigate('Login')
              }}>
                <Text style={{fontFamily:"Montserrat-Bold", color:Colors.text, fontSize:16, textAlign:"center"}}>Log-in</Text>
              </TouchableOpacity>
            </View>

        </View>
    );
};

export default Login;

const DynamicStyles = (Colors) => StyleSheet.create({
    // Agrega estilos aquí, por ejemplo:
    container: {
        backgroundColor: Colors.background,
    },
    h1: {
      textAlign:"center",
      fontFamily:"Montserrat-Bold",
      marginTop: 40,
      marginBottom: 70,
      fontSize: 28,
      color: Colors.text
    },

    input:{
      borderColor:"#444444",
      borderWidth:2,
      marginBottom:20,
      marginHorizontal:10,
      paddingVertical:10,
      paddingHorizontal:15,
      borderRadius:24,
      fontFamily:"Montserrat-Medium",
      color: Colors.text
    },

    fpass:{
      paddingHorizontal:10,
      marginBottom:30
    },

    fpass_text:{
      textAlign:"right",
      fontFamily:"Montserrat-SemiBold",
      color: Colors.text
    },

    login:{
      backgroundColor:"black",
      justifyContent:"center",
      alignItems:"center",
      marginHorizontal:10,
      height:50,
      borderRadius:30,
      marginBottom:30,
      marginTop:10,
    },

    orContainer:{
      flexDirection:"row",
      justifyContent:"space-evenly",
      alignItems:"center"
    },

    bar:{
      width:"25%",
      height:1,
      backgroundColor:Colors.placeholder
    },

    loginText:{
      color:"white",
      fontSize:18,
      fontFamily:"Montserrat-SemiBold"
    },

    errorContainer: {
      width: "100%",
      height: 50,
      position: "absolute",
      top: 90,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
    },
    errorText: {
      color: Colors.errorRed,
      textAlign: "center",
      fontFamily: "Montserrat-SemiBold",
      fontSize: 16,
    },

    orText:{
      fontFamily:"Montserrat-Medium",
      color: Colors.text

    }
    
});
