import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useRef} from 'react';
import firebase from 'firebase/app';
import { NativeBaseProvider, Box, extendTheme, Spinner, Pressable, Stack, HStack, Center} from 'native-base';
import { View, Text, Dimensions, Alert, ActivityIndicator, Linking } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, { Marker ,PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './ReactStyles';
import * as Location from 'expo-location';
import { style } from 'styled-system';
import {getDatabase} from 'firebase/database';
import "firebase/firestore";
import { app } from './FirebaseConfig';
import { getFirestore, collection, getDocs } from "firebase/firestore";
const BinURL = "C:\Users\Admin\ReX\Images\recycling-bin.png"


export default function Recycle({route, navigation}) {
  
  const [location, setLocation] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [loading, setLoading] = useState(true);
  const [binLocations, setBinLocations] = useState([]);
  const [binsList, setBinsList] = useState([]);
  const {paperParm, plasticParm, cansParm, glassParm} = route.params;
  

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Map Refreshed');
    });
    return unsubscribe;
  }, [navigation]);


  var db = firebase.firestore();
  
  var paperLocationsArr = [];
  const paperLocationsState = useRef([]);

  var plasticLocationsArr = [];
  const plasticLocationsState = useRef([]);

  var cansLocationsArr = [];
  const cansLocationsState = useRef([]);

  var glassLocationsArr = [];
  const glassLocationsState = useRef([]);

  const toBeShowedMarkers = useRef([]);
  const [toBeShowedMarkersState, setToBeShowedMarkersState] = useState([]);
  
  
  db.collection("bins").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
       
       
       if (doc.data().Classifications.Paper == true)
       paperLocationsArr.push(doc.data().Location);
       
       if (doc.data().Classifications.Plastic == true)
       plasticLocationsArr.push(doc.data().Location);
   
       if (doc.data().Classifications.Cans == true)
       cansLocationsArr.push(doc.data().Location);
   
       if (doc.data().Classifications.Glass == true)
       glassLocationsArr.push(doc.data().Location);
       
    }); 
    
    paperLocationsState.current = paperLocationsArr;
    plasticLocationsState.current = plasticLocationsArr;
    cansLocationsState.current = cansLocationsArr;
    glassLocationsState.current = glassLocationsArr;
    
    
  });

  const ShowMap = () => {
    
    console.log(JSON.stringify(paperLocationsState.current));
    console.log(paperParm, plasticParm, cansParm, glassParm);
    var toBeShowedMarkersArr = [];
    if (paperParm == true) {
    toBeShowedMarkers.current = toBeShowedMarkers.current.concat(paperLocationsState.current); 
    }
    

    if (plasticParm == true) {
      toBeShowedMarkers.current = toBeShowedMarkers.current.concat(plasticLocationsState.current);
    }

    if (cansParm == true) {
      toBeShowedMarkers.current = toBeShowedMarkers.current.concat(cansLocationsState.current);
    }

    if (glassParm == true) {
      toBeShowedMarkers.current = toBeShowedMarkers.current.concat(glassLocationsState.current);
    }
    console.log(toBeShowedMarkers.current);
    
    return( 
    <NativeBaseProvider>
    <View>
    <MapView 
    style={styles.Map}
    initialRegion={{
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
      longitudeDelta: 0.0922,
      latitudeDelta: 0.0421,
    }}
    showsUserLocation={true}
    provider={PROVIDER_GOOGLE}>
      
      {toBeShowedMarkers.current.map((v, index) => {
      
      return (
      <Marker coordinate={{ latitude:v.latitude, longitude:v.longitude }} 
        key={index} 
        onPress={()=>{Linking.openURL(`https://maps.google.com?q=${v.latitude},${v.longitude}`)}}
        />
          )
    })}
    </MapView>
    
    
    </View>
    </NativeBaseProvider>
      
      )
    ;

  }
  
  
  useEffect(() => {
    
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        
        return;
      }
      /*setPaperLocationsState(paperLocationsArr);
      setPlasticLocationsState(plasticLocationsArr);
      setCansLocationsState(cansLocationsArr);
      setGlassLocationsState(glassLocationsArr);*/

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLoading(false);
      
    })();
    
  }, []);

  while (loading == true) {
    return (
      <NativeBaseProvider>
      <View style={{justifyContent: 'center', alignItems:'center', backgroundColor:'#33333d', width:Dimensions.get('window').width, height:Dimensions.get('window').height}}>
      <Spinner size='large' color='#ffffff' accessibilityLabel="Loading Map"/>
      <Text style={{color:'white', marginVertical:30}}>Tip: Click on the bin to navigate</Text>
      </View>
      </NativeBaseProvider>
    )
  }

  return(
    <ShowMap/>
  )}
