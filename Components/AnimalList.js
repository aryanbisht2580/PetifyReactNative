import { View, Text, FlatList, Image, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { colors } from '../constants/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, userSelector } from '../redux/slices/user';
import Loading from './UI/loading';


export default function AnimalList({category}) {
    const [loading,setLoading]=useState(false);
    const [animalList,setAnimalList]=useState([]);
    const navigation=useNavigation();
    const route=useRoute();
    const user=useSelector(userSelector)
    const dispatch=useDispatch()
    useEffect(() => {
        // if (user.isDeleteChange) {
        //     dispatch(userActions.setIsDeleteChange(false));
        // }
        fetchAnimals();
    }, [category, user.isDeleteChange]);
    
    const fetchAnimals = async () => {
        setLoading(true);
        const snap = await getDocs(query(collection(db, "animals"), where("category", "==", category)));
        const animals = [];
        snap.forEach((s) => {
            animals.push({ ...s.data(), id: s.id });
        });
        setAnimalList(animals);
        setLoading(false);
    };
    const pressHandler=(item)=>{
        navigation.navigate("petDetails",{pet:item})
    }

  return (
    <View style={{flex:1}}>
      <FlatList numColumns={2} data={animalList} renderItem={({item})=>(
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
  )} contentContainerStyle={{gap:5}} onRefresh={()=>fetchAnimals()} refreshing={loading}/>
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
    }
})