// SettingsStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, ScrollView, Text, StyleSheet } from 'react-native';
import CategorySettingsScreen from './CategorySettingsScreen';

import Icon from 'react-native-vector-icons/Ionicons'; 


const Stack = createStackNavigator();

const SettingsStack = ({ navigation }) => {
  return (
    <ScrollView>
      <TouchableOpacity style={styles.buttonSettings} onPress={() => navigation.navigate('Category Settings')}>
        <Text style={styles.textSettings}>Categories Settings</Text>
        <Icon name="arrow-forward-outline" size={24} color="#fff" style={{}} />
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.buttonSettings} onPress={() => navigation.navigate('PrivacySettings')}>
        <Text>Privacy Settings</Text>
        <Icon name="arrow-forward-outline" size={24} color="gold" style={{}} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSettings} onPress={() => navigation.navigate('AccountSettings')}>
        <Text>Account Settings</Text>
        <Icon name="arrow-forward-outline" size={24} color="gold" style={{}} />
      </TouchableOpacity> */}
    </ScrollView>
  );
};

const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsStack} />
      <Stack.Screen name="Category Settings" component={CategorySettingsScreen} />
      {/* <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} />
      <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} /> */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
    buttonSettings: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      // borderBottomWidth: 1,
      // borderBottomColor: '#CCCCCC',
      backgroundColor:'#47a81a',
      borderRadius:10,
      borderWidth:2,
      borderColor:'#47a81a',
      margin:10,
      
    },
    textSettings:{
      color:'#fff'
    },
});

export default SettingsStackNavigator;
