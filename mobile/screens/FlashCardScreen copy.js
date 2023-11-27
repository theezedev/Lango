import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

import AppContext from '../AppContext';

const FlashCardScreen = () => {
  const { t, i18n } = useTranslation();
  const { selectedLanguage } = useContext(AppContext);
  const [phrasesData, setPhrasesData] = useState([]);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipAnim] = useState(new Animated.Value(0));

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

  const currentPhrase = phrasesData[currentPhraseIndex];

  const handleCardPress = () => {
    Animated.timing(flipAnim, {
      toValue: isFlipped ? 0 : 180,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setIsFlipped(!isFlipped);
    });
  };

  const handleNextPhrase = () => {
    const nextIndex = Math.floor(Math.random() * phrasesData.length);
    setCurrentPhraseIndex(nextIndex);
    setIsFlipped(false);
  };

  const frontOpacity = flipAnim.interpolate({
    inputRange: [89, 90],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const backOpacity = flipAnim.interpolate({
    inputRange: [89, 90],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const frontCardStyle = {
    opacity: frontOpacity,
    transform: [
      { perspective: 1000 }, // Add perspective for depth
      { rotateY: flipAnim.interpolate({ inputRange: [0, 180], outputRange: ['0deg', '180deg'] }) },
    ],
  };

  const backCardStyle = {
    opacity: backOpacity,
    transform: [
      { perspective: 1000 }, // Add perspective for depth
      { rotateY: flipAnim.interpolate({ inputRange: [0, 180], outputRange: ['180deg', '0deg'] }) },
    ],
  };

  const FlashCardFront = ({ phrase }) => (
    <View style={[styles.flashCard, { opacity: 1 }]}>
      <Text style={styles.flashCardText}>{phrase}</Text>
    </View>
  );
  
  const FlashCardBack = ({ phrase }) => (
    <View style={[styles.flashCard, { opacity: 0 }]}>
      <Text style={styles.flashCardText}>{phrase}</Text>
    </View>
  );

  return (

    <View style={styles.container}>
        <TouchableOpacity onPress={handleCardPress} activeOpacity={1}>
            <View style={styles.flashCardContainer}>
            <Animated.View style={[styles.flipCard, { transform: [{ rotateY: flipAnim.interpolate({ inputRange: [0, 180], outputRange: ['0deg', '180deg'] }) }] }]}>
                <FlashCardFront phrase={currentPhrase?.originalPhrase} />
                <FlashCardBack phrase={currentPhrase?.translatedPhrase} />
            </Animated.View>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextPhrase} style={styles.nextButton}>
        <Text style={styles.buttonText}>{t('Next Phrase')}</Text>
        </TouchableOpacity>
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
  flashCardContainer: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backfaceVisibility: 'hidden',
  },
  flipCard: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backfaceVisibility: 'hidden',
  },
  flashCard: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  flashCardText: {
    fontSize: 20,
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#1c4568',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default FlashCardScreen;
