import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Text, Modal, TextInput, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons'; 
// import DropDownPicker from 'react-native-dropdown-picker';
import DropDownSelection from '../components/DropdownSelection';


import AppContext from '../AppContext';
const gloStyles = require('../gloStyles'); //Global Styles
import uuid from 'react-native-uuid';
import { ScrollView } from 'react-native-gesture-handler';


const PhrasesScreen = ({ }) => {
    const { t, i18n } = useTranslation();
    const { selectedLanguage, setSelectedLanguage } = useContext(AppContext);
    const [phrasesData, setPhrasesData] = useState([]);
    const [isNew, setIsNew] = useState(false);


    const [searchText, setSearchText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [originalPhrase, setOriginalPhrase] = useState('');
    const [translatedPhrase, setTranslatedPhrase] = useState('');
    const [phraseID, setPhraseID] = useState('');

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('appData');
                if (jsonValue !== null) {
                    const data = JSON.parse(jsonValue);
                    const phrases = data?.userLanguages?.[selectedLanguage]?.phrases || [];
                    const cats = data?.appInfo.appCategories || [];

                    setPhrasesData(phrases);
                    const formattedCategories = cats.map(category => ({
                        label: category.category,
                        value: category.categoryID
                    }));
              
                    setCategories(formattedCategories);

                }
            } catch (error) {
                console.error('Error retrieving data from AsyncStorage:', error);
            }
        };
        
        fetchData();
    }, []);

    const filteredPhrases = phrasesData.filter(
        phrase =>
        phrase.originalPhrase.toLowerCase().includes(searchText.toLowerCase()) ||
        phrase.translatedPhrase.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderPhrase = ({ item }) => {
        const matchedCategory = categories.find(category => category.value === item.categoryID);
        const categoryName = matchedCategory ? matchedCategory.label : '';
      
        return (
          <TouchableOpacity onPress={() => handlePhrasePress(item)}>
            <Text style={{ margin: 3, fontWeight: 'bold' }}>{categoryName}</Text>
            <View style={styles.phraseContainer}>
              <Text style={styles.originalPhrase}>{item.originalPhrase}</Text>
              <Text style={styles.translatedPhrase}>{item.translatedPhrase}</Text>
            </View>
          </TouchableOpacity>
        );
      };

    const handlePhrasePress = phrase => {
        setOriginalPhrase(phrase?.originalPhrase)
        setTranslatedPhrase(phrase?.translatedPhrase)
        setPhraseID(phrase?.phraseID)
        setSelectedCategory(phrase?.categoryID)

        setIsNew(false);
        setModalVisible(true);
    };

    const handleAddPress = () => {
        setOriginalPhrase('')
        setTranslatedPhrase('')
        setPhraseID('')
        setSelectedCategory('')

        setIsNew(true);
        setModalVisible(true);
    };

    const closeModal = () => {
        setOriginalPhrase('')
        setTranslatedPhrase('')
        setPhraseID('')
        setSelectedCategory('')

        setIsNew(false);
        setModalVisible(false);
    };

    const handleSavePress = () => {
        if (isNew) {
          if (originalPhrase.trim() !== '' && translatedPhrase.trim() !== '') {
            addPhrase(); // Call addPhrase if isNew is true and input fields are not empty
          } else {
            // Alert or notify the user that input fields are required
            alert('Please enter both original and translated phrases');
          }
        } else {
          if (originalPhrase.trim() !== '' && translatedPhrase.trim() !== '') {
            updatePhrase(); // Call updatePhrase if isNew is false and input fields are not empty
          } else {
            // Alert or notify the user that input fields are required
            alert('Please enter both original and translated phrases');
          }
        }
      };

    const addPhrase = async () => {
        const newPhrase = {
          phraseID: uuid.v4(),
          originalPhrase: originalPhrase,
          translatedPhrase: translatedPhrase,
          categoryID: selectedCategory,
        };
      
        try {
          // Fetch existing appData from AsyncStorage
          const jsonValue = await AsyncStorage.getItem('appData');
          if (jsonValue !== null) {
            const data = JSON.parse(jsonValue);
            const selectedLanguageData = data?.userLanguages?.[selectedLanguage];
      
            // Update the phrases array in appData with the new phrase
            if (selectedLanguageData) {
              const updatedPhrases = [...selectedLanguageData.phrases, newPhrase];
              data.userLanguages[selectedLanguage].phrases = updatedPhrases;
      
              await AsyncStorage.setItem('appData', JSON.stringify(data));
      
              setIsNew(false);
              setModalVisible(false);
      
              const phrases = updatedPhrases || [];
              setPhrasesData(phrases); 
            }
          }
        } catch (error) {
          console.error('Error adding phrase:', error);
        }
    };
      
    const updatePhrase = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('appData');
            if (jsonValue !== null) {
                const data = JSON.parse(jsonValue);
                const selectedLanguageData = data?.userLanguages?.[selectedLanguage];
                const updatedPhrases = selectedLanguageData?.phrases.map(phrase => {
                if (phrase.phraseID === phraseID) {
                    return {
                        ...phrase,
                        originalPhrase: originalPhrase,
                        translatedPhrase: translatedPhrase,
                        categoryID: selectedCategory
                    };
                }
                    return phrase;
                });
        
                if (selectedLanguageData) {
                    data.userLanguages[selectedLanguage].phrases = updatedPhrases;
                    await AsyncStorage.setItem('appData', JSON.stringify(data));
                    
                    setIsNew(false);
                    setModalVisible(false);
                    
                    const phrases = updatedPhrases || [];
                    setPhrasesData(phrases);
                }
            }
        } catch (error) {
          console.error('Error updating phrase:', error);
        }
    };

    const deletePhrase = async () => {
        try {
          const shouldDelete = await new Promise((resolve) => {
            Alert.alert(
              'Confirm Deletion',
              'Are you sure you want to delete this phrase?',
              [
                { text: 'Cancel', onPress: () => resolve(false), style: 'cancel' },
                {
                  text: 'Delete',
                  onPress: () => resolve(true),
                  style: 'destructive',
                },
              ],
              { cancelable: true }
            );
          });
      
          if (shouldDelete) {
            const jsonValue = await AsyncStorage.getItem('appData');
            if (jsonValue !== null) {
              const data = JSON.parse(jsonValue);
              const selectedLanguageData = data?.userLanguages?.[selectedLanguage];
      
              if (selectedLanguageData) {
                const updatedPhrases = selectedLanguageData.phrases.filter(
                  (phrase) => phrase.phraseID !== phraseID
                );
      
                data.userLanguages[selectedLanguage].phrases = updatedPhrases;
      
                await AsyncStorage.setItem('appData', JSON.stringify(data));
      
                const phrases = updatedPhrases || [];
                setIsNew(false);
                setModalVisible(false);
                setPhrasesData(phrases);
              }
            }
          }
        } catch (error) {
          console.error('Error deleting phrase:', error);
        }
    };
      
    return (
        <View style={{flex:1, padding:'3%',}}>
            <View style={{flexDirection:'row-reverse',}}>
                <TouchableOpacity style={[gloStyles.btnPrimary, {flexDirection:'row', minWidth:90, margin:10,}]} onPress={handleAddPress}>
                    <Icon name="add" size={20} color={'#fff'} />
                    <Text style={{fontSize:15,color:'#fff',padding:5,}}>{t('Add')}</Text>
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Search..."
                onChangeText={text => setSearchText(text)}
                value={searchText}
            />
            <FlatList
                data={filteredPhrases}
                renderItem={renderPhrase}
                keyExtractor={(item, index) => `${item.originalPhrase}-${index}`}
                style={{flex:0}}
                keyboardType="visible-password"
            />

            <Modal visible={modalVisible} transparent animationType="slide">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 10, height:'90%', width:'90%',  flexDirection:'column', justifyContent:'space-between', }}>
                            <View style={{}}>
                                <View style={{justifyContent:'space-between', flexDirection:'row', marginBottom:10,}}>
                                    <View>
                                        {!isNew && (
                                            <TouchableOpacity onPress={() => deletePhrase()}>
                                                <Icon name="trash" size={30} color={'red'} />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    
                                    <TouchableOpacity onPress={closeModal}>
                                        <Icon name="close" size={30} color={'#1c4568'} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{flexDirection:'column',justifyContent:'space-between'}}>
                                    <View style={{marginBottom:10, backgroundColor:'transparent', marginTop:15, zIndex: 10001,}}>
                                        <Text style={[styles.label, {marginBottom:10,}]}>{t('Category')}:</Text>
                                        <DropDownSelection
                                            selectedValue={selectedCategory}
                                            label="Select a vategory"
                                            options={categories.map((cat) => ({ label: cat.label , value: cat.value }))}
                                            labelVisible={false}
                                            onChange={(text) => setSelectedCategory(text)}
                                            style={{borderRadius: 8, borderWidth: 1, borderColor: '#ccc', backgroundColor: '#ffffff', paddingHorizontal:10, }}       
                                            containerStyle={{}}                                     
                                        />
                                    </View>
                                    <View style={{marginBottom:10, backgroundColor:'transparent'}}>
                                        <Text style={styles.label}>{t('Original')}:</Text>
                                        <TextInput textAlignVertical="top" style={[styles.input,{height:100}]} multiline={true} numberOfLines={4} value={originalPhrase} onChangeText={(text) => setOriginalPhrase(text)} />
                                    </View>
                                    <View style={{marginBottom:10,}}>
                                        <Text style={styles.label}>{t('Translation')}:</Text>
                                        <TextInput textAlignVertical="top" style={[styles.input,{height:100,}]} multiline={true} numberOfLines={4} value={translatedPhrase} onChangeText={(text) => setTranslatedPhrase(text)} />
                                    </View>
                                    <ScrollView style={{marginBottom:10,}}>
                                        <Text style={styles.label}>{t('SuggestedTranslation')}:</Text>
                                        <Text style={{marginLeft:10}}>coming soon</Text>
                                    </ScrollView>
                                </View>
                            </View>
                            <View style={{borderWidth:0}}>
                                <TouchableOpacity onPress={handleSavePress} style={[gloStyles.btnPrimary,{flex:0}]}>
                                    <Text style={gloStyles.txtWhite}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );

    
};

const styles = StyleSheet.create({
    phraseContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    translatedPhrase: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    originalPhrase: {
        fontSize: 14,
        color: '#666666',
    },
    input: {
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#ffffff',
        margin: 10,
        padding:5,
    },
    buttonAdd:{
        flexDirection:'row',
        borderRadius:5,
        backgroundColor:'',
    },
    // input: {
    //     height: 40,
    //     paddingHorizontal: 10,
    //     borderRadius: 8,
    //     borderWidth: 1,
    //     borderColor: '#ccc',
    //     backgroundColor: '#ffffff',
    //     marginBottom: 10,
    // },
    label:{
        fontWeight:'bold',
        marginBottom:2
    },
});

export default PhrasesScreen;
