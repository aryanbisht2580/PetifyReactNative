import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../constants/colors";
import CustomButton from "../Components/CustomButton";
import * as ImagePicker from 'expo-image-picker';
import {Picker} from '@react-native-picker/picker';
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db, storage } from "../config/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/slices/user";
import Loading from "../Components/UI/loading";

export default function AddPet({navigation}) {
  const [formData, setFormData] = useState({"sex":"Male","category":"Dogs"});
  const [image,setImage]=useState();
  const user=useSelector(userSelector);
  const changeInputHandler = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const [cats,setCats]=useState([]);
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    fetchCategories();
  },[])

  const submitHandler=async()=>{
    if(Object.keys(formData).length<7 || !formData.name || !formData.about || !formData.category || !formData.breed || !formData.age || !formData.sex || !formData.weight || !image){
      Alert.alert("Invalid Form","Please fill all the details");
      return;
    }
    uploadImage();
  }

  const uploadImage=async()=>{
    setLoading(true)
    try{
      const img=await fetch(image);
    const blob=await img.blob();
    const storageRef =ref(storage,"/petAdopt/"+Date.now()+".jpg");
    uploadBytes(storageRef,blob).then((snap)=>{console.log("File uploaded")}).then((res)=>{
      getDownloadURL(storageRef).then(async(downloadUrl)=>{
        saveData(downloadUrl);
      })
    })
    }catch(err){
      console.log(err);
      setLoading(false);
    }
    
  }

  const saveData=async(downloadUrl)=>{
    try{
      const docId=Date.now().toString();
      await setDoc(doc(db,"animals",docId),{
        ...formData,
        imageURL:downloadUrl,
        ownerName:user.userName,
        ownerPhone:user.phone
      })
      navigation.navigate("profile")
      setLoading(false);

    }catch(err){
      console.log(err);
      Alert.alert("Error Occured!!!","failed to save the data");
      setLoading(false);
    }
  }

  const fetchCategories=async()=>{
    try{
     setCats([]);
     const snap=await getDocs(collection(db,"categories"));
     snap.forEach((s)=>setCats((prev)=>[...prev,s.data()]));
    }
    catch(err){
     console.log(err);
    }
 }


 const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });


  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};



  return (
    loading?<View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Loading/></View>:
      <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
    <ScrollView style={styles.outerMost}>

      <View style={styles.innerDiv}>
        <View style={styles.imageContainer}>
          <Image
            source={image?{uri:image}:require("../assets/images/defaultImage.png")}
            style={styles.image}
            />
        </View>
        <View style={styles.button}>
          <CustomButton
            text={"Add Image"}
            onPress={pickImage}
            color={colors.skin400}
            />
        </View>
      </View>

      <View style={styles.commonInput}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(e) => changeInputHandler("name", e)}
          />
      </View>
      <View style={styles.commonInput}>
        <Text style={styles.label}>Category</Text>
        <Picker
          selectedValue={formData.category}
          onValueChange={(itemValue, itemIndex) =>
            changeInputHandler("category",itemValue)
          }
          style={styles.input}
          >
          {cats.map((c,ind)=> <Picker.Item label={c.name} value={c.name} key={ind}/>)}
        </Picker>
      </View>
      <View style={styles.commonInput}>
        <Text style={styles.label}>Breed</Text>
        <TextInput
          style={styles.input}
          value={formData.breed}
          onChangeText={(e) => changeInputHandler("breed", e)}
          />
      </View>
      <View style={styles.commonInput}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formData.age}
          onChangeText={(e) => changeInputHandler("age", e)}
          />
      </View>
      <View style={styles.commonInput}>
        <Text style={styles.label}>Gender</Text>
        <Picker
          selectedValue={formData.sex}
          onValueChange={(itemValue, itemIndex) =>
            changeInputHandler("sex",itemValue)
          }
          style={styles.input}
          >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>
      <View style={styles.commonInput}>
        <Text style={styles.label}>Weight</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formData.weight}
          onChangeText={(e) => changeInputHandler("weight", e)}
          />
      </View>
      
      <View style={[styles.commonInput,{marginBottom:40}]}>
        <Text style={[styles.label,{textAlign:"top"}]}>About</Text>
        <TextInput
          style={styles.input}
          numberOfLines={5}
          multiline={true}
          value={formData.about}
          onChangeText={(e) => changeInputHandler("about", e)}
          />
      </View>
      <View style={{marginBottom:30,paddingHorizontal:20}}>

      <CustomButton text="Submit" color={colors.skin600} onPress={submitHandler}/>
      </View>
    </ScrollView>
</KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerMost: {
    flex: 1,
    marginTop: 100,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius:50
  },
  innerDiv: {
    alignItems: "center",
  },
  imageContainer: {
    height: 150,
    width: 150,
    padding: 10,
    borderRadius: 30,
    backgroundColor: colors.skin400,
  },
  button: {
    width: "80%",
    marginTop: 30,
  },
  commonInput: {
    // backgroundColor:"red",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: colors.skin200,
    fontSize: 20,
    padding: 10,
    fontFamily: "mediumHeading",
    borderRadius: 5,
    textAlignVertical: "top",
  },
  label: {
    fontFamily: "mediumHeading",
    fontSize: 15,
    opacity: 0.5,
    marginVertical: 7,
  },
});
