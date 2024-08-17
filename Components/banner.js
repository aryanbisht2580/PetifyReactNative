import { View, Text, FlatList, Image, Dimensions, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../config/firebaseConfig';
import { getDoc,collection, getDocs } from 'firebase/firestore';
import Loading from './UI/loading';

export default function Banner() {
    const [banners,setBanners]=useState([]);
    useEffect(()=>{
        fetchBanners();
    },[])
    const fetchBanners=async()=>{
        try{
            setBanners([]);
            const snap=await getDocs(collection(db,'banner'))
            snap.forEach((s)=>{
                setBanners((prev)=>([...prev,s.data()]));
            })
            
        }
        
        catch(err){
            console.log(err);
        }
    }
  return (
    <View style={styles.outerView}>
      <FlatList data={banners} key={(item,index)=>index} renderItem={({item})=>(
        <Image source={{uri:item.imageURL}} style={styles.imageContainer}/>
      )
      
      } horizontal={true}
      showsHorizontalScrollIndicator={false}

      />
    </View>
  )
}
const styles = StyleSheet.create({
  outerView:{
    padding:20,
    alignItems:"center",
    height:250,
  },
  imageContainer:{
    width:Dimensions.get('screen').width*0.9,
    height:200,
    marginRight:10,
    borderRadius:10,
    justifyContent:"center"
    

  }
})