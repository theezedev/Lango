// Import required polyfill before i18next initialization
import 'intl-pluralrules';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator, View, Platform } from 'react-native';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import enTranslation from './translations/en.json';
import trTranslation from './translations/tr.json';
import AppContext from './AppContext';
import SetupScreen from './screens/SetupScreen';
import MainNavScreen from './screens/MainNavScreen';
import SideMenu from './components/SideMenu';
import SettingsStackNavigator from './screens/SettingsStackScreen';

const Drawer = createDrawerNavigator();
const gloStyles = require('./gloStyles'); //Global Styles

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: enTranslation,
        },
        tr: {
          translation: trTranslation,
        },
      },
      fallbackLng: 'en',
      debug: true,
      interpolation: {
        escapeValue: false,
      },
    });
}


export default function App() {

  const [isDataExists, setIsDataExists] = useState(false);
  const [appLanguage, setAppLanguage] = useState('English');
  const [selectedLanguage, setSelectedLanguage] = useState('');


  useEffect(() => {
    const checkAppData = async () => {
      try {
        const appData = await AsyncStorage.getItem('appData');
        if (appData !== null) {
          setIsDataExists(true);
          const appDataJSON = JSON.parse(appData);
          getDefaultLanguage(appDataJSON, setSelectedLanguage);
          // console.log(appData);
        }
      } catch (error) {
        console.error('Error checking appData:', error);
      }
    };

    checkAppData();
  }, []);

  const getDefaultLanguage = (data, setSelectedLanguage) => {
    for (const language in data.userLanguages) {
      if (data.userLanguages[language]?.default === 1) {
        setSelectedLanguage(language);
      }
    }
  };

  const updateDataExistsState = (value) => {
    setIsDataExists(value);
  };

  const deleteAppData = async () => {
    try {
      await AsyncStorage.removeItem('appData');
      setIsDataExists(false); // Reset state to indicate data deletion
      console.log('appData deleted successfully.');
    } catch (error) {
      console.error('Error deleting appData:', error);
    }
  };

  // deleteAppData();

  return (
    <AppContext.Provider value={{ appLanguage, setAppLanguage, selectedLanguage, setSelectedLanguage}}>
      <NavigationContainer>
        <SafeAreaView style={gloStyles.mainContainer}>
          {isDataExists ? (
            selectedLanguage ? (
              <Drawer.Navigator drawerContent={(props) => <SideMenu {...props} />} >
                <Drawer.Screen
                  name="MainNavScreen"
                  component={MainNavScreen}
                  options={({ navigation }) => ({
                    title: 'Lango',
                    headerStyle: {
                      backgroundColor: '#1c4568',
                      borderBottomWidth: 3,
                      borderBottomColor: '#1c4568',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                    // headerRight: () => (
                    //   <Icon
                    //     name="language"
                    //     size={24}
                    //     color="white"
                    //     style={{ marginRight: 16 }}
                    //     onPress={() => {
                    //       // Define your onPress action here
                    //     }}
                    //   />
                    // ),
                  })}
                  initialParams={{ selectedLanguage }}
                />
                <Drawer.Screen
                  name="SettingsStackScreen"
                  component={SettingsStackNavigator}
                  options={({ navigation }) => ({
                    title: 'Lango',
                    headerStyle: {
                      backgroundColor: '#1c4568',
                      borderBottomWidth: 3,
                      borderBottomColor: '#1c4568',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                    // headerRight: () => (
                    //   <Icon
                    //     name="language"
                    //     size={24}
                    //     color="white"
                    //     style={{ marginRight: 16 }}
                    //     onPress={() => {
                    //       // Define your onPress action here
                    //     }}
                    //   />
                    // ),
                  })}
                  initialParams={{ selectedLanguage }}
                />
              </Drawer.Navigator>
            ) : (
              <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
                <ActivityIndicator size="large" color={'#1c4568'}/>
              </View>
            )
          ) : (
            <SetupScreen updateDataExistsState={updateDataExistsState} />
          )}
          {
            Platform.OS === 'ios' ? (
              <StatusBar style="light" />
            ) : (
              <StatusBar style="auto" />
            )
          }        
        </SafeAreaView>
      </NavigationContainer>
    </AppContext.Provider>
  );
  
}

