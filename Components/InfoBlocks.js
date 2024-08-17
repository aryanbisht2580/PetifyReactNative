import { View, Text } from 'react-native'
import React from 'react'
import BlockItem from './BlockItem'

export default function InfoBlocks({pet}) {
  return (
   <View style={{width:"100%",flexDirection:"row",flexWrap:"wrap",marginTop:20,justifyContent:"space-around"}}>
    <BlockItem title={"Weight"} iconName={"barbell-outline"} value={pet.weight+" KG"}/>
    <BlockItem title={"Age"} iconName={"calendar-outline"} value={pet.age+" YRS"}/>
    <BlockItem title={"Gender"} iconName={pet.sex=="Male"?"male-outline":"female-outline"} value={pet.sex}/>
    <BlockItem title={"Breed"} iconName={"paw-outline"} value={pet.breed}/>

   </View>
  )
}