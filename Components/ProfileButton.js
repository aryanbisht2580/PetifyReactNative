import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'

export default function ProfileButton({title,onPress}) {
  return (
    <Pressable  style={styles.outerMost} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}
const styles = StyleSheet.create({
    outerMost:{
        marginTop:20,
        height:100,
        backgroundColor:colors.skin400,
        width:"90%",
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center",
        borderWidth:2,
        borderColor:colors.skin600
    }
    ,text:{
        fontFamily:"mediumHeading",
        fontSize:20
    }
})