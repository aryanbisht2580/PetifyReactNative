import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userActions, userSelector } from '../redux/slices/user'
import ProfileButton from '../Components/ProfileButton';



export default function Profile({navigation}) {
  const user=useSelector(userSelector);
  const sluguser=user.userName.replace(" ","+");
  const dispatch=useDispatch();
  const logoutHandler=()=>{
    dispatch(userActions.deleteUser());
  }
  const handleAddPet=()=>{
    navigation.navigate("addPet")
  }
  const handleEditPets=()=>{
    navigation.navigate("editPets")
  }
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.outerDiv}>
        <View style={styles.imageContainer}>
          <Image source={{uri:`https://ui-avatars.com/api/?name=${sluguser}`}} style={{height:"100%",width:"100%"}}/>
        </View>
        <View>
          <Text style={styles.userText}>{user.userName}</Text>
        </View>
        <ProfileButton title={"Add New Pet"} onPress={handleAddPet}/>
        <ProfileButton title={"Edit Pets"} onPress={handleEditPets}/>

        <ProfileButton title={"Logout"} onPress={logoutHandler}/>


        
        
      </View>
    </SafeAreaView>
  )
}
const styles=StyleSheet.create({
  safeView:{
    flex:1,
    marginTop:50
  },
  imageContainer:{
    height:100,
    width:100,
    borderRadius:50,
    overflow:"hidden",

  },
  outerDiv:{
    marginTop:20,
    alignItems:"center",
    flex:1
    
  },
  userText:{
    marginTop:20,
    fontSize:40,
    fontFamily:"darkHeading"
  }
})