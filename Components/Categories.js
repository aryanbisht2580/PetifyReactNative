import { View, Text, FlatList, Image, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { colors } from '../constants/colors';
import AnimalList from './AnimalList';

export default function Categories() {
    const [cats,setCats]=useState([]);
    const [selected,setSelected]=useState("Dogs")
    useEffect(()=>{
        fetchCategories();
    },[])
    const fetchCategories=async()=>{
       try{
        setCats([]);
        const snap=await getDocs(collection(db,"categories"));
        snap.forEach((s)=>setCats((prev)=>[...prev,s.data()]));
       }
       catch(err){
        console.log(err);
       }
    }

    const handlePress=(name)=>{
        setSelected(name)
    }

  return (
    <View style={{flex:1}}>
    <View style={{paddingHorizontal:20}}>
      <FlatList data={cats} renderItem={({item})=>(
        <Pressable style={({pressed})=>[styles.outerContainer,pressed && styles.pressed]} onPress={()=>handlePress(item.name)}>
            <View style={[styles.imageContainer,,selected==item.name?styles.selected:'']}>
                <Image source={{uri:item.imageURL}} style={styles.image}/>
            </View>
            <Text style={{textAlign:"center"}}>{item.name}</Text>
        </Pressable>
      )}  numColumns={4} bounces={false}/>
    </View>
    <AnimalList category={selected}/>
    
    </View>
  )
}
const styles = StyleSheet.create({
    image:{
        height:50,
        width:50
    },
    imageContainer:{
        padding:10,
        backgroundColor:colors.skin200,
        borderRadius:10,
        borderWidth:2,
        borderColor:colors.skin600,
    },
    outerContainer:{
        flex:1,
        alignItems:"center"
    }
    ,selected:{
        backgroundColor:colors.skin400
    },pressed:{
        opacity:0.5
    }
})