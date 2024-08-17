import { View, Text, FlatList, Pressable, StyleSheet, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, userSelector } from '../redux/slices/user';
import { colors } from '../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditPets({navigation}) {
    const [loading,setLoading]=useState(false)
    const [myPets,setMyPets]=useState();
    const user=useSelector(userSelector);
    const dispatch=useDispatch();
    useEffect(()=>{
        call();
    },[user])
    const call=async()=>{
        setLoading(true)
        setMyPets([]);
        try{
            const snap=await getDocs(query(collection(db,"animals"),where("ownerPhone","==",user.phone)))
        snap.forEach((s)=>{
            setMyPets((prev)=>[...prev,{...s.data(),id:s.id}])
            
        })
        }catch(err){
            Alert.alert("Error!!!","error occured while Deleting")
        }
        setLoading(false)
    }
    const handleDelete=(itemId)=>{
        Alert.alert("Delete Item","Are You Sure you Wanted to Delete the Pet?",[
            {
                text:"Cancel",
                style:"cancel"
            },
            {
                text:"Delete",
                style:"destructive",
                onPress:()=>deletePet(itemId)

            }
        ])
    }

    const pressHandler=(item)=>{
        navigation.navigate("petDetails",{pet:item})
    }
    const deletePet=async(itemId)=>{
        try{

            await deleteDoc(doc(db,"animals",itemId));
            setMyPets((prevPets) => prevPets.filter((pet) => pet.id !== itemId));
            dispatch(userActions.setIsDeleteChange(true))
            
        }catch(err){
            Alert.alert("failed to delete Pet")
        }
    }
  return (
    <SafeAreaView style={{flex:1,marginTop:40}}>
      
      
      <FlatList numColumns={2} data={myPets} renderItem={({item})=>(
        <Pressable style={({pressed})=>[{width:"50%",height:"100%"},pressed && {opacity:0.6}]} onPress={()=>pressHandler(item)}>
        <View style={styles.cardContainer}>
            <View style={{flex:1}}>
            <Image source={{uri:item.imageURL}} style={{height:"70%",width:"100%"}}/>
            <View>
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                <Text style={styles.heading}>{item.name}</Text>
                <View >
                    <Text>{item.age} YRS</Text>
                    </View>
                </View>
                    <Text style={styles.subHeading}>{item.breed}</Text>
            </View>
            </View>
            
            
            <Pressable style={styles.deleteContainer} onPress={()=>handleDelete(item.id)}>
                <Text style={{fontFamily:"mediumHeading"}}>DELETE</Text>
            </Pressable>
        </View>
        </Pressable>
  )} contentContainerStyle={{flex:1,gap:5}} refreshing={loading} onRefresh={call}/>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    deleteContainer:{
        backgroundColor:"red",
        height:30,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        padding:2
    },
    cardContainer:{
        overflow:"hidden",
        height:250,
        overflow:"hidden",
        padding:10,
        backgroundColor:colors.skin400,
        margin:10,
        borderRadius:10,
        justifyContent:"space-between",

    },
    heading:{
        fontFamily:"mediumHeading",
        fontSize:20
    },
    subHeading:{
        fontFamily:"lightHeading",
        opacity:0.4
    },
    title:{
      fontSize:40,
      fontFamily:"darkHeading",
      padding:10
    }
})