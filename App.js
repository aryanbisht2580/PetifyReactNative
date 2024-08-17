import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Home from './screens/Home';
import { colors } from './constants/colors';
import { useFonts } from 'expo-font';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './redux/store';
import { userActions, userSelector } from './redux/slices/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import Loading from './Components/UI/loading';
import * as SplashScreen from "expo-splash-screen"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavScreen from './screens/FavScreen';
import Profile from './screens/Profile';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from './Components/UI/Icon';
import AddPet from './screens/addPet';
import EditPets from './screens/EditPets';
import PetDetailsScreen from './screens/petDetailsScreen';
const Stack = createNativeStackNavigator();

const Hm=()=>{
  const Tabs=createBottomTabNavigator();
  return (
    <Tabs.Navigator screenOptions={{
      headerShown:false,
      tabBarStyle:{
        backgroundColor:colors.skin400
      },
      tabBarActiveTintColor:"black"
      
    }} sceneContainerStyle={{
      backgroundColor:colors.skin100
    }}>
      <Tabs.Screen name="home" component={Home} options={{
        title:"Home",
        tabBarIcon:({color})=><Icon name="home" color={color}/>

      }}/>
      <Tabs.Screen name="fav" component={FavScreen} options={{
        title:"Faviorites",
        tabBarIcon:({color})=><Icon name="heart" color={color}/>
      }}/>
      <Tabs.Screen name="profile" component={Profile} options={{
        title:"Profile",
        tabBarIcon:({color})=><Icon name="person" color={color}/>
      }}/>
    </Tabs.Navigator>
  );
}

const NotAuth = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.skin200,
          
          
        },
        
      }}
    >
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const Auth = () => {
  return(<Stack.Navigator screenOptions={{
    
    contentStyle:{
      backgroundColor:colors.skin100
    }
  }}>
    <Stack.Screen name="Home" component={Hm} options={{headerShown:false}}/>
    <Stack.Screen name="petDetails" component={PetDetailsScreen} options={{headerTransparent:true,title:'',headerTintColor:"black"}}/>
    <Stack.Screen name="addPet" component={AddPet} options={{
      headerTransparent:true,
      title:"Add Pet",
      headerBackTitle:"Back"
    }}/>
    <Stack.Screen name="editPets" component={EditPets} options={{
      headerTransparent:true,
      title:"Edit Pets",
      headerBackTitle:"Back"
    }}/>
  </Stack.Navigator>)
  
};

const CallIt=()=>{
  const dispatch=useDispatch();
  const user=useSelector(userSelector);
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
    const fetchToken=async()=>{
      setLoading(true);
      const u=await AsyncStorage.getItem("user");
      if(u){

        dispatch(userActions.setUser(JSON.parse(u)));
      }
      setLoading(false)
    }
    fetchToken();
  },[])
    // useEffect(()=>{
    //   const me=async()=>{
    //     if(loading){
    //       await SplashScreen.preventAutoHideAsync();
    //     }
    //   }
    //   me();
    // },[loading])
  

    return (loading?<Loading/>:<NavigationContainer>
    {!user.token?<NotAuth />:<Auth/>}
  </NavigationContainer>)
}

export default function App() {
  const [fontsLoaded] = useFonts({
    lightHeading: require('./assets/fonts/Outfit-Regular.ttf'),
    mediumHeading: require('./assets/fonts/Outfit-Medium.ttf'),
    darkHeading: require('./assets/fonts/Outfit-Bold.ttf'),
  });


  if (!fontsLoaded) {
    return null; // Optionally, you can render a loading screen here
  }

  return (
    <Provider store={store}>

      <CallIt/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
