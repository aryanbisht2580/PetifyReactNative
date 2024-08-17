import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from './UI/Icon'
import { useDispatch, useSelector } from 'react-redux';
import { userActions, userSelector } from '../redux/slices/user';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export default function PetSubInfo({pet}) {

  const user=useSelector(userSelector);
  const dispatch=useDispatch();
  const [inc,setInc]=useState(user.favs.includes(pet.id));
  
  const pressHandler=async()=>{
    setInc((prev)=>!prev)
    if(inc){

    dispatch(userActions.setFavs([...user.favs.filter((i)=>i!=pet.id)]));

    }
    else{
      dispatch(userActions.setFavs([pet.id,...user.favs]));

    }
  }
  useEffect(()=>{
    const callit=async()=>{
      await updateDoc(doc(db,"favourites",user.email),{
        favs:user.favs
      })
      setInc(user.favs.includes(pet.id));
    }
    callit()
  },[user.favs])

  return (
    <>
    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
            <Text style={styles.mainHeading}>{pet.name}</Text>
            <Pressable onPress={()=>pressHandler(pet.id)}>

              <Icon name={inc?"heart":"heart-outline"} color={"red"}size={30}/>
            </Pressable>
        </View>
    <Text style={{fontFamily:"mediumHeading",opacity:0.4}}>{pet.breed}</Text>
    </>
  )
}

const styles = StyleSheet.create({
    mainHeading:{
        fontFamily:"darkHeading",
        fontSize:40
    },
    outerView:{
        padding:10
    }
})