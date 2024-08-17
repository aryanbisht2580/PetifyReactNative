import { View, Text, StyleSheet, Pressable, Image, Platform, Linking } from 'react-native'
import React from 'react'
import Icon from './UI/Icon'
import { colors } from '../constants/colors'

export default function ContactButton({pet}) {
    const sluguser=pet.ownerName.replace(" ","+");
    const makeCall=()=>{
        let phone="";
        if(Platform.OS=="android"){
            phone="tel:${"+pet.ownerPhone+"}";
        }
        else{
            phone="telprompt:${"+pet.ownerPhone+"}";
        }
        Linking.openURL(phone);
    }
  return (
    <Pressable style={({pressed})=>[styles.outerView,pressed && styles.pressed]} onPress={makeCall}>
      <Image source={{uri:`https://ui-avatars.com/api/?name=${sluguser}`}} style={{height:40,width:40,borderRadius:20}}/>
      <View>
        <Text style={styles.ownName} numberOfLines={1}>{pet.ownerName}</Text>
        <Text style={styles.simple}>Pet Owner</Text>
      </View>
      <Icon name="call"/>
    </Pressable>
  )
}
const styles = StyleSheet.create({
    outerView:{
        backgroundColor:colors.skin600,
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        padding:20,
        paddingHorizontal:40
    },
    pressed:{
        opacity:0.8
    },
    ownName:{
        fontFamily:"darkHeading",
        fontSize:18
    },
    simple:{
        opacity:0.6
    }
})