import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React, { useEffect } from "react";
import Icon from "../Components/UI/Icon";
import PetSubInfo from "../Components/petSubInfo";
import InfoBlocks from "../Components/InfoBlocks";
import About from "../Components/About";
import ContactButton from "../Components/ContactButton";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/slices/user";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export default function PetDetailsScreen({ route ,navigation}) {
  const pet = route.params.pet;
  useEffect(()=>{
    call();
  },[])
  const call=async()=>{
    const snap=await getDoc(doc(db,"animals",pet.id));
    if(!snap.exists){
      navigation.navigate("home")
    }
    else{
      if(!snap.data()){
        navigation.navigate("home");
      }
      
    }
  }
  return (
    <View style={{flex:1}}>
      <ScrollView style={{ }} >
        <Image
          source={{ uri: pet.imageURL }}
          style={{ width: "100%", height: 380, objectFit: "cover" }}
        />
        <View style={styles.outerView}>
          <PetSubInfo pet={pet} />

          <InfoBlocks pet={pet} />
          <About pet={pet} />
        </View>
      </ScrollView>
      <View style={{height:80}}>

      <ContactButton pet={pet}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainHeading: {
    fontFamily: "darkHeading",
    fontSize: 40,
  },
  outerView: {
    padding: 10,
  },
});
