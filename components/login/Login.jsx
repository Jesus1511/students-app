import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import Feather from '@expo/vector-icons/Feather'; 
import useColors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../Firebase/app'
import Toast from 'react-native-toast-message';
import { AuthContext } from '../../Firebase/AuthContext';

const Login = () => {
    const Colors = useColors();
    const styles = DynamicStyles(Colors);
    const navigation = useNavigation();
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const [error, setError] = useState(null)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { user } = useContext(AuthContext);

    useEffect(() => {
      if (user !== null) {
        navigation.navigate('Dashboard')
      }
    },[user])
    
    // Función para iniciar sesión
    const handleLogin = async () => {
      if (password == "" || email == "" ) {
        setError("fill out all fields to continue")
        return;
      }

      try {
        await signInWithEmailAndPassword(auth, email, password);
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
      }
    };
    


    return (
        <View style={{ backgroundColor: Colors.background, flex: 1, justifyContent: "space-between", padding:15, paddingBottom: 30 }}>

            {error !== null && (
              <View style={styles.errorContainer}>
                <Feather name="alert-circle" size={24} color="hsla(0, 100%, 50%, 0.42)" />
                <Text style={styles.errorText}> {error}</Text>
              </View>
            )}

            <View style={{ marginBottom: 15 }}>
                <Text style={styles.h1}>Welcome Back!</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    placeholderTextColor={Colors.placeholder}
                    onChangeText={(text) => {setEmail(text)}}
                />
                
                <View style={[styles.input, {flexDirection:"row", paddingVertical:0, alignItems:"center", justifyContent:"space-between"}]}>
                    <TextInput
                        style={{fontFamily:"Montserrat-Medium", width:"85%", color:Colors.text,}}
                        placeholder="Password"
                        secureTextEntry={!isPasswordVisible}
                        keyboardType="default"
                        value={password}
                        placeholderTextColor={Colors.placeholder}
                        onChangeText={(text) => {setPassword(text)}}
                    />
                    <TouchableOpacity style={{width:24, height:24}} onPress={() => setPasswordVisible(!isPasswordVisible)}>
                        <Feather
                            name={isPasswordVisible ? 'eye' : 'eye-off'}
                            size={24}
                            color={Colors.text} // Cambia el color si es necesario
                            style={styles.eyeIcon}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.fpass} onPress={() => {}}>
                    <Text style={styles.fpass_text}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.login} onPress={handleLogin}>
                    <Text style={styles.loginText}>Log-in</Text>
                </TouchableOpacity>

                <View style={styles.orContainer}>
                    <View style={styles.bar} />
                    <Text style={styles.orText}>Or continue With</Text>
                    <View style={styles.bar} />
                </View>


            </View>

            <View>
                <Text style={{ fontFamily: "Montserrat-Medium", color:Colors.text, fontSize: 16, textAlign: "center" }}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Singin')}>
                    <Text style={{ fontFamily: "Montserrat-Bold", color:Colors.text, fontSize: 16, textAlign: "center" }}>Register</Text>
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
      marginTop: 50,
      marginBottom:80,
      fontSize: 28,
      color:Colors.text
    },

    input:{
      borderColor:"#444444",
      borderWidth:1.6,
      marginBottom:25,
      marginHorizontal:10,
      paddingVertical:10,
      paddingHorizontal:15,
      borderRadius:17,
      color:Colors.text,
      fontFamily:"Montserrat-Medium"
    },

    fpass:{
      paddingHorizontal:10,
      marginBottom:30
    },

    fpass_text:{
      textAlign:"right",
      fontFamily:"Montserrat-SemiBold",
      color:Colors.text
    },

    login:{
      backgroundColor:"black",
      justifyContent:"center",
      alignItems:"center",
      marginHorizontal:10,
      height:50,
      borderRadius:30,
      marginBottom:30
    },

    orContainer:{
      flexDirection:"row",
      justifyContent:"space-evenly",
      alignItems:"center"
    },

    orText:{
      fontFamily:"Montserrat-Medium",
      color: Colors.text
    },

    bar:{
      width:"25%",
      height:1,
      backgroundColor:Colors.placeholder,
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
      left:15,
      top: 115,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
    },
    errorText: {
      color: "hsla(0, 100%, 50%, 0.42)",
      textAlign: "center",
      fontFamily: "Montserrat-SemiBold",
      fontSize: 16,
    },

    
});
