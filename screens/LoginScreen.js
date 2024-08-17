import React, { useState } from 'react'
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../Components/input'
import { colors } from '../constants/colors'
import CustomButton from '../Components/CustomButton'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { userActions } from '../redux/slices/user'
import Loading from '../Components/UI/loading'
import AsyncStorage from '@react-native-async-storage/async-storage'
const LoginScreen = ({route,navigation}) => {
    const dispatch=useDispatch();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(false);
    const verify=()=>{
        if(!email.includes("@gmail.com")){
          Alert.alert("Invalid Email","Enter valid email");
          return false;
        }
        if(password.length<6){
          Alert.alert("Invalid Password","password should be greater than equal to 6")
          return false;
        }
        
        return true
      }
    
      const handleSubmit=async()=>{
        if(verify()){
            setLoading(true);
          try{
            const {data}=await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDMQv0JaEjj6ilRReujK_CUUxWrsTk4fEA",{
                email,
                password,
                returnSecureToken:true
              })
              const sanitizedEmail = email.replace(/\./g, '_dot_').replace(/@/g, '_at_');
              const u=await axios.get(`https://petify-b59e9-default-rtdb.firebaseio.com/users/${sanitizedEmail}.json?auth=${data.idToken}`);
              // console.log(u.data);
              dispatch(userActions.setUser({"token":data.idToken,"email":email,"userName":u.data.userName,"phone":u.data.phone}))
              AsyncStorage.setItem("user",JSON.stringify({"token":data.idToken,"email":email,"userName":u.data.userName,"phone":u.data.phone}));
              
          }catch(err){
            console.log(err);
            setLoading(false)
            Alert.alert("Invalid credentials!!!","Error occured while Logging in..");
          }
        }
      }
  return (
    <ImageBackground source={require("../assets/images/istockphoto-1385581134-612x612.jpg")} style={styles.imageStyle} imageStyle={{opacity:0.1}}>
        {loading?<View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Loading/></View>:
        <KeyboardAvoidingView style={{flex:1,justifyContent:"center",alignItems:"center",width:"100%"}}
        
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
          
        <SafeAreaView style={styles.safe}>
        <View style={styles.outerView}>
            <Text style={styles.mainHeading}>Login</Text>
            <View style={styles.innerView}>
                <Text style={styles.subHeading}>Email</Text>
                <TextInput style={styles.inputStyle} value={email} onChangeText={(x)=>setEmail(x)}/>
            </View>
            <View style={styles.innerView}>
                <Text style={styles.subHeading}>Password</Text>
                <TextInput style={styles.inputStyle} secureTextEntry={true} value={password} onChangeText={(x)=>setPassword(x)}/>
            </View>
            <CustomButton text="Login" onPress={handleSubmit}/>
            <Pressable onPress={()=>navigation.replace("register")}><Text>Create New User</Text></Pressable>
            
            
        </View>
    </SafeAreaView>
        </KeyboardAvoidingView>
    }
    
    </ImageBackground>
    
  )
}
const styles=StyleSheet.create({
    safe:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        width:"100%"
        
    },
    outerView:{
        width:"80%",
        borderRadius:20,
        backgroundColor:colors.skin400,
        alignItems:"center",
        padding:15,
        paddingVertical:15,
        gap:20
        
    }
    ,innerView:{
        width:"100%",
        gap:5
    },
    inputStyle:{
        borderWidth:2,
        borderColor:colors.skin600,
        fontSize:20,
        paddingVertical:2,
        paddingHorizontal:8,
        borderRadius:2,
        backgroundColor:colors.skin200,
        width:"100%"
    },
    mainHeading:{
        fontFamily:"darkHeading",
        fontSize:25,
    },
    subHeading:{
        fontFamily:"mediumHeading",
        fontSize:17
    },
    imageStyle:{
        flex:1
    } 
})

export default LoginScreen