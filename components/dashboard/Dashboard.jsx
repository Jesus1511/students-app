// Dashboard.js
import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../Firebase/AuthContext';
import useColors from '../../Utils/Colors';
import Entypo from '@expo/vector-icons/Entypo';
import DropdownMenu from './DropdownMenu';
import Navbar from './NavBar';
import { firestore, auth } from '../../Firebase/app';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("")
  const [items, setItems] = useState()

  const { user, loading } = useContext(AuthContext);
  const Colors = useColors();
  const styles = DynamicStyles(Colors);
 
  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const userId = auth.currentUser.uid;
        const userItemsRef = collection(firestore, "elementos");
        const userItemsQuery = query(userItemsRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(userItemsQuery);
        
        const fetchedItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching user items: ", error);
      }
    };

    fetchUserItems();
  }, []);

  if (loading) {
    return (
      <View style={{ backgroundColor: Colors.background, flex: 1 }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: Colors.background, flex: 1 }}>
      <Navbar searchText={searchText} setSearchText={setSearchText}/>

      <TouchableOpacity style={styles.addExam} onPress={() => setIsOpen(true)}>
        <Entypo name="plus" size={45} color={Colors.antiText} />
      </TouchableOpacity>

      <DropdownMenu isOpen={isOpen} onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)} />
    </View>
  );
};

export default Dashboard;

const DynamicStyles = (Colors) => StyleSheet.create({
  addExam: {
    position: "absolute",
    backgroundColor: Colors.text,
    borderRadius: 100,
    padding: 6,
    bottom: 40,
    right: 30,
  },
});
