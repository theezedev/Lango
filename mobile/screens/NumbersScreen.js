import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Text, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../AppContext';


const gloStyles = require('../gloStyles'); //Global Styles


const NumbersScreen = ( { route } ) => {

    // const { selectedLanguage } = route.params;
    // console.log(selectedLanguage);
    const { selectedLanguage, setSelectedLanguage } = useContext(AppContext);


    const [appData, setAppData] = useState();

    useEffect(() => {
        const loadData = async () => {
        try {
            const storedData = await AsyncStorage.getItem('appData');
            if (storedData) {
                setAppData(JSON.parse(storedData));
            }
        } catch (error) {
            console.error('Error loading data from AsyncStorage:', error);
        }
        };

        loadData();
    }, []);

    const saveData = async () => {
        try {
            await AsyncStorage.setItem('appData', JSON.stringify(appData));
            console.log('Data saved to AsyncStorage.');
            const test = await AsyncStorage.getItem('appData');
            console.log(test);  
        } catch (error) {
            console.error('Error saving data to AsyncStorage:', error);
        }
    };

    const handleInputChange = (text, index) => {
        const updatedNumbers = [...appData.userLanguages.selectedLanguage.numbers];
        updatedNumbers[index].translatedNumber = text;
        setAppData(prevAppData => ({
        ...prevAppData,
        userLanguages: {
            ...prevAppData.userLanguages,
            Turkish: {
            ...prevAppData.userLanguages.Turkish,
            numbers: updatedNumbers
            }
        }
        }));
    };

    const getNumberData = (appData, selectedLanguage) => {
        // console.log(appData);
        if (appData && appData.userLanguages && appData.userLanguages[selectedLanguage]) {
            return appData.userLanguages[selectedLanguage].numbers;
          } else {
            return []; // Return an empty array if data is not found or selectedLanguage doesn't exist
          }
    };
      
    // console.log(getNumberData(appData, selectedLanguage));

    const renderItem = ({ item, index }) => (
        <View style={{flexDirection:'row',alignItems:'center', marginBottom:10, justifyContent:'space-between'}}>
            <Text style={{flex:1,textAlign:'center', backgroundColor:'transparent', textAlignVertical: 'center', fontWeight:'bold',}}>
                {item.originalNumber}
            </Text>
            <TextInput
                style={[gloStyles.formControl,{flex:1,textAlign:'center',}]}
                value={item.translatedNumber}
                onChangeText={(text) => handleInputChange(text, index)}
                onBlur={saveData}
            />
        </View>
    );

    return (
        <View style={gloStyles.screenContainer}>
            <View style={{marginBottom:10}}>
                <Text style={{color:'#1c4568', fontSize:25, fontWeight:'bold', textAlign:'center',}}>{selectedLanguage} Numbers</Text>
            </View>
            <FlatList
                data={getNumberData(appData, selectedLanguage)}
                renderItem={renderItem}
                keyExtractor={(item) => item.originalNumber.toString()}
                style={{paddingRight:15,}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    
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

export default NumbersScreen;
