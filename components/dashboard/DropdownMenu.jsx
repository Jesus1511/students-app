// DropdownMenu.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useColors from '../../Utils/Colors';

const DropdownMenu = ({ isOpen, onOpen, onClose }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(300));
  const navigation = useNavigation();
  const Colors = useColors();

  useEffect(() => {
    if (isOpen) {
      openMenu()
    } 
  }, [isOpen])

  const openMenu = () => {
    onOpen();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose());
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 200,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const styles = DynamicStyles(Colors);

  return (
    <>
      {isOpen && (
        <>
          <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
            <TouchableOpacity style={styles.overlayTouchable} onPress={closeMenu} />
          </Animated.View>
          <Animated.View style={[styles.dropdownMenu, { transform: [{ translateX: slideAnim }] }]}>
            <Text style={styles.menuText}>Add a new...</Text>
            <TouchableOpacity onPress={() => {
              closeMenu();
              navigation.navigate('AddUnite');
            }} style={styles.menuOption}>
              <View style={{ alignItems: "center", width: 30 }}>
                <AntDesign name="addfile" size={24} color="black" />
              </View>
              <Text style={styles.optionText}>   Test</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              closeMenu();
              navigation.navigate('AddFolder');
            }} style={styles.menuOption}>
              <View style={{ alignItems: "center", width: 30 }}>
                <AntDesign name="addfolder" size={24} color="black" />
              </View>
              <Text style={styles.optionText}>   Folder</Text>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
    </>
  );
};

export default DropdownMenu;

const DynamicStyles = (Colors) => StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "130%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayTouchable: {
    width: "100%",
    height: "100%",
  },
  dropdownMenu: {
    position: "absolute",
    right: 20,
    bottom: 110,
    width: 200,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 10,
    padding: 15,
  },
  menuText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  menuOption: {
    paddingVertical: 10,
    flexDirection: "row",
  },
  optionText: {
    fontSize: 16,
  },
});
