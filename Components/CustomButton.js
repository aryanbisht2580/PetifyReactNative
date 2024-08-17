import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'

export default function CustomButton({text,onPress,color}) {
  return (
    <Pressable style={({pressed})=>[styles.withoutPress,pressed?styles.pressed:'',color && {backgroundColor:color}]} onPress={onPress}>
        <Text style={styles.textStyle}>{text}</Text>
    </Pressable>
  )
}
const styles=StyleSheet.create({
    withoutPress:{
        backgroundColor:colors.skin600,
        width:"100%",
        borderRadius:5,
        padding:10
    },
    pressed:{
        opacity:0.8
    },
    textStyle:{
        fontFamily:"mediumHeading",
        fontSize:18,
        textAlign:"center"
    }
    
})