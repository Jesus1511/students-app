// Navbar.js
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useColors from '../../Utils/Colors';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';

const Navbar = ({searchText, setSearchText}) => {
  const navigation = useNavigation();
  const Colors = useColors();
  const styles = dynamicStyles(Colors);

  return (
    <View>
      <View style={styles.navBar}>
        <Text style={styles.logoApp}>Logo-App</Text>
        <View style={ styles.rigthBar }>
          <TouchableOpacity style={styles.getPro}>
            <Text style={{fontFamily:"Montserrat-Bold", fontSize:16}}>Get Pro</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profile} onPress={() => navigation.navigate('Profile')}>
            <Image />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.navBar}>
        <View style={[styles.rigthBar ,{backgroundColor:Colors.label, padding:5, borderRadius:15, width:"auto"}]}>
          <AntDesign name="search1" size={24} color={Colors.text} />
          <TextInput
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            style={{width:240, marginLeft:10}}
          />
        </View>
        <TouchableOpacity style={{marginRight:5}}>
          <FontAwesome6 name="chevron-down" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>
    </View>

  );
};

export default Navbar;

const dynamicStyles = (Colors) => StyleSheet.create({
  navBar: {
    margin: 15,
    marginBottom:5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profile: {
    backgroundColor: "gray",
    width: 40,
    height: 40,
    borderRadius: 100,
  },

  logoApp: {
    color: Colors.Text,
    fontFamily:"Montserrat-Bold",
    fontSize:23
  },
  rigthBar: {
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    width:"40%"
  },
  getPro:{
    backgroundColor:"gold",
    paddingVertical:4,
    paddingHorizontal:8
  }
});
