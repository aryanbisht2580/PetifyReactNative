import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constants/colors'

export default function About({pet}) {
    const [numLines,setNumLines]=useState(5);
  return (
    <View style={{marginTop:20,padding:5}}>
        <Text style={styles.mainHeading}>About</Text>
        <Text numberOfLines={numLines} style={styles.about}>{pet.about}</Text>
        {numLines<30 && <Pressable onPress={()=>{setNumLines(30)}}><Text style={styles.onPressText}>Read more</Text></Pressable>}
    </View>
  )
}
const styles = StyleSheet.create({
    mainHeading:{
        fontFamily:"mediumHeading",
        fontSize:30,
    },
    onPressText:{
        color:"#5386e6"
    },
    about:{
        fontFamily:"lightHeading",
        textAlign:"justify",
        opacity:0.7
    }
})