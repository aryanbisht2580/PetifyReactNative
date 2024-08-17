import { View, Text } from 'react-native'
import React from 'react'
import Icon from './UI/Icon'
import { colors } from '../constants/colors'

export default function BlockItem({iconName,title,value}) {
  return (
    <View style={{width:"45%",backgroundColor:colors.skin400,margin:5,padding:6,borderRadius:7,flexDirection:"row",justifyContent:"space-around",height:80,alignItems:"center"}}>
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Icon name={iconName}/>
        </View>
        <View style={{flex:1}}>
            <Text style={{opacity:0.5,fontSize:17,fontFamily:"mediumHeading"}}>{title}</Text>
            <Text numberOfLines={2} style={{fontFamily:"mediumHeading",fontSize:15}}>{value}</Text>
        </View>
    </View>
  )
}