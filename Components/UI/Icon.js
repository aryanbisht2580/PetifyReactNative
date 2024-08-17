import { View, Text } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
export default function Icon({name,color,size}) {
  return (
    <Ionicons name={name} size={size?size:24} color={color} />
  )
}