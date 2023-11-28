import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

import AppContext from '../AppContext';
import AppLanguages from '../AppLanguages';
import DropDownSelection from '../components/DropdownSelection';
import uuid from 'react-native-uuid';
import generateDefaultCategories from '../DefaultAppCategories'; // Import the function


const gloStyles = require('../gloStyles'); //Global Styles

const SetupScreen = ({ updateDataExistsState }) => {
    const { t, i18n } = useTranslation();
    const { appLanguage, setAppLanguage } = useContext(AppContext);
    const { selectedLanguage, setSelectedLanguage } = useContext(AppContext);
  
    useEffect(() => {
        i18n.changeLanguage(appLanguage);
    }, [appLanguage, i18n]);
    

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };
  
    const saveUserData = async () => {
        if (appLanguage === '' || selectedLanguage === '') {
            Alert.alert('Error', 'Please fill out all fields');
            return;
        }

        const appData = {
            appInfo: {
                appLanguage: appLanguage,
                appCategories: generateDefaultCategories(appLanguage)
            },
            userLanguages: {
                [selectedLanguage]: { default: 1, 
                    phrases: [], 
                },
            },
        };

        try {
        await AsyncStorage.setItem('appData', JSON.stringify(appData));
        // console.log('appData saved successfully:', appData);
        updateDataExistsState(true);
        } catch (error) {
        console.error('Error saving appData:', error);
        }
    };

    const showTooltip = (tooltipText) => {
        Alert.alert('Information', tooltipText);
    };

    return (
        <View style={[gloStyles.screenContainer, ]}>
            <View style={{flex:1, flexDirection:'column', justifyContent:'space-between', padding:'5%',maxHeight:600}}>
                <View style={{flex:0, backgroundColor:'transparent', justifyContent:'center', alignItems:'center'}}>
                    <Image
                        style={{width:200,height:200,}}
                        source={require('../assets/icon.png')}
                        resizeMode="contain"
                    />
                </View>
                <View style={{flex:0,justifyContent:'space-between',}}>
                    <View style={[styles.inputRow, {zIndex: 10000}]}>
                        <View style={styles.textRow}>
                            <Text style={styles.inputLabel}>{t('choosePrimaryLanguage')}:</Text>
                            <TouchableOpacity onPress={() => showTooltip("This is whatever you want the app language to be. Currently it does nothing. Maybe in the future i'll use this.")}>
                                <Icon name="information-circle-outline" size={15} color="grey" />
                            </TouchableOpacity>
                        </View>
                        <DropDownSelection
                            selectedValue={appLanguage}
                            label="Select a language"
                            options={AppLanguages.filter((lang) => lang.Active === 1)
                                .map((lang) => ({ label: lang.LocalName + ' ('+lang.Name+')', value: lang.Code }))}
                            labelVisible={false}
                            onChange={(text) => setAppLanguage(text)}
                            dropDirection={'TOP'}
                        />
                    </View>
                    <View style={[styles.inputRow, {zIndex: 10001}]}>
                        <View style={styles.textRow}>
                            <Text style={styles.inputLabel}>{t('chooseSecondaryLanguage')}:</Text>
                            <TouchableOpacity onPress={() => showTooltip("This is the language that will display by default when opening the app.")}>
                                <Icon name="information-circle-outline" size={15} color="grey" />
                            </TouchableOpacity>
                        </View>
                        <DropDownSelection
                            selectedValue={selectedLanguage}
                            label="Select a language"
                            options={AppLanguages.map((lang) => ({ label: lang.LocalName + ' ('+lang.Name+')', value: lang.Code }))}
                            labelVisible={false}
                            onChange={(text) => setSelectedLanguage(text)}
                            dropDirection={'TOP'}
                        />
                    </View>
                </View>
                <View style={{flex:0, flexDirection:'column-reverse',}}>
                    <TouchableOpacity onPress={saveUserData} style={gloStyles.btnPrimary}>
                        <Text style={gloStyles.txtWhite}>{t('getStarted')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width:'100%',
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRow:{

        },
        textRow:{
            flexDirection:'row',
        },
        inputLabel:{
            fontSize:20,
            marginBottom:10,
            fontWeight:'bold',
        },
        input: {
            height: 40,
            paddingHorizontal: 10,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#ffffff',
            marginBottom: 10,
        },
    });
  

export default SetupScreen;
