import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { NativeBaseProvider, Box, extendTheme, Center} from 'native-base';
import { View, Text, Button, Switch, Dimensions, AppRegistry, Pressable, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Recycle from './RecycleMain';
import { backgroundImage } from 'styled-system';


export default function Filters({navigation}) {
    
    const [paperIsEnabled, setPaperIsEnabled] = useState(false);
    const toggleSwitchPaper = () => setPaperIsEnabled(previousState => !previousState);

    const [plasticIsEnabled, setPlasticIsEnabled] = useState(false);
    const toggleSwitchPlastic = () => setPlasticIsEnabled(previousState => !previousState);

    const [cansIsEnabled, setCansIsEnabled] = useState(false);
    const toggleSwitchCans = () => setCansIsEnabled(previousState => !previousState);

    const [glassIsEnabled, setGlassIsEnabled] = useState(false);
    const toggleSwitchGlass = () => setGlassIsEnabled(previousState => !previousState);
  
    return (
      <View style={{width:Dimensions.get('window').width, height:Dimensions.get('window').height, backgroundColor:"#33333D" }}>
        
        <View style={{alignItems:'center', justifyContent:'center', paddingTop:30}} >
        <Text
        style={{fontFamily:"AlNile-Bold", fontSize:32, textAlign:'center', color:'#BCBCE0'}}>
          Choose the bin filters 
        </Text>
        </View>
        
        
        
      <View style={{alignItems:'center', paddingTop:30}}>
      
      <Text style={{marginBottom:10, fontFamily:"AlNile-Bold", fontSize:28, textAlign:'center', color:'#E0D6A6'}}>Paper</Text>
      <Switch
        trackColor={{ false: '#E0A9A6', true: '#B1E0C3' }}
        thumbColor={paperIsEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#E0A9A6"
        onValueChange={toggleSwitchPaper}
        value={paperIsEnabled}
        style={{marginBottom:30,  transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]}}
      />
      
      <Text style={{marginBottom:10, fontFamily:"AlNile-Bold", fontSize:28, textAlign:'center', color:'#E0D6A6'}}>Plastic</Text>
      <Switch
        trackColor={{ false: '#E0A9A6', true: '#B1E0C3' }}
        thumbColor={plasticIsEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#E0A9A6"
        onValueChange={toggleSwitchPlastic}
        value={plasticIsEnabled}
        style={{marginBottom:30, transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]}}
      />

      <Text style={{marginBottom:10, fontFamily:"AlNile-Bold", fontSize:28, textAlign:'center', color:'#E0D6A6'}}>Cans</Text>
      <Switch
        trackColor={{ false: '#E0A9A6', true: '#B1E0C3' }}
        thumbColor={cansIsEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#E0A9A6"
        onValueChange={toggleSwitchCans}
        value={cansIsEnabled}
        style={{marginBottom:30,  transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]}}
      /> 

<Text style={{marginBottom:10, fontFamily:"AlNile-Bold", fontSize:28, textAlign:'center', color:'#E0D6A6'}}>Glass</Text>
      <Switch
        trackColor={{ false: '#E0A9A6', true: '#B1E0C3' }}
        thumbColor={glassIsEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#E0A9A6"
        onValueChange={toggleSwitchGlass}
        value={glassIsEnabled}
        style={{marginBottom:30, transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]}}
      />
      </View>

      
      <Pressable  style={styles.button}
       onPress= {() => {
        if (paperIsEnabled == false && plasticIsEnabled == false && cansIsEnabled == false && glassIsEnabled == false) alert('You should select at least one filter');
        else navigation.navigate("Recycle", {paperParm: paperIsEnabled, plasticParm: plasticIsEnabled, cansParm: cansIsEnabled, glassParm: glassIsEnabled });}}>
      <Text style={styles.text}>Go to Map</Text>
      </Pressable>
      
      </View>
      
    );
  }

AppRegistry.registerComponent('IosFonts', () => IosFonts);


const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
});