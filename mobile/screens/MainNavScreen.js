import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Your screen components
import PhrasesScreen from './PhrasesScreen';
import FlashCardScreen from './FlashCardScreen';
// import SettingsScreen from './SettingsScreen';
import SettingsStackNavigator from './SettingsStackScreen';

const gloStyles = require('../gloStyles'); //Global Styles


const Tab = createBottomTabNavigator();

const MainNavScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1, }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#b3b3b3',
          tabBarStyle: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            // paddingBottom: 5,
          },
        }}
        tabBar={({ state, navigation }) => (
          <View style={styles.menuBarContainer}>
            <View style={styles.menuBarStyle}>
              <TouchableOpacity onPress={() => navigation.navigate('Phrases')} style={{ flex: 1, alignItems: 'center' }} >
                <Icon name="language" size={30} color={state.index === 0 ? '#fff' : '#b3b3b3'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('FlashCards')} style={{ flex: 1, alignItems: 'center' }} >
                <Icon name="albums" size={30} color={state.index === 1 ? '#fff' : '#b3b3b3'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('SettingsStack')} style={{ flex: 1, alignItems: 'center' }}>
                <Icon name="settings-sharp" size={30} color={state.index === 2 ? '#fff' : '#b3b3b3'} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      >
        <Tab.Screen 
          name="Phrases" 
          component={PhrasesScreen} 
          options={{
            headerStyle: {
              backgroundColor: '#47a81a', 
              borderWidth:0,
            },
            headerTitleStyle: {
              display: 'none', // Hide header title
            },
          }}
        />
        <Tab.Screen name="FlashCards" component={FlashCardScreen} />
        <Tab.Screen name="SettingsStack" component={SettingsStackNavigator} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  menuBarContainer:{
    // flexDirection: 'row', 
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:'transparent',
    height:0,
    
  },
  menuBarStyle:{
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems:'center',
    backgroundColor:'#47a81a', 
    height:80, 
    width:300,
    // marginBottom:80,
    width:'90%',
    borderRadius:10,
    position:'absolute',
    bottom:50,
  }
});

export default MainNavScreen;
