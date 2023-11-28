import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
  } from "react-native-reanimated";

import AppContext from '../AppContext';

const FlashCardScreen = () => {
  const { t, i18n } = useTranslation();
  const { selectedLanguage } = useContext(AppContext);
  const [phrasesData, setPhrasesData] = useState([]);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const spin = useSharedValue(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('appData');
        if (jsonValue !== null) {
          const data = JSON.parse(jsonValue);
          const phrases = data?.userLanguages?.[selectedLanguage]?.phrases || [];
          setPhrasesData(phrases);
        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    };

    fetchData();
  }, [selectedLanguage]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('appData');
          if (jsonValue !== null) {
            const data = JSON.parse(jsonValue);
            const phrases = data?.userLanguages?.[selectedLanguage]?.phrases || [];
            setPhrasesData(phrases);
          }
        } catch (error) {
          console.error('Error retrieving data from AsyncStorage:', error);
        }
      };

      fetchData();
    }, [selectedLanguage]) // Re-fetch data when selectedLanguage changes
  );

  const currentPhrase = phrasesData[currentPhraseIndex];
  
  const rStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
    const fadeOpacity = interpolate(spin.value, [0, 0.5, 1], [1, 0.5, 0]); // Adjust opacity values as needed
  
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
      opacity: Platform.OS === 'ios' ? withTiming(fadeOpacity, { duration: 500 }) : 1,
    };
  }, []);
  
  const bStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
    const fadeOpacity = interpolate(spin.value, [0, 0.5, 1], [0, 0.5, 1]); // Adjust opacity values as needed
  
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
      opacity: Platform.OS === 'ios' ? withTiming(fadeOpacity, { duration: 500 }) : 1,
    };
  }, []);

  const handleNextPhrase = () => {
    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * phrasesData.length);
    } while (nextIndex === currentPhraseIndex);

    setCurrentPhraseIndex(nextIndex);
  };

  return (

    <View style={styles.container}>
      {phrasesData.length === 0 ? (
        <View style={styles.emptyPhrasesContainer}>
          <Text>{t('AddSome')}</Text>
        </View>
      ) : (
      <View style={styles.container}>
        <TouchableOpacity style={{width:'100%',alignItems:'center', justifyContent:'center',}} onPress={() => (spin.value = spin.value ? 0 : 1)}>
          <Animated.View style={[styles.front, rStyle]}>
              <Text style={{fontSize:20}}>{currentPhrase?.originalPhrase}</Text>
          </Animated.View>
          <Animated.View style={[styles.back, bStyle]}>
              <Text style={{fontSize:20}}>{currentPhrase?.translatedPhrase}</Text>
          </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextPhrase} style={styles.nextButton}>
          <Text style={styles.buttonText}>{t('Next Phrase')}</Text>
        </TouchableOpacity>
      </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  front: {
    height: '65%',
    width: '90%',
    backgroundColor: "#FFFDD0",
    borderRadius: 16,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderWidth:3,
    borderColor:'#1c4568',
 },
  back: {
      height: '65%',
      width: '90%',
      backgroundColor: "#FFFDD0",
      borderRadius: 16,
      backfaceVisibility: "hidden",
      alignItems: "center",
      justifyContent: "center",
      borderWidth:3,
      borderColor:'#1c4568',
  },
  nextButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#47a81a',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default FlashCardScreen;
