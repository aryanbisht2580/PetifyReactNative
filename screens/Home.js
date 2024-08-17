import { View, Text, Button, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userActions, userSelector } from '../redux/slices/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Banner from '../Components/banner';
import Categories from '../Components/Categories';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export default function Home({navigation}) {
  const dispatch=useDispatch();
  const user=useSelector(userSelector);
  const [userDetails,setUserDetails]=useState({});
  // useEffect(()=>{
  //   const call=async()=>{
  //     try{
  //       const {data}=await axios.get('https://petify-b59e9-default-rtdb.firebaseio.com/users.json?auth='+user.token)
  //       // setUserDetails(data.filter((e)=>user.email==e.));
  //     }
  //     catch(err){
  //       console.log(err);
  //       dispatch(userActions.deleteUser());
  //     }
  //   }
  //   call()
  // },[])
  // useEffect(()=>{
  //   fetchFavs();
  // },[])
  useEffect(()=>{
    // if(user.isDeleteChangeHome){
      fetchFavs();
    // }
      
  },[user.isDeleteChange])
  const fetchFavs=async()=>{
    const snap=await getDoc(doc(db,"favourites",user?.email))
    if(snap?.exists()){
      dispatch(userActions.setFavs(snap.data().favs));
    }else{
      await setDoc(doc(db,"favourites",user?.email),{
        favs:[]
      })
      dispatch(userActions.setFavs([]));
    }
  }
  return (
    <View style={{marginTop:50,flex:1,marginBottom:20}}>
      <Banner/>
      <Categories/>
    </View>
  )
}