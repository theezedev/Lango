import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, Platform, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

import PhrasesScreen from './PhrasesScreen';
import FlashCardScreen from './FlashCardScreen';

const gloStyles = require('../gloStyles'); //Global Styles

// Define your tab screen components
// function HomeScreen() {
//   return (
//     /* Your Home Screen UI */
//     <View style={gloStyles.mainContainer}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

function SettingsScreen() {
  return (
    <View style={gloStyles.mainContainer}>
      <Text>Settings Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const MainNavScreen = ({ route }) => {

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fff', 
        tabBarInactiveTintColor: '#b3b3b3',
        tabBarStyle: {
          backgroundColor: '#47a81a',
          borderTopWidth: 0,
          borderRadius: 15, 
          marginHorizontal: 10, 
          marginBottom: '13%',
          paddingBottom: 0,
          height:60,
          justifyContent:'space-between',
          alignItems:'center',
          ...Platform.select({
            ios: {
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowOpacity: 0.5,
              shadowRadius: 5,
              shadowOffset: {
                width: 0,
                height: -3,
              },
            },
            android: {
              elevation: 10,
            },
          }),
        },
        
      }}
    >
      <Tab.Screen
        name="Phrases"
        component={PhrasesScreen}
        options={{
          tabBarLabel: 'Phrases',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="language" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="FlashCards"
        component={FlashCardScreen}
        options={{
          tabBarLabel: 'FlashCards',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="albums" size={size} color={color} /> // Replace with your icon component
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavScreen;
