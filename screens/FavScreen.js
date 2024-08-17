import { View, Text, ScrollView, FlatList, Pressable, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/slices/user';
import { colors } from '../constants/colors';
import Loading from '../Components/UI/loading';

export default function FavScreen({navigation}) {
  const user=useSelector(userSelector);
  const [favList,setFavList]=useState([]);
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
    fetchfavs();
  },[user.favs])
  const fetchfavs=async()=>{
    
    setFavList([])
    
    user.favs.forEach(async(f)=>{
      setLoading(true);
      
      try{
        const snap=await getDoc(doc(db,"animals",f))
        if(snap.data()){
          setFavList((prev)=>[{...snap.data(),id:snap.id},...prev])
        }
        setLoading(false)
        
        
      }catch(err){
        console.log(err);
        setLoading(false)
      }
      
    })
    
  }
  const pressHandler=(item)=>{
    navigation.navigate("petDetails",{pet:item})
}
  return (
    

    // loading?<View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Loading/></View>:
      
    
    <View style={{flex:1,marginTop:40}}>
      
      
    <Text style={styles.title}>Favourites</Text>
    {favList.length==0?<View style={{justifyContent:"center",alignItems:"center",flex:1}}><Text style={{fontFamily:"mediumHeading"}}>No Favourites Yet</Text></View>:
      <FlatList numColumns={2} data={favList} renderItem={({item})=>(

          <Pressable style={({pressed})=>[{width:"50%",height:"100%"},pressed && {opacity:0.6}]} onPress={()=>pressHandler(item)}>
          <View style={styles.cardContainer}>
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
            </Pressable>
          )} contentContainerStyle={{flex:1,gap:5}} refreshing={loading} onRefresh={fetchfavs}/>
        }
  </View>
  )
}
const styles = StyleSheet.create({
    cardContainer:{
        overflow:"hidden",
        height:250,
        overflow:"hidden",
        padding:10,
        backgroundColor:colors.skin400,
        margin:10,
        borderRadius:10,
        justifyContent:"space-between"

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