import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../Components/input";
import { colors } from "../constants/colors";
import CustomButton from "../Components/CustomButton";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../redux/slices/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = ({ route, navigation }) => {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [phone,setPhone]=useState("")
  const dispatch=useDispatch();

  const verify=()=>{
    if(name.length<3){
      Alert.alert("Invalid Name","name should be greater than 3")
      return false;
    }
    
    if(!email.includes("@gmail.com")){
      
      Alert.alert("Invalid Email","Enter valid email");
      return false;
    }
    if(password.length<6){
      Alert.alert("Invalid Password","password should be greater than equal to 6")
      return false;
    }
    if(isNaN(phone) || phone.length!=10){
      Alert.alert("Invalid Number","Number Should be of 10 digits");
      return false;
    }
    
    return true
  }

  const handleSubmit=async()=>{
    if(verify()){
      try{
        const {data}=await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+process.env.EXPO_PUBLIC_FIREBASE_API_KEY,{
          email,
          password,
          returnSecureToken:true
        })
        const sanitizedEmail = email.replace(/\./g, '_dot_').replace(/@/g, '_at_');
        
        await axios.put(`https://petify-b59e9-default-rtdb.firebaseio.com/users/${sanitizedEmail}.json?auth=`+data.idToken,{
          email,
          userName:name,
          phone,
        })
        dispatch(userActions.setUser({"token":data.idToken,"email":email,"userName":name,"phone":phone}))
        AsyncStorage.setItem("user",JSON.stringify({"token":data.idToken,"email":email,"userName":name,"phone":phone}));
      }catch(err){
        console.log(err);
        Alert.alert("Signup Error!!!","Error occured while signing in..");
      }
    }
  }
  return (
    <ImageBackground
      source={require("../assets/images/istockphoto-1385581134-612x612.jpg")}
      style={styles.imageStyle}
      imageStyle={{ opacity: 0.1 }}
    >
      <KeyboardAvoidingView style={{flex:1,justifyContent:"center",alignItems:"center"}}
      behavior={Platform.OS=="android"?"height":"padding"}>

      <SafeAreaView style={styles.safe}>
          <View style={styles.outerView}>
            <Text style={styles.mainHeading}>Sign Up</Text>
            <View style={styles.innerView}>
              <Text style={styles.subHeading}>UserName</Text>
              <TextInput style={styles.inputStyle} value={name} onChangeText={(x)=>setName(x)}/>
            </View>
            <View style={styles.innerView}>
              <Text style={styles.subHeading}>Email</Text>
              <TextInput style={styles.inputStyle} value={email} onChangeText={(x)=>setEmail(x)}/>
            </View>
            <View style={styles.innerView}>
              <Text style={styles.subHeading}>Password</Text>
              <TextInput style={styles.inputStyle} value={password} onChangeText={(x)=>setPassword(x)} secureTextEntry={true}/>
            </View>
            <View style={styles.innerView}>
              <Text style={styles.subHeading}>Phone</Text>
              <TextInput style={styles.inputStyle}  keyboardType='number-pad' value={phone} onChangeText={(x)=>setPhone(x)}/>
            </View>
            <CustomButton text="Sign Up" onPress={handleSubmit}/>
            <Pressable onPress={() => navigation.replace("login")}>
              <Text >Already Sign In ? Login</Text>
            </Pressable>
          </View>
      </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width:"100%"
  },
  outerView: {
    width: "80%",
    borderRadius: 20,
    backgroundColor: colors.skin400,
    alignItems: "center",
    padding: 15,
    paddingVertical: 15,
    gap: 20,
  },
  innerView: {
    width: "100%",
    gap: 5,
  },
  inputStyle: {
    borderWidth: 2,
    borderColor: colors.skin600,
    fontSize: 20,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 2,
    backgroundColor: colors.skin200,
    width: "100%",
  },
  mainHeading: {
    fontFamily: "darkHeading",
    fontSize: 25,
  },
  subHeading: {
    fontFamily: "mediumHeading",
    fontSize: 17,
  },
  imageStyle: {
    flex: 1,
  },
});

export default RegisterScreen;
