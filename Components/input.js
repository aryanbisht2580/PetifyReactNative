import { View, Text, TextInput } from 'react-native'
import React from 'react'

export default function Input({title}) {
  return (
    <View>
      <Text>{title}</Text>
      <TextInput/>
    </View>
  )
}